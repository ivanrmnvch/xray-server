import { IClientOptions } from 'mqtt/src/lib/client';
import { MqttProtocol } from 'mqtt';

export default (): IClientOptions => ({
	host: process.env.MQTT_HOST,
	port: +process.env.MQTT_PORT,
	protocol: (process.env.MQTT_PROTOCOL || 'mqtt') as MqttProtocol,
	username: process.env.MQTT_USERNAME,
	password: process.env.MQTT_PASSWORD,
});
