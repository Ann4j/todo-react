import { useState, useEffect } from 'react';
import { Task } from './components/TaskItem';
import TaskList from './components/TaskList';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filter,setFilter] = useState<'all' | 'completed' | 'active'>('all');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue) {
      addTask(inputValue.trim());
      setInputValue('');
    }
  };

  const filterTask = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true; // Для 'all'
  });

  return (
    <div>
      <h1>TODOS</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="New task"
          style={{ flex: 1, marginRight: '8px', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px' }}>Add</button>
      </form>
      <TaskList tasks={filterTask} onToggle={toggleTask} onDelete={deleteTask} />
      <div>
        <button onClick={() => setFilter('all')} >
          All
        </button>
        <button onClick={() => setFilter('active')} >
          Active
        </button>
        <button onClick={() => setFilter('completed')} >
          Completed
        </button>
      </div>
    </div>
  );
};

export default App;
