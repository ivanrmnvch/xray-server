import { Global, Module } from '@nestjs/common';
import XmlRpcClientService from './xmlrpcClient.service';
import { XMLRPC_CONFIG } from '../../const/xmlrpc.token';
import XmlrpcClientInterface from '../../common/interfaces/xmlrpcClient.interface';

@Global()
@Module({})
export default class XmlRpcClientModule {
	static forRoot(xmlrpcConfig: XmlrpcClientInterface) {
		return {
			module: XmlRpcClientModule,
			exports: [XmlRpcClientService],
			providers: [
				{
					useValue: xmlrpcConfig,
					provide: XMLRPC_CONFIG,
				},
				XmlRpcClientService,
			],
		};
	}
}
