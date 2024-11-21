export default class XrayConfigDto {
	inbounds: Array<{
		protocol: 'vless';
		settings: {
			clients: Array<{
				id: string;
				email: number;
				flow: 'xtls-rprx-vision';
			}>;
		};
	}>;
}
