import React from "react";
import Footer from './footer';
import VisibleTodoList from './containers/visible-todo-list';
import AddTodo from './containers/add-todo';

const App = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
);

export default App;