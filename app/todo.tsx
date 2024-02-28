'use client'

import { useRouter } from "next/navigation"
import {IoCheckmarkOutline, IoClose, IoTrash} from "react-icons/io5"

export default function Todo({id, title, completed} : {id: number, title: string, completed: boolean}){
  const router = useRouter();

  const complete = async () => {
    await fetch("http://217.215.4.238:3000/api/todo", {
      method: "PATCH",
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        id: id,
        complete: !completed 
      })
    })
    router.refresh()
  }
  
  const deleteTodo = async () => {
    await fetch("http://217.215.4.238:3000/api/todo", {
      method: "DELETE",
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    })
    router.refresh()
  }

  return (
    <div className="group hover:bg-gray-200 flex items-center cursor-pointer transition-all" onClick={complete}>
      <div className="flex items-center gap-2 py-2 pl-2 pr-6">
        <p>{completed ? <span className="text-green-400"><IoCheckmarkOutline size={32}/></span> : <span className="text-red-400"><IoClose size={32}/></span>}</p>
        <p className="text-xl text-slate-700 font-semibold">{title}</p>
      </div>
        <button className="group-hover:visible invisible opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 ml-auto mr-4 transition-all" onClick={deleteTodo}>
        <IoTrash size={24} />
      </button>
    </div>
  )
}
