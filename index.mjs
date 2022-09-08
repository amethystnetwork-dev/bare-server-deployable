import createBareServer from '@tomphttp/bare-server-node';
import http from 'http';

const PORT = process.env.PORT || 8080


const bare = createBareServer('/', {
	project: {
		name: 'TOMPHTTP NodeJS Bare Server Deployable',
		repostory: 'https://github.com/IDontCodee/bare-server-deployable'
	}
})

const server = http.createServer();

server.on('request', (req, res) => {
    if (bare.shouldRoute(req)) {
		bare.routeRequest(req, res);
	} else {
        res.writeHead(400);
		res.send('400 Bad Request');
	}
});

server.on('upgrade', (req, socket, head) => {
	if (bare.shouldRoute(req, socket, head)) {
		bare.routeUpgrade(req, socket, head);
	} else {
		socket.end();
	}
});

server.listen({ port: PORT });
console.log(`Bare server started on port ${PORT}`)