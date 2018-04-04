import { AnyAction } from 'redux';
import { 
    ActionTypes,
    VisibilityFilters
} from "./actionTypes";

/*
* action creators
*/

export function addTodo(text: string): AnyAction{
    return { type: ActionTypes.ADD_TODO, text };
}

export function toggleTodo(index: number): AnyAction{
    return { type: ActionTypes.TOGGLE_TODO, index };
}
// change filter to it's type
export function setVisibiltyFilter(filter: VisibilityFilters): AnyAction{
    return { type: ActionTypes.SET_VISIBILITY_FILTER, filter };
}