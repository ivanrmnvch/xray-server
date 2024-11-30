export default class XrayConfigDto {
	inbounds: Array<{
		protocol: 'vless';
		settings: {
			clients: Array<{
				id: string;
				email: string;
				flow: 'xtls-rprx-vision';
			}>;
		};
	}>;
}
