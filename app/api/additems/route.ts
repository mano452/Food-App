// import { NextResponse } from "next/server";
// import { dbConnect } from "@/lib/mongo";
// import { Addproduct } from "@/queries/additem";
// import { Additem } from "@/model/additem";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { name,price,description,category } = body;

//     if (!name || !price || !description || !category) {
//       return NextResponse.json(
//         { message: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     console.log("added:", { name, price,description,category });
//     await dbConnect();
//     const newUser = new Additem({
//       name,price,description,category
//     });
//     try {
//       await Addproduct(newUser);
//     } catch (err) {
//       const errorMessage = typeof err === "object" && err !== null && "message" in err ? (err as { message: string }).message : "Unknown error";
//       return new NextResponse(errorMessage, {
//         status: 201
//       });
//     }
//     return NextResponse.json(
//       { message: "Product added successfully" },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Register API error:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
// // export async function GET() {
// //   await dbConnect();
// //   const users = await User.find();
// //   return NextResponse.json(users);
// // }


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

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }
    const deletedProduct = await Additem.findByIdAndDelete(id);
    if (!deletedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE API error:", error);
      return NextResponse.json(
        { message: "Failed to delete product" },
        { status: 500 }
      );
    }
}