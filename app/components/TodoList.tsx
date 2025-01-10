import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

interface Todo {
  id: string
  task: string
  is_completed: boolean
}

interface TodoListProps {
  todos: Todo[]
  toggleTodo: (id: string, is_completed: boolean) => void
  deleteTodo: (id: string) => void
}

export function TodoList({ todos, toggleTodo, deleteTodo }: TodoListProps) {
  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center justify-between bg-white p-3 rounded shadow"
        >
          <div className="flex items-center">
            <Checkbox
              id={todo.id}
              checked={todo.is_completed}
              onCheckedChange={() => toggleTodo(todo.id, todo.is_completed)}
              className="mr-2"
            />
            <label
              htmlFor={todo.id}
              className={`${
                todo.is_completed ? 'line-through text-gray-500' : ''
              }`}
            >
              {todo.task}
            </label>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => deleteTodo(todo.id)}
          >
            Delete
          </Button>
        </li>
      ))}
    </ul>
  )
}

