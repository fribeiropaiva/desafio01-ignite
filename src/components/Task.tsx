import { FiTrash } from 'react-icons/fi'

export default function Task({ id, isComplete, title, handleToggleTaskCompletion, handleRemoveTask}) {
  return (
    <li key={id}>
      <div className={isComplete ? 'completed' : ''} data-testid="task" >
        <label className="checkbox-container">
          <input
            type="checkbox"
            readOnly
            checked={isComplete}
            onChange={() => handleToggleTaskCompletion(id)}
          />
          <span className="checkmark"></span>
        </label>
        <p>{title}</p>
      </div>

      <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(id)}>
        <FiTrash size={16}/>
      </button>
    </li>
  );
}