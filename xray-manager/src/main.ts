import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('xm');
	await app.listen(+process.env.XRAY_MANAGER_PORT || 8083);
}
console.log('test');
bootstrap();
