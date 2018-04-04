import { AnyAction } from 'redux';
import { VisibilityFilters } from './actions';
export interface Todo {
    text: string;
    completed: boolean;
}
export interface TodoState {
    visibilityFilter: VisibilityFilters;
    todos: Array<Todo>;
}
declare const todoApp: (state: TodoState, action: AnyAction) => TodoState;
export default todoApp;
