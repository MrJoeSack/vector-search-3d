import { createServer } from 'vite';

async function startServer() {
  try {
    const server = await createServer({
      root: process.cwd(),
      server: {
        port: 8080,
        open: true
      }
    });
    
    await server.listen();
    server.printUrls();
    console.log('\n✅ Server is running! Open your browser to the URL above.\n');
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startServer();