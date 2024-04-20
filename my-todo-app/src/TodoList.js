function TodoList({ todos, onUpdateTodo, onDeleteTodo }) {
    return (
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">
            {todo.title}
            <button onClick={() => onUpdateTodo(todo.id, { ...todo, completed: !todo.completed })} className="todo-item button">
              {todo.completed ? '完了' : '未完了'}
            </button>
            <button onClick={() => onDeleteTodo(todo.id)} className="todo-item button">削除</button>
          </li>
        ))}
      </ul>
    );
  }
  
  export default TodoList;
  