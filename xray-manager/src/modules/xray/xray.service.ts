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
		try {
			await this.xmlRpcClientService.stopProcess('xray');
			await this.xmlRpcClientService.startProcess('xray');
		} catch (e) {
			console.error(e);
		}
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

		vlessInbound.settings.clients.push({
			id: clientId,
			email: id.toString(),
			flow: 'xtls-rprx-vision',
		});

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
