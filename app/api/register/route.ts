import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    const { name, email, password } = await req.json();
    console.log(name, email, password);

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
