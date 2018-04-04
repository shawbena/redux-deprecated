import { AnyAction, combineReducers } from 'redux';
import { 
    ActionTypes,
    VisibilityFilters,
} from './actions';

export interface Todo{
    text: string;
    completed: boolean;
}

export interface TodoState {
    visibilityFilter: VisibilityFilters;
    todos: Array<Todo>;
}

// main reducer
// function todoApp(state: TodoState, action: AnyAction): TodoState{
//     return{
//         visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//         todos: todos(state.todos, action)
//     };
// }

const todoApp = combineReducers<TodoState>({
    visibilityFilter,
    todos
});


function visibilityFilter(state = VisibilityFilters.SHOW_ALL, action: AnyAction) {
    switch (action.type) {
      case ActionTypes.SET_VISIBILITY_FILTER:
        return action.filter
      default:
        return state
    }
  }
/**
 * multiple todos, not state. add todo, toggle todo
 * @param state todos
 * @param action 
 */
function todos(state: Array<Todo> = [], action: AnyAction): Array<Todo>{
    switch(action.type){
        case ActionTypes.ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ];
        case ActionTypes.TOGGLE_TODO:
            return state.map((todo, index) => {
                if(index === action.index){
                    return { text: todo.text, completed: !todo.completed };
                }
                return todo;
            });
        default:
            return state;
    }
}

export default todoApp;
