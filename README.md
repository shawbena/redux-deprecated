# Read Me

Redux 是一个用于 JavaScript 应用的可预测的状态容器。

他有助于帮助你写行为表现一致的应用，在不同环境中运行 (client, server, native), 而且容易测试。除此之外也提供很好的开发体验，如 [live code editing combined with a time traveling debugger](https://github.com/gaearon/redux-devtools).

Redux 可用于 React, 或其他视图库。他很小，包括依赖只有2KB.

## Basics

- Actions

- Reducers

- Store

- Data Flow

- Using with React

- Exmple: Todo List


### Actions

__Actions__ 是从你的应用发送到 store 的信息荷载。他们的 store 的唯一信息源。你可以使用 `store.dispatch()` 将信息荷载发送到 store.

```js
const ADD_TODO = 'ADD_TODO';
```

```js
{
    type: ADD_TODO,
    text: 'build my first Redux app'
}
```

Actions 只是 JavaScript 对象。Actions 必须有一个 `type` 属性指出要执行什么操作。`type` 通常定义为字符串常量。如果应用够大，可以把表示操作的类型放大单独的模块中。

```js
import { ADD_TODO, REMOVE_TODO} from '../actionTypes';
```

