import { Injectable } from '@nestjs/common';
import XmlRpcClientService from '../xmlrpcClient/xmlrpcClient.service';

@Injectable()
export default class XrayService {
	constructor(private xmlRpcClientService: XmlRpcClientService) {}

	async xrayRestart() {
		await this.xmlRpcClientService.stopProcess('xray');
		await this.xmlRpcClientService.startProcess('xray');
	}
}
