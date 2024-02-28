import CreateTodo from "./createTodo"
import Todo from "./todo";
async function GetTodos(complete?: boolean) {
  const response = await fetch("http://217.215.4.238:3000/api/todo", {
    cache: 'no-store',
    method: "GET",
  })
  const data = await response.json()
  const filteredData = data.todos.filter((todo: {id: number, title: string, complete: boolean}) => todo.complete == complete || complete == undefined)
  return filteredData
}

export default async function Todos() {
  const completedTodos = await GetTodos(true);
  const uncompletedTodos = await GetTodos(false);
  console.log(await GetTodos())

  return (
    <div className="w-100 gap-4">
      <div className="md:w-1/2 xl:w-1/3 m-2 md:mx-auto">
        <CreateTodo />
        <div>
        {uncompletedTodos.map((todo: {id: number, title: string, complete: boolean}) => {
          return <Todo id={todo.id} title={todo.title} completed={todo.complete} key={todo.id} /> 
        })}
        <div className="mt-4">
        {completedTodos.map((todo: {id: number, title: string, complete: boolean}) => {
            return <Todo id={todo.id} title={todo.title} completed={todo.complete} key={todo.id} />
          })}
        </div>
        </div>
      </div>
    </div>
  )
}
