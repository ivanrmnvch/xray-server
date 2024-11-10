import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api');
	await app.listen(+process.env.POXRAY_MANAGER_PORT || 8083);
}
console.log('test');
bootstrap();
