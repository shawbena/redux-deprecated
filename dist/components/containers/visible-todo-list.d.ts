/// <reference types="react" />
/// <reference types="react-redux" />
import { ComponentClass, StatelessComponent } from 'react';
import { TodoListProps } from '../todo-list';
declare const VisibleTodoList: ComponentClass<Pick<TodoListProps, never>> & {
    WrappedComponent: StatelessComponent<TodoListProps> | ComponentClass<TodoListProps>;
};
export default VisibleTodoList;
