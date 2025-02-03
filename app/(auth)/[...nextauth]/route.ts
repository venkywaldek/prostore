import NextAuth from 'next-auth';
import { authConfig } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const response = await NextAuth(authConfig)
  return NextResponse.json(response);
}

export async function POST(request: NextRequest) {
  const response = await NextAuth(authConfig)
  return NextResponse.json(response);
}
