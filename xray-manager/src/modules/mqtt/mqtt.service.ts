import { Injectable, Inject } from '@nestjs/common';
import { MQTT_CONFIG } from '../../const/mqtt';
import { IClientOptions } from 'mqtt/src/lib/client';
import * as mqtt from 'mqtt';

@Injectable()
export default class MqttService {
	private client: mqtt.MqttClient;

	constructor(@Inject(MQTT_CONFIG) private config: IClientOptions) {
		console.log('mqtt config', config);
		this.client = mqtt.connect(config);

		this.client.on('connect', () => {
			console.log('Connected to MQTT broker');
			// Подписка на тему
			this.client.subscribe('test/topic', (err) => {
				if (!err) {
					console.log('Subscribed to topic');
				}
			});
		});

		this.client.on('message', (topic, message) => {
			console.log(`Received message: ${message.toString()} on topic: ${topic}`);
		});
	}

	publishMessage() {
		// Публикация сообщения
		this.client.publish('test/topic', 'Hello from NestJS');
	}
}

// import { Injectable, OnModuleInit } from '@nestjs/common';
// import * as mqtt from 'mqtt';
//
// @Injectable()
// export class MqttService implements OnModuleInit {
// 	private client: mqtt.MqttClient;
//
// 	onModuleInit() {
// 		this.client = mqtt.connect({
// 			host: 'broker.example.com',
// 			port: 1883,
// 			protocol: 'mqtt',
// 			username: 'yourUsername',
// 			password: 'yourPassword',
// 		});
//
// 		this.client.on('connect', () => {
// 			console.log('Connected to MQTT broker');
// 			// Подписка на тему
// 			this.client.subscribe('test/topic', (err) => {
// 				if (!err) {
// 					console.log('Subscribed to topic');
// 				}
// 			});
// 		});
//
// 		this.client.on('message', (topic, message) => {
// 			console.log(`Received message: ${message.toString()} on topic: ${topic}`);
// 		});
// 	}
//
// 	publishMessage() {
// 		// Публикация сообщения
// 		this.client.publish('test/topic', 'Hello from NestJS');
// 	}
// }
