import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

// Ensure Prisma runs in the Node.js environment
export const runtime = 'nodejs';

// Setup WebSocket connections, which enables Neon to use WebSocket communication.
neonConfig.webSocketConstructor = ws;

// Create a connection pool using the provided connection string
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });

// Instantiate the Prisma adapter using the Neon connection pool
const adapter = new PrismaNeon(pool);

// Define a global type to ensure proper type checking
type ExtendedPrismaClient = PrismaClient & {
  product: {
    price: () => string;
    rating: () => string;
  };
};

// Handle global instance management
const globalForPrisma = global as unknown as { prisma?: ExtendedPrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter }).$extends({
    result: {
      product: {
        price: {
          compute(product) {
            return product.price.toString();
          },
        },
        rating: {
          compute(product) {
            return product.rating.toString();
          },
        },
      },
    },
  }) as unknown as ExtendedPrismaClient;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
