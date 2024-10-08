import { authAdmin, authUser } from "@/lib/middleware";
import dbConnect from "@/lib/mongoose";
import Request, { IRequest } from '@/models/request';
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const authError = await authAdmin(req);  // Check if the user is authenticated
    if (authError) return authError;  // Return error if not authenticated
  
    try {
      await dbConnect();
      const requests: IRequest[] = await Request.find({}).populate("userId").populate("productId"); 
       
      return NextResponse.json(requests, { status: 200 });
    } catch (error) {
      console.error('Error fetching requests:', error);
      return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
  }
  export async function PUT(req: NextRequest) {
    const authError = await authAdmin(req);  // Check if the user is authenticated
    if (authError) return authError;  // Return error if not authenticated
  
    try {
      await dbConnect();
      const body = await req.json();
      const { id, ...updateData } = body;  // Assuming the request ID is passed in the request body
      
  
      if (!id) {
        return NextResponse.json({ message: 'Request ID is required' }, { status: 400 });
      }
  
      // Check if the request belongs to the authenticated user
      const existingRequest = await Request.findById( id );
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




  export async function DELETE(req: NextRequest) {
    const authError = await authAdmin(req);  // Check if the user is authenticated
    if (authError) return authError;  // Return error if not authenticated
  
    try {
      await dbConnect();
      const { id } = await req.json();  // Assuming the request ID is passed in the request body
      const userId = (req as any).user.id; // Get the authenticated user's ID
  
      if (!id) {
        return NextResponse.json({ message: 'Request ID is required' }, { status: 400 });
      }
  
      // Check if the request belongs to the authenticated user
      const existingRequest = await Request.findOne({ _id: id });
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
  