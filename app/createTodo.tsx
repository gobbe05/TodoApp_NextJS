'use client'

import { useRouter } from "next/navigation";
import { useState } from "react"
import 'dotenv/config'

export default function CreateTodo() {
  const [title, setTitle] = useState<string>("");
  
  const router = useRouter()

  const create = async () => {
    console.log(process.env.SERVERPATH)
    await fetch(process.env.SERVERPATH + "/api/todo", {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({title})
    })
    setTitle('')
    router.refresh()
  }

  const deleteAll = async () => {
    await fetch(process.env.SERVERPATH + "/api/todo", {
      method: "DELETE",
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({DeleteAll: true})
    })
    router.refresh()
  }

  return (
    <div className="flex flex-col gap-2 my-4 w-100 mx-auto">
      <h3 className="my-2 text-2xl font-bold uppercase text-slate-600 text-center">Create a new todo item</h3>
      <form className="flex items-stretch gap-2">
        <input className="flex-grow border border-slate-600 rounded" value={title} onChange={(event) => {setTitle(event.target.value)}}/>
        <button className="bg-green-400 hover:bg-green-500 text-white p-2 rounded transition-all" type="button" onClick={create}>Submit</button>
        <button className="hidden bg-red-400 hover:bg-red-500 text-white p-2 rounded transition-all" type="button" onClick={deleteAll}>Delete All</button>
      </form>
    </div>
  )
}
