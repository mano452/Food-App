import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { Addproduct } from "@/queries/additem";
import { Additem } from "@/model/additem";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, price, description, category, quantity, image } = body;

    if (!name || !price || !description || !category || !quantity || !image) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    console.log("added:", { name, price, description, category, quantity, image });

    await dbConnect();

    const newUser = new Additem({
      name,
      price,
      description,
      category,
      quantity,
      image,

    });

    try {
      await Addproduct(newUser);
    } catch (err) {
      const errorMessage =
        typeof err === "object" && err !== null && "message" in err
          ? (err as { message: string }).message
          : "Unknown error";
      return NextResponse.json({ message: errorMessage }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Product added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register API error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const products = await Additem.find({});
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("GET API error:", error);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}



export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id, name, price, description, category, quantity, image } = body;
    if (!id || !name || !price || !description || !category || !quantity || !image) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    const updatedProduct = await Additem.findByIdAndUpdate(
      id,
      { name, price, description, category, quantity, image },
      { new: true }
    );
    return NextResponse.json(updatedProduct, { status: 200 });
  }
  catch (error) {
    console.error("PUT API error:", error);
    return NextResponse.json(
      { message: "Failed to update product" },
      { status: 500 }
    );
  }
}
