import { useState } from 'react'
import Task from './Task';

import '../styles/tasklist.scss'

import { FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [ids, setIds] = useState<number[]>([]);

  function createNewId() {
    const newId : number = Math.floor(Math.random() * 100);
    if (ids.filter(id => id === newId).length) {
      createNewId();
    } else {
      setIds([...ids, newId])
      return newId;
    }
  }

  function createTask(taskTitle: string) {
    const newId : number = createNewId()!;
    return { id: newId, title: taskTitle, isComplete: false };
  }

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (newTaskTitle) {
      const newTask = createTask(newTaskTitle)
      setTasks([...tasks, newTask]);
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return {...task, isComplete: !task.isComplete};
      }
      return task;
    })
    setTasks(updatedTasks);
  }

  function handleRemoveTask(idToRemove: number) {
    // Remova uma task da listagem pelo ID
    const updatedTasks = tasks.filter(task => task.id !== idToRemove);
    setIds(ids.filter(id => id !== idToRemove));
    setTasks(updatedTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>
      <main>
        <ul>
          {tasks.map(task => (
            <Task key={task.id} id={task.id} isComplete={task.isComplete} title={task.title} handleToggleTaskCompletion={handleToggleTaskCompletion} handleRemoveTask={handleRemoveTask} />
          ))}
        </ul>
      </main>
    </section>
  )
}