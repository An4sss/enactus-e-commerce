import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@/lib/config';

// General User Authentication Middleware
export async function authUser(req: NextRequest) {
  try {
    // Extract token from the Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ message: 'Authorization header is required' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];  // Extract token from "Bearer <token>"
    if (!token) {
      return NextResponse.json({ message: 'Authorization token is missing' }, { status: 401 });
    }

    // Verify the token using the JWT_SECRET
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
    }

    // Attach the decoded user data to the request object
    (req as any).user = decoded;
    return null;  // Return null to indicate the user is authenticated

  } catch (error) {
    console.error('Auth Error:', error);
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 403 });
  }
}

// Admin Authentication Middleware (Extends User Auth)
export async function authAdmin(req: NextRequest) {
  // First, verify that the user is authenticated
  const userAuthError = await authUser(req);
  if (userAuthError) return userAuthError;  // Return error if the user is not authenticated

  // Check if the authenticated user has admin privileges
  const user = (req as any).user;
  console.log(user)
  if (!user || !user.isAdmin) {  // Assuming `isAdmin` is a boolean property on the user object
    return NextResponse.json({ message: 'Admin privileges required' }, { status: 403 });
  }

  return null;  // Return null to indicate the user is an admin
}
