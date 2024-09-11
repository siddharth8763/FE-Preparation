
function TodoList({ todos, tab, theme }) {
  const visibleTodos = React.useMemo(() => filterTodos(todos, tab), [todos, tab]);
  // ...
}
