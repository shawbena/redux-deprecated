/// <reference types="react" />
import { SFC } from 'react';
import { TodoItem } from '../store/state';
export interface TodoListProps {
    todos: TodoItem[];
    onTodoClick: any;
}
declare const TodoList: SFC<TodoListProps>;
export default TodoList;
