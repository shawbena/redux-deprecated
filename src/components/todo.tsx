import React, { SFC } from 'react';
import PropTypes from 'prop-types';

export interface TodoProps{
    onClick: any;
    completed: boolean;
    text: string;
}

/**
 * Todo 组件。
 * @param param0 
 */
const Todo: SFC<TodoProps> = ({ onClick, completed, text }) => (
    <li onClick={onClick} style={{ 
        textDecoration: completed ? 'line-through' : 'none'
    }}>{text}</li>
);

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
}

export default Todo;