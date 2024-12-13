// TaskList.tsx
import React from 'react';
import TaskItem, { Task } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggle(id: number): void;
  onDelete(id: number): void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete }) => {
  return (
    <ul style={{listStyle:'none', padding:0}}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default TaskList;
