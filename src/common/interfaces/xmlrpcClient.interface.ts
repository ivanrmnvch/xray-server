export default interface XmlrpcClientInterface {
	host?: string | undefined;
	path?: string | undefined;
	port?: number | undefined;
	url?: string | undefined;
	cookies?: boolean | undefined;
	headers?: { [header: string]: string } | undefined;
	basic_auth?: { user: string; pass: string } | undefined;
	method?: string | undefined;
}
