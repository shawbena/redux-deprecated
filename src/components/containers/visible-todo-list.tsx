import { ComponentClass, StatelessComponent } from 'react';
import { connect } from 'react-redux';
import { State, TodoItem } from '../../store/state';
import { VisibilityFilters } from '../../store/actions';
import { toggleTodo } from '../../store/actions';
import TodoList, { TodoListProps } from '../todo-list';

const getVisibleTodos = (todos: TodoItem[], filter: VisibilityFilters) => {
    switch(filter){
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(t => t.completed);
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(t => !t.completed);
        case VisibilityFilters.SHOW_ALL:
        default:
            return todos;
    }
}

// 这里的 state 参数指 Redux store 中的 state
// 将应用状态 (Redux state) 映射为组件 props
const mapStateToProps = (state: State) => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onTodoClick: (id: number) => {
            dispatch(toggleTodo(id));
        }
    };
};

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);

export default VisibleTodoList;