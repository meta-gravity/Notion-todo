import AddTodo from "@/components/Add-to-do-list";
import { ToastDestructive } from "@/components/Toasts";
import TodoList from "@/components/TodoList";
import { CommandDialogDemo } from "@/components/commandd";


export default function Home() {
  return (
      <div>
        <AddTodo />
        <TodoList />

        <ToastDestructive />
        <CommandDialogDemo />
      </div>  
  )
}
