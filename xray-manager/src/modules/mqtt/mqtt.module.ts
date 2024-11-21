import { Global, Module } from '@nestjs/common';
import { MQTT_CONFIG } from '../../const/mqtt';
import { IClientOptions } from 'mqtt/src/lib/client';
import MqttService from './mqtt.service';

@Global()
@Module({})
export default class MqttModule {
	static forRoot(mqttConfig: IClientOptions) {
		return {
			module: MqttModule,
			exports: [MqttService],
			providers: [
				{
					useValue: mqttConfig,
					provide: MQTT_CONFIG,
				},
				MqttService,
			],
		};
	}
}
