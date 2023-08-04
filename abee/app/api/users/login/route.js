import { connectDb } from "@/dbConfig/DbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connectDb()
export async function POST(req) {
  try {
    const { email, password } = await req.json()
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ msg: 'user not found' }, { status: 400 })
    }

    const isValidPassword = await bcryptjs.compare(password.toString(), user.password)
    if (!isValidPassword) {
      return NextResponse.json({ msg: 'password is not valid' }, { status: 400 })
    }
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email
    }
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" })
    const response = NextResponse.json({ msg: 'user logged successfully' }, { status: 200 })
    response.cookies.set("token", token, { httpOnly: true })
    return response
  } catch (error) {
    return NextResponse.json({ msg: 'something went wrong', error: error.message }, { status: 500 })
  }
}