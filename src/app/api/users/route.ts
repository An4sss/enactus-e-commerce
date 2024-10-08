import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User, { IUser } from '@/models/user';
import bcrypt from 'bcrypt';
import { authUser,authAdmin } from '@/lib/middleware';
// Handle GET requests (fetch all users)
export async function GET(req: NextRequest) {
  const authError = await authAdmin(req);  // Check if the user is authenticated
  if (authError) return authError;  // Return error if not authenticated

  try {
    await dbConnect();
    const users = await User.find({});
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// Handle POST requests (create a new user)
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(body.password, 10); // 10 is the salt rounds

    // Create a new user with the hashed password
    const newUser = new User({
      ...body,
      isAdmin:false,
      password: hashedPassword, // Replace the plain password with the hashed password
    });
    
    await newUser.save();

    return NextResponse.json({ message: 'User added successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error adding user' }, { status: 400 });
  }
}

// Handle PUT requests (update an existing user)
export async function PUT(req: NextRequest) {
  const authError = await authAdmin(req);  // Check if the user is authenticated
  if (authError) return authError;  // Return error if not authenticated

  try {
    await dbConnect();
    const body = await req.json();
    const { id, password, ...updateData } = body;  // Extract password separately, if present

    if (!id) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    // If password is provided, hash it before updating
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;  // Replace plain password with hashed one
    }

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User updated successfully', user: updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating user' }, { status: 400 });
  }
}

// Handle DELETE requests (delete a user)
export async function DELETE(req: NextRequest) {
  const authError = await authAdmin(req);  // Check if the user is authenticated
  if (authError) return authError;  // Return error if not authenticated
  try {
    await dbConnect();
    const { id } = await req.json();  // Assuming the user ID is passed in the request body

    if (!id) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting user' }, { status: 400 });
  }
}
