import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { dbConnect } from "@/lib/mongo";
import { createUser } from "@/queries/users";
import { User } from "@/model/user-model";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    console.log("Registering user:", { name, email, password });
    await dbConnect();
    const hashedpassword = await bcrypt.hash(password,5);
    const newUser = new User({
      name,
      password: hashedpassword,
      email
    });
    try {
      await createUser(newUser);
    } catch (err) {
      const errorMessage = typeof err === "object" && err !== null && "message" in err ? (err as { message: string }).message : "Unknown error";
      return new NextResponse(errorMessage, {
        status: 201
      });
    }
    return NextResponse.json(
      { message: "User registered successfully" },
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
  await dbConnect();
  const users = await User.find();
  return NextResponse.json(users);
}