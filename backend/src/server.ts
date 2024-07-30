// src/server.ts
import { server } from './app'; // Import the HTTP server instance from app

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
