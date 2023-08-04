import { connectDb } from "@/dbConfig/DbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

connectDb()
export async function GET(req) {
  try {
    const userData = await getDataFromToken(req)
    const user = await User.findOne({ _id: userData.id }).select("-password")
    return NextResponse.json({ msg: 'user found', data: user }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}