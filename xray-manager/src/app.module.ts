import { Module } from '@nestjs/common';

import XmlRpcClientModule from './modules/xmlrpcClient/xmlrpcClient.module';
import MqttModule from './modules/mqtt/mqtt.module';

import XrayModule from './modules/xray/xray.module';


import xmlrpcConfig from './config/xmlrpc.config';
import mqttConfig from './config/mqtt.config';

@Module({
	imports: [
		XmlRpcClientModule.forRoot(xmlrpcConfig()),
		MqttModule.forRoot(mqttConfig()),
		XrayModule,
	],
})
export class AppModule {}
