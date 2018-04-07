/// <reference types="react" />
import { SFC } from 'react';
export interface TodoProps {
    onClick: any;
    completed: boolean;
    text: string;
}
/**
 * Todo 组件。
 * @param param0
 */
declare const Todo: SFC<TodoProps>;
export default Todo;
