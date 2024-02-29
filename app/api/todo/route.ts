import { NextResponse } from "next/server";
import prisma from "../../db";

export async function GET() {
 const todos = await prisma.todo.findMany();
  return NextResponse.json({todos: todos})
}

export async function POST(req: Request) {
  const {title} = await req.json();
  await prisma.todo.create({
    data: { title, complete: false },
  });
  return NextResponse.json({ message: "Created Todo" }, { status: 200 });
}

export async function PATCH(req: Request) {
  const {id, complete, title} = await req.json()
  if(!id) return NextResponse.json({message: "Id not set"}, {status: 400})
  complete != undefined && await prisma.todo.update({where: {id}, data: {complete}})
  title && await prisma.todo.update({where: {id}, data: {title}})
  return NextResponse.json({message: "Updated id : " + id}, {status: 200})
}

export async function DELETE(req: Request) {
  const {id} = await req.json()
  
  await prisma.todo.delete({where: {id}})
  return NextResponse.json({message: "Success"}, {status: 200})
}
