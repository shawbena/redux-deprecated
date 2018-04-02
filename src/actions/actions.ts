import { 
    ActionTypes,
    VisibilityFilters
} from "./actionTypes";

export interface Action{
    type: ActionTypes;
    text: string;
    filter: VisibilityFilters;
    index: number;
}
/*
* action creators
*/

export function addTodo(text: string){
    return { type: ActionTypes.ADD_TODO, text };
}

export function toggleTodo(index: number){
    return { type: ActionTypes.TOGGLE_TODO, index };
}
// change filter to it's type
export function setVisibiltyFilter(filter: string){
    return { type: ActionTypes.SET_VISIBILITY_FILTER, filter };
}