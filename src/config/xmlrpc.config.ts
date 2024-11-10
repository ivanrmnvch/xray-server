import XmlrpcClientInterface from '../common/interfaces/xmlrpcClient.interface';
export default (): XmlrpcClientInterface => ({
	host: process.env.XMLRPC_CLIENT_HOST,
	port: +process.env.XMLRPC_CLIENT_PORT,
	path: '/RPC2',
	basic_auth: {
		user: process.env.XMLRPC_USER,
		pass: process.env.XMLRPC_PASSWORD,
	},
});
