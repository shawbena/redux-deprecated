import { 
    Action,
    ActionTypes,
    VisibilityFilters,
} from './actions';

interface Todo{
    text: string;
    completed: boolean;
}

interface State {
    visibilityFilter: VisibilityFilters;
    todos: Array<Todo>;
}

// main filter
function todoApp(state: State, action: Action): State{
    return {
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
        todos: todos(state.todos, action)
    };
}

/**
 * multiple todos, not state. add todo, toggle todo
 * @param state todos
 * @param action 
 */
function todos(state: Array<Todo> = [], action: Action): Array<Todo>{
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

// visibility filter
function visibilityFilter(state = VisibilityFilters.SHOW_ALL, action: Action): VisibilityFilters{
    switch(action.type){
        case ActionTypes.SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}