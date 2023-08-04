import { connectDb } from "@/dbConfig/DbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
connectDb()
export async function POST(req) {
  try {
    const { username, email, password } = await req.json()
    const user = await User.findOne({ email })
    if (user) {
      return NextResponse.json({ msg: 'user already existed' }, { status: 400 })
    }
    const salt = await bcryptjs.genSalt(10)

    const hashedPassword = await bcryptjs.hash(password.toString(), salt)
    await User.create({
      username,
      email,
      password: hashedPassword
    })

    return NextResponse.json({ msg: 'user created successfully' }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ msg: 'something went wrong', error: error.message }, { status: 500 })
  }
}