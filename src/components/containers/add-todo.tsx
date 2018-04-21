import React, { SFC } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../store/actions';

export interface AddTodoProps {
    dispatch: any; // dispatch in redux
}

let AddTodo: SFC<AddTodoProps> = ({ dispatch }) => {
    let input: HTMLInputElement | null;
    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault();
                if (!input || !input.value.trim()) {
                    return;
                }
                dispatch(addTodo(input.value));
                input.value = '';
            }}>
                <input type="text" ref={node => input = node} />
                <button type="submit">Add AddTodo</button>
            </form>
        </div>
    );
};
// AddTodo = connect()(AddTodo);
let AddTodoWrapper = connect()(AddTodo);
export default AddTodoWrapper;