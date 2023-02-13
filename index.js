import createBareServer from '@tomphttp/bare-server-node';
import http from 'node:http';

const PORT = process.env.PORT || 8080;

/*
{
	name: 'TOMPHTTP NodeJS Bare Server Deployable',
	repostory: 'https://github.com/amethystnetwork-dev/bare-server-deployable'
}
*/

const bare = createBareServer('/')
const server = http.createServer();

server.on('request', (req, res) => {
    if (bare.shouldRoute(req)) {
		bare.routeRequest(req, res);
	} else {
        res.writeHead(400);
		res.end('400 Bad Request');
	}
});

server.on('upgrade', (req, socket, head) => {
	if (bare.shouldRoute(req, socket, head)) {
		bare.routeUpgrade(req, socket, head);
	} else {
		socket.end();
	}
});

server.on('listening', () => {
	console.log(`Bare server started on port ${PORT}`)
});

server.listen({ port: PORT });