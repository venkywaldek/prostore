import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// import { runtime } from './db/prisma';

// export { auth as middleware } from '@/auth';

export async function middleware(req: Request) {
  //Ensure the secret is available
  const secret = process.env.NEXTAUTH_SECRET;

  if (!secret) {
    console.error('NEXTAUTH_SECRET is missing');
    return NextResponse.error();
  }

  // Retrieve the token from the request using NextAuth's JWT helper,
  const token = await getToken({ req, secret });

  //create a response object
  const res = NextResponse.next();
  //check for session cart cookie
  const cartCookie = req.headers.get('cookie')?.includes('sessionCartId');
  if (!cartCookie) {
    const sessionCartId = crypto.randomUUID();
    res.cookies.set('sessionCartId', sessionCartId, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  }

  // Redirect unauthenticated users to sign in
  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/cart', '/shipping-address'],
  runtime: 'nodejs', //Forces Node.js runtime instead of edge
};
