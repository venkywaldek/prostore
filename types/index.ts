import { z } from 'zod';
import {
  insertProductSchema,
  insertCartSchema,
  cartItemSchema,
  shippingAddressSchema,
} from '@/lib/validators';

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};

export type Cart = z.infer<typeof insertCartSchema>;

export type CartItem = z.infer<typeof cartItemSchema>;

export type ShippingAddress = z.infer<typeof shippingAddressSchema>;

export type SessionUser = {
  id: string;
  role: string;
  name: string;
  email: string;
};

//Extend NextAuth types
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: SessionUser;
  }

  interface JWT {
    sub: string;
    role: string;
    name: string;
  }
}
