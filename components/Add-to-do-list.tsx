import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function AddTodo() {
    return (
        <div>
            <Input type="text" placeholder="Write here"/>
            <Button>Add</Button>
      </div>
    )
}