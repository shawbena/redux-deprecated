/**
 * Actions for dispatch.
 */
import { AnyAction } from 'redux';
import { VisibilityFilters } from "./actionTypes";
export declare function addTodo(text: string): AnyAction;
export declare function toggleTodo(index: number): AnyAction;
export declare function setVisibiltyFilter(filter: VisibilityFilters): AnyAction;
