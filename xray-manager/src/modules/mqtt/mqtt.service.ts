import { Injectable, Inject } from '@nestjs/common';
import { MQTT_CONFIG } from '../../const/mqtt';
import { IClientOptions } from 'mqtt/src/lib/client';
import * as mqtt from 'mqtt';
import XrayService from '../xray/xray.service';

@Injectable()
export default class MqttService {
	private client: mqtt.MqttClient;

	constructor(
		@Inject(MQTT_CONFIG) private config: IClientOptions,
		private xray: XrayService
	) {
		console.log('mqtt config', config);
		this.client = mqtt.connect(config);

		this.client.on('connect', () => {
			console.log('Connected to MQTT broker');
			// Подписка на тему
			this.client.subscribe('vpn-client', (err) => {
				if (!err) {
					console.log('Subscribed to topic');
				}
			});
		});

		this.client.on('message', (topic, msg) => {
			if (topic === 'vpn-client') {
				this.xray.addClientToConfig(JSON.parse(msg.toString('utf8')));
			}
		});
	}
}
