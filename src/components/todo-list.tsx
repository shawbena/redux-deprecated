import React, { SFC } from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../store/state';
import Todo from './todo';

export interface TodoListProps{
    todos: TodoItem[];
    onTodoClick: any;
}

const TodoList: SFC<TodoListProps> = ({ todos, onTodoClick }) => (
    <ul>
        {todos.map((todo, index) => (
            <Todo key={index} {...todo} onClick={() => onTodoClick(index)} />
        ))}
    </ul>
);

TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            completed: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }).isRequired,
    ),
    onTodoClick: PropTypes.func.isRequired
};

export default TodoList;