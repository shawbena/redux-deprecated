import { VisibilityFilters } from './actions';
/**
 * 描述待办事项。
 */
export interface TodoItem{
    id: number;
    completed: boolean;
    text: string;
}

/**
 * 定义应用状态 (Redux state).
 */
export interface State{
    todos: TodoItem[];
    visibilityFilter: VisibilityFilters
}