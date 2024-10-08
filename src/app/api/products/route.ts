import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Product, { IProduct } from '@/models/product';
import { authAdmin } from '@/lib/middleware';
import { uploadMiddleware } from '@/lib/upload';

// Handle GET requests (fetch all products)
export async function GET() {
  try {
    await dbConnect();
    const products: IProduct[] = await Product.find({});
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// Handle POST requests (add a new product)
export async function POST(req: NextRequest) {
  //const authError = await authAdmin(req);  // Check if the user is authenticated
  //if (authError) return authError;  // Return error if not authenticated


  const uploadResult:any = await uploadMiddleware(req);
    
    // Check if the upload was successful
    if (!uploadResult.success) {
      return NextResponse.json({ success: false, message: "Upload failed" }, { status: 500 });
    }
    const {formData,imgSrc}=uploadResult;
    const name = formData.get('name');
    const price = formData.get('price');
    const description = formData.get('description');
 
    
    try {
      await dbConnect();
      const newProduct = new Product({
        name,
        price,
        description,
        imageUrl:imgSrc
    });
    await newProduct.save();
    return NextResponse.json({ message: 'Product added successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error adding product' }, { status: 400 });
  }
}

// Handle PUT requests (update an existing product)
export async function PUT(req: NextRequest) {
  const authError = await authAdmin(req); // Check if the user is authenticated
  if (authError) return authError; // Return error if not authenticated

  try {
    await dbConnect();
    const body = await req.json();
    const { id, ...updateData } = body; // Extract product ID and update data from the request body

    if (!id) {
      return NextResponse.json({ message: 'Product ID is required' }, { status: 400 });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedProduct) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product updated successfully', product: updatedProduct }, { status: 200 });
  } catch (error:any) {
    console.error(error); // Log the error for debugging purposes
    return NextResponse.json({ message: 'Error updating product', error: error.message }, { status: 500 });
  }
}

// Handle DELETE requests (delete a product)
export async function DELETE(req: NextRequest) {
  const authError = await authAdmin(req); // Check if the user is authenticated
  if (authError) return authError; // Return error if not authenticated
  
  try {
    await dbConnect();
    
    // Extract the product ID from the query parameters
    const { id }: any = await req.json(); // Use await req.json() to get the body

    if (!id) {
      return NextResponse.json({ message: 'Product ID is required' }, { status: 400 });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error:any) {
    console.error(error); // Log the error for debugging purposes
    return NextResponse.json({ message: 'Error deleting product', error: error.message }, { status: 500 });
  }
}