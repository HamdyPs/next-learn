import { connectDb } from "@/dbConfig/DbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Post from "@/models/postModel";
import { NextResponse } from "next/server";

connectDb()
export async function POST(req) {
  try {
    const { title, content } = await req.json()
    const { id } = getDataFromToken(req)
    await Post.create({
      title,
      content,
      userId: id
    })
    return NextResponse.json({ msg: 'post created successfully' }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
export async function GET() {
  try {
    const posts = await Post.find().populate('userId')
    return NextResponse.json({ msg: 'post got successfully', posts }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}