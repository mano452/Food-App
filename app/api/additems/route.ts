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
    const { name, price, description, category } = body;

    if (!name || !price || !description || !category) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    console.log("added:", { name, price, description, category });

    await dbConnect();

    const newUser = new Additem({
      name,
      price,
      description,
      category,
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
