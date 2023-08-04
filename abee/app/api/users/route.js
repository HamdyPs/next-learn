import { connectDb } from "@/dbConfig/DbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

connectDb()
export async function GET() {
  try {
    const users = User.find().select('-password')
    return NextResponse.json({ msg: 'post created successfully', users }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}