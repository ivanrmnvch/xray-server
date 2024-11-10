import { Controller, Post } from '@nestjs/common';
import XrayService from './xray.service';

@Controller('xray')
export default class XrayController {
	constructor(private xrayService: XrayService) {}

	@Post('/restart')
	async xrayRestart() {
		console.log('test restart');
		return this.xrayService.xrayRestart();
	}
}
