import { Injectable, Inject } from '@nestjs/common';
import { XMLRPC_CONFIG } from '../../const/xmlrpc.token';
import * as xmlrpc from 'xmlrpc';
import { Client } from 'xmlrpc';
import XmlrpcClientInterface from '../../common/interfaces/xmlrpcClient.interface';

@Injectable()
export default class XmlRpcClientService {
	private client: Client;
	constructor(@Inject(XMLRPC_CONFIG) private config: XmlrpcClientInterface) {
		console.log('config', config);
		this.client = xmlrpc.createClient(config);
		console.log('XmlRpcClientService start');
	}

	// Пример метода для вызова удалённой функции через XML-RPC
	callMethod(method: string, params: any[]): Promise<any> {
		return new Promise((resolve, reject) => {
			this.client.methodCall(method, params, (error, value) => {
				if (error) {
					reject(`Ошибка при вызове метода: ${error}`);
				} else {
					resolve(value);
				}
			});
		});
	}

	async pingProcess(process: string) {
		return this.callMethod('supervisor.signalProcess', [process, 1])
			.then((result) => result as string)
			.catch((error) => {
				// throw new Error(error);
			});
	}

	async startProcess(process: string): Promise<string> {
		return this.callMethod('supervisor.startProcess', [process])
			.then((result) => result as string)
			.catch((e) => {
				return e;
				// throw new Error(error);
			});
	}
	async stopProcess(process: string): Promise<string> {
		return this.callMethod('supervisor.stopProcess', [process])
			.then((result) => result as string)
			.catch((e) => {
				return e;
				// throw new Error(error);
			});
	}
}
