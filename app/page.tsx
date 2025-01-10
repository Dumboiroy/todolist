'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'

// Initialize the Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL='https://tyrdvwjavggqlsvilrjy.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5cmR2d2phdmdncWxzdmlscmp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1MDIzODQsImV4cCI6MjA1MjA3ODM4NH0.0iRje_zckvvQOqgvRXwZ8nqISowjkfBAVKRrKBA6CBQ'
)

export default function Home() {
  const [todos, setTodos] = useState<any[]>([])

  useEffect(() => {
    fetchTodos()
  }, [])

  async function fetchTodos() {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching todos:', error)
    } else {
      setTodos(data || [])
    }
  }

  async function addTodo(task: string) {
    const { data, error } = await supabase
      .from('todos')
      .insert([{ task }])
      .select()

    if (error) {
      console.error('Error adding todo:', error)
    } else if (data) {
      setTodos([...data, ...todos])
    }
  }

  async function toggleTodo(id: string, is_completed: boolean) {
    const { error } = await supabase
      .from('todos')
      .update({ is_completed: !is_completed })
      .eq('id', id)

    if (error) {
      console.error('Error toggling todo:', error)
    } else {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, is_completed: !is_completed } : todo
        )
      )
    }
  }

  async function deleteTodo(id: string) {
    const { error } = await supabase.from('todos').delete().eq('id', id)

    if (error) {
      console.error('Error deleting todo:', error)
    } else {
      setTodos(todos.filter((todo) => todo.id !== id))
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  )
}

