export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggle(id: number): void;
  onDelete(id: number): void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <li style={{display:'flex', alignItems: 'center', marginBottom:'8px'}}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        style={{marginRight:'8px'}}
      />
      <span style={{textDecoration: task.completed ? 'line-through' : 'none'}}>
        {task.text}
      </span>
      <button onClick={() => onDelete(task.id)} style={{marginLeft:'auto'}}>Delete</button>
    </li>
  );
};

export default TaskItem;
