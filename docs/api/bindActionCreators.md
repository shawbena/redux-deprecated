# `bindActionCreators(actionCreators, dispatch)`
转换其值为 [action creators](../actions#action-creators) 的对象为有同样键但每个 action creator 包裹进 [dispatch]() 调用，以致于可以直接调用。

正常情况下，你应该仅直接调用 [Store]() 实例上的 [dispatch]()。如果你在 React 中使用 redux, [react-redux](https://github.com/gaearon/react-redux) 给你提供可以直接调用的 [dispatch]() 函数。

`bindActionCreators` 的唯一用途是当你想向意识不到 Redux 的组件传递一些 action creators, 而且你不想向组件传递 [dispatch]() 或 Redux store.

## Parameters

1. `actionCreators` (Function | Object): 一个[action creator](../actions#action-creators), 或者一个其值 (应该是键的值) 为 action creators 的对象。

2. `dispatch` (Function): [Store]() 实例上的 [dispatch]() 函数

## Returns

(Function | Object): 一个模拟原始对象的对象，每个函数 (对象的键) 由相应的 action creator 返回 action 后会立即触发 dispatch. 如果 `actionCreators` 是函数，返回值也是一个函数。

## Example

__TodoActionCreators.js__

```js
export function addTodo(text){
    return {
        type: 'ADD_TODO',
        text
    };
}

export function removeTodo(id){
    return {
        type: 'REMOVE_TODO',
        id
    };
}
```

__SomeComponent.js__

```js
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as TodoActionCreators from './TodoActionCreators';
console.log(TodoActionCreators);
//{
//  addTodo: Function,
//  removeTodo: Function
//}

class TodoListContainer extends Component{
    constructor(props){
        super(props);

        const { dispatch } = props;

        // Here's a good use case for bindActionCreators
        // You want a child component to be completely unaware of Redux
        // We create bound versions of these functions now so we can
        // pass them down to our child later.
        this.boundActionCreators = bindActionCreators(TodoActionCreators, dispatch);
         console.log(this.boundActionCreators);
         // {
         //   addTodo: Function,
         //   removeTodo: Function
         // }
    }

    componentDidMount(){
        // Injected by react-redux
        let { dispatch } = this.props;

        // Note: this won't work
        // TodoActionCreators.addTodo('Use Redux');
        
        // Your're just calling a funciton that creates an action.
        // you must dispatch the action, too!
        // will work
        let action = TodoActionCreators.addTodo('Use Redux');
        dispatch(action);
    }

    render(){
        // Injected by react-redux
        let { todos } = this.props;
        return <TodoList todos={todos} {...this.boundActionCreators} />
        
        // An alternative to bindActionCreators is to pass just the dispatch
        // function down, but then your child component needs to import action
        // creators and know about them.
        // return <TodoList todos={todos} dispatch={dispatch} />
    }
}

export default connect(state => ({ todos: state.todos }))(TodoListContainers);
```

## Tips

- 你可能会问：为什么不像经典的 Flux 那样直接将 action creators 绑定到 store 实例上。问题是这不适于于在服务器上渲染的通用 APP (what does that mean?) 很有可能每次请求你都想有一个 store 实例，这样你可以为他们准备不同的数据，但绑定 action creators 意味着所有的请求都被捆绑在一个单个 store 实例上。<!-- ? 一个应用程序应该只能有一个 store -->

- 如果你使用 ES5, 而非 `import * as` 语法你可以把 `require('./TodoActionCreators')` 传给 `bindActionCreators` 的第一个参数。这里需要在意的是 `actionCreators` 参数的值是函数。模块系统没有关系。 <!-- JavaScript Lang -->