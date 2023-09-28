import AddTodo from "@/components/Add-to-do-list";
import Header from "@/components/Header";
import { ToastDestructive } from "@/components/Toasts";
import TodoApp from "@/components/Todo";
import TodoList from "@/components/TodoList";
import { CommandDialogDemo } from "@/components/commandd";

export default function Home() {
  return (
    <main>
      <TodoApp />
    </main>
  )
}
      // <div>
      //   <Header />
      //   <AddTodo />
      //   <TodoList />

      //   {/* <ToastDestructive /> */}
      //   <CommandDialogDemo />
      // </div>  
