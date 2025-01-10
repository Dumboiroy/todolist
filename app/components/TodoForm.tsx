import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface TodoFormProps {
  addTodo: (task: string) => void
}

export function TodoForm({ addTodo }: TodoFormProps) {
  const [task, setTask] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (task.trim()) {
      addTodo(task)
      setTask('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex">
      <Input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new todo"
        className="mr-2"
      />
      <Button type="submit">Add</Button>
    </form>
  )
}

