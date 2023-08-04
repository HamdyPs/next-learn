import { connectDb } from "@/dbConfig/DbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Post from "@/models/postModel";
import { NextResponse } from "next/server";
connectDb()
export async function GET(req) {
  try {
    const { id } = getDataFromToken(req)
    const posts = await Post.find({ userId: id }).populate('userId')
    return NextResponse.json({ msg: 'post user got successfully', posts }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}