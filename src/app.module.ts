import { Module } from '@nestjs/common';

import XmlRpcClientModule from './modules/xmlrpcClient/xmlrpcClient.module';
import XrayModule from './modules/xray/xray.module';

import xmlrpcConfig from './config/xmlrpc.config';

@Module({
	imports: [XmlRpcClientModule.forRoot(xmlrpcConfig()), XrayModule],
})
export class AppModule {}
