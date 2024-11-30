import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';

import XmlRpcClientService from '../xmlrpcClient/xmlrpcClient.service';

import XrayClientDto from './dto/xrayClient.dto';
import XrayConfigDto from './dto/xrayConfig.dto';

const configPath = join(__dirname, '../../../config/config.json');

@Injectable()
export default class XrayService {
	constructor(private xmlRpcClientService: XmlRpcClientService) {}

	async xrayRestart() {
		const test1 = await this.xmlRpcClientService.stopProcess('xray');
		console.log("test1", test1);
		const test2 = await this.xmlRpcClientService.startProcess('xray');
		console.log("test2", test2);
	}

	async addClientToConfig(client: XrayClientDto) {
		console.log('client', client);
		const { id, clientId } = client;
		let config: XrayConfigDto;

		try {
			config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
		} catch (err) {
			console.error('Ошибка при чтении файла:', err);
		}

		console.log('>>> config', config.inbounds[0].settings.clients);

		const vlessInbound = config.inbounds.find(
			(inbound) => inbound.protocol === 'vless'
		);

		if (!vlessInbound) {
			return;
		}

		const hasClient = vlessInbound.settings.clients.some(
			(client) => client.id === clientId
		);

		if (hasClient) {
			return;
		}

		const test = {
			id: clientId,
			email: id.toString(),
			flow: 'xtls-rprx-vision',
		}

		console.log("test", test)

		// vlessInbound.settings.clients.push();

		console.log('>>> updated config', config.inbounds[0].settings.clients);

		try {
			fs.writeFileSync(configPath, JSON.stringify(config, undefined, 2));
			console.log('Данные успешно записаны!');
		} catch (err) {
			console.error('Ошибка при записи файла:', err);
		}
		await this.xrayRestart();
	}
}
