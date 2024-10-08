import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@/lib/config';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email, isAdmin:user.isAdmin }, JWT_SECRET, { expiresIn: '1h' });

    return NextResponse.json({ message: 'Login successful', token ,isAdmin:user.isAdmin}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Login error' }, { status: 400 });
  }
}
