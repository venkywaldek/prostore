import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// import { runtime } from './db/prisma';

// export { auth as middleware } from '@/auth';

export async function middleware(req: Request) {
  // Retrieve the token from the request using NextAuth's JWT helper,
  // which is compatible with the Edge Runtime.
  const token = await getToken({ req });

  // Redirect unauthenticated users to sign in
  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cart', '/shipping-address'],
  runtime: 'nodejs', //Forces Node.js runtime instead of edge
};
