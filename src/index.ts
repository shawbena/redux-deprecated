import { createStore } from 'redux';
import todoApp from './reducers';
import { addTodo, toggleTodo, setVisibiltyFilter } from './actions';
import { ActionTypes, VisibilityFilters } from './actions';

const store = createStore(todoApp);

console.log(store.getState());

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

// dispatch some actions
store.dispatch(addTodo('Learn about actions'));
store.dispatch(addTodo('Learn about reducers'));
store.dispatch(addTodo('Learn about store'));

store.dispatch(toggleTodo(0));
store.dispatch(toggleTodo(1));
store.dispatch(setVisibiltyFilter(VisibilityFilters.SHOW_COMPUTED));

unsubscribe();