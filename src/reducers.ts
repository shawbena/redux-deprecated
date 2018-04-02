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

const initialState: State = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    todos: []
};

function todoApp(state = initialState, action: Action): State{
    switch(action.type){
        case ActionTypes.SET_VISIBILITY_FILTER:
            // return Object.assign({}, state, {
            //     visibilityFilter: action.filter
            // });
            return { ...state, visibilityFilter: action.filter };
        case ActionTypes.ADD_TODO:
            return {
                ...state,
                todos: todos(state.todos, action)
            };
        case ActionTypes.TOGGLE_TODO:
            return {
                ...state,
                todos: todos(state.todos, action)
            };
            
        default:
            return state;
    }
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