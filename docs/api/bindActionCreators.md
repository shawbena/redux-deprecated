# `bindActionCreators(actionCreators, dispatch)`
转换其值为 [action creators]() 的对象为有同样键但每个 action creator 包裹进 [dispatch]() 调用，以致于可以直接调用。

正常情况下，你应该仅直接调用 [Store]() 实例上的 [dispatch]()。如果你在 React 中使用 redux, [react-redux]() 给你提供可以直接调用的 [dispatch]() 函数。

`bindActionCreators` 的唯一用途是当你想向意识不到 Redux 的组件传递一些 action creators, 而且你不想向组件传递 [dispatch]() 或 Redux store.

## Parameters

1. `actionCreators` (Function | Object): 一个[action creator](), 或者一个其值 (应该是键的值) 为 action creators 的对象。

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

        this.boundActionCreators = bindActionCreators(TodoActionCreators, dispatch);
         console.log(this.boundActionCreators);
         // {
         //   addTodo: Function,
         //   removeTodo: Function
         // }
    }
    

}
```