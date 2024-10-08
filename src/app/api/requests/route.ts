import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Request, { IRequest } from '@/models/request';
import { authUser } from '@/lib/middleware';
import Product from '@/models/product'; // Ensure correct import path

// Handle GET requests (fetch all requests for the authenticated user)
export async function GET(req: NextRequest) {
  const authError = await authUser(req);  // Check if the user is authenticated
  if (authError) return authError;  // Return error if not authenticated

  try {
    await dbConnect();
    const userId = (req as any).user.id; // Get the authenticated user's ID
    const requests: IRequest[] = await Request.find({ userId }) // Only fetch requests for this user
      .populate('userId').populate('productId');
    return NextResponse.json(requests, { status: 200 });
  } catch (error) {
    console.error('Error fetching requests:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// Handle POST requests (create a new request)
export async function POST(req: NextRequest) {
  const authError = await authUser(req);  // Check if the user is authenticated
  if (authError) return authError;  // Return error if not authenticated

  try {
    await dbConnect();
    const body = await req.json();
    console.log(body)
    const userId = (req as any).user.id; // Get the authenticated user's ID
    console.log(userId)
    const newRequest = new Request({ ...body, userId }); // Assign the user ID to the new request
    await newRequest.save();
    return NextResponse.json({ message: 'Request added successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error adding request:', error);
    return NextResponse.json({ message: 'Error adding request' }, { status: 400 });
  }
}

// Handle PUT requests (update an existing request)
export async function PUT(req: NextRequest) {
  const authError = await authUser(req);  // Check if the user is authenticated
  if (authError) return authError;  // Return error if not authenticated

  try {
    await dbConnect();
    const body = await req.json();
    const { id, ...updateData } = body;  // Assuming the request ID is passed in the request body
    const userId = (req as any).user.id; // Get the authenticated user's ID

    if (!id) {
      return NextResponse.json({ message: 'Request ID is required' }, { status: 400 });
    }

    // Check if the request belongs to the authenticated user
    const existingRequest = await Request.findOne({ _id: id, userId });
    console.log(existingRequest)
    if (!existingRequest) {
      return NextResponse.json({ message: 'Request not found or does not belong to the user' }, { status: 404 });
    }

    const updatedRequest = await Request.findByIdAndUpdate(id, updateData, { new: true })
      .populate('userId');

    if (!updatedRequest) {
      return NextResponse.json({ message: 'Request not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Request updated successfully', request: updatedRequest }, { status: 200 });
  } catch (error) {
    console.error('Error updating request:', error);
    return NextResponse.json({ message: 'Error updating request' }, { status: 400 });
  }
}

// Handle DELETE requests (delete a request)
export async function DELETE(req: NextRequest) {
  const authError = await authUser(req);  // Check if the user is authenticated
  if (authError) return authError;  // Return error if not authenticated

  try {
    await dbConnect();
    const { id } = await req.json();  // Assuming the request ID is passed in the request body
    const userId = (req as any).user.id; // Get the authenticated user's ID

    if (!id) {
      return NextResponse.json({ message: 'Request ID is required' }, { status: 400 });
    }

    // Check if the request belongs to the authenticated user
    const existingRequest = await Request.findOne({ _id: id, userId });
    if (!existingRequest) {
      return NextResponse.json({ message: 'Request not found or does not belong to the user' }, { status: 404 });
    }

    const deletedRequest = await Request.findByIdAndDelete(id);

    if (!deletedRequest) {
      return NextResponse.json({ message: 'Request not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Request deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting request:', error);
    return NextResponse.json({ message: 'Error deleting request' }, { status: 400 });
  }
}
