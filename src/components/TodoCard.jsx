
import { useState, useRef, useEffect } from "react";

function TodoCard({ todo, onEdit, onDelete, onStatusChange }) {
  const [isEditing, setIsEditing] = useState(false);

  const [editName, setEditName] = useState(todo.name);
  const [editDescription, setEditDescription] = useState(
    todo.description
  );

  const [editErrors, setEditErrors] = useState({});

  const nameInputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      nameInputRef.current?.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setEditName(todo.name);
    setEditDescription(todo.description);
    setEditErrors({});
    setIsEditing(true);
  };

  const handleSave = () => {
    const newErrors = {};

    if (!editName.trim()) {
      newErrors.name = "Task name is required";
    }

    if (!editDescription.trim()) {
      newErrors.description = "Description is required";
    }

    setEditErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    onEdit(todo.id, {
      name: editName.trim(),
      description: editDescription.trim(),
    });

    setIsEditing(false);
    setEditErrors({});
  };

  const handleCancel = () => {
    setEditName(todo.name);
    setEditDescription(todo.description);
    setEditErrors({});
    setIsEditing(false);
  };

  return (
    <article className="todo-card">
      <div className="todo-card-header">
        {isEditing ? (
          <div className="edit-field">
            <input
              ref={nameInputRef}
              type="text"
              value={editName}
              className={editErrors.name ? "input-error" : ""}
              onChange={(e) => {
                setEditName(e.target.value);
                setEditErrors((prev) => ({
                  ...prev,
                  name: "",
                }));
              }}
            />

            {editErrors.name && (
              <p className="error-message">{editErrors.name}</p>
            )}
          </div>
        ) : (
          <h3>{todo.name}</h3>
        )}

        <span
          className={`todo-status ${
            todo.status === "Completed" ? "completed" : "pending"
          }`}
        >
          {todo.status}
        </span>
      </div>

      {isEditing ? (
        <div className="edit-field">
          <textarea
            value={editDescription}
            rows="3"
            className={
              editErrors.description ? "input-error" : ""
            }
            onChange={(e) => {
              setEditDescription(e.target.value);
              setEditErrors((prev) => ({
                ...prev,
                description: "",
              }));
            }}
          />

          {editErrors.description && (
            <p className="error-message">
              {editErrors.description}
            </p>
          )}
        </div>
      ) : (
        <p className="todo-description">{todo.description}</p>
      )}

      <div className="todo-card-actions">
        <div className="todo-buttons">
          {isEditing ? (
            <>
              <button className="edit-btn" onClick={handleSave}>
                Save
              </button>

              <button className="delete-btn" onClick={handleCancel}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button className="edit-btn" onClick={handleEdit}>
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => onDelete(todo.id)}
              >
                Delete
              </button>
            </>
          )}
        </div>

        <select
          className="status-select"
          value={todo.status}
          disabled={isEditing}
          onChange={(e) =>
            onStatusChange(todo.id, e.target.value)
          }
        >
          <option value="Not Completed">Not Completed</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </article>
  );
}

export default TodoCard;
