<<<<<<< HEAD
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function middleware(req: Request) {
  const session = await auth();

  //Redirect unauthenticated users to sign in
  if (!session) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cart', '/shipping-address'],
};
=======

export {auth as middleware} from '@/auth'
>>>>>>> 619c9f1 (new commit from computer)
