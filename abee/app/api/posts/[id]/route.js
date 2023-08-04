import { connectDb } from "@/dbConfig/DbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Post from "@/models/postModel";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const { id } = params

    await Post.deleteOne({ _id: id })
    return NextResponse.json({ msg: 'post deleted successfully' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
export async function PUT(req, { params }) {
  try {
    const { id } = params
    const { title, content } = await req.json()

    await Post.findByIdAndUpdate(id, { title, content })
    return NextResponse.json({ msg: 'post updated successfully' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET(req, { params }) {
  try {
    const { id } = params
    const posts = await Post.findOne({ _id: id }).populate('userId')
    return NextResponse.json({ msg: 'post get successfully', posts }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}