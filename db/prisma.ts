import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';

import { PrismaClient } from '@prisma/client';
import ws from 'ws';

//Ensure Prisma runs in the Node.js environment
export const runtime = "nodejs"

//Setup WebSocket connections, which enables Neon to use Websocket communication.

neonConfig.webSocketConstructor = ws;

const connectionString = `${process.env.DATABASE_URL}`;

//Creates a new connection pool using the provided connection string, allowing multiple concurrent connections.
const pool = new Pool({ connectionString });

//Instantiate the Prisma adapter using the Neon connection pool to handle the connection between Prisma and neon
const adapter = new PrismaNeon(pool);

//Extends the PrismaClient with custom result transformer to convert the price and rating fields to strings.
export const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    product: {
      price: {
        compute(product) {
          return product.price.toString();
        },
      },
      rating: {
        compute(product) {
          return Number(product.rating);
        },
      },
    },
  },
});
