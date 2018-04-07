# Actions

`Actions` 是从你的应用程序发送到你的 store 信息荷载。他们是 store 的唯一信息源。你用 [store.dispatch()](http://redux.js.org/docs/api/Store.html#dispatch) 将他们发送到 store.

这是一个 action 示例，表示添加一个新 todo 项：

```js
const ADD_TODO = 'ADD_TODO';
```

```js
{
    type: ADD_TODO,
    text: 'Build my first Redux app'
}
```

Actions 是单纯的 JavaScript 对象。Actions 必须要有一个 `type` 属性指出要执行的 action 的类型。`type` 通常应该定义为字符串常量。一旦你的应用变得足够大，你可能想将他们移动到独立的模块。

```js
import { ADD_TODO, REMOVE_TODO } from '../actionTypes';
```

> 关于样板文件
>
> 你不必在单独的文件中定义 action type, 甚至根本不用定义他们。对于小的项目，用字符串字面量表示 action types 可能会简单些。in large [codebases](https://en.wikipedia.org/wiki/Codebase), 明确声明常量也是有一些好处的。详情读下 [Reducing Boilerplate](http://redux.js.org/docs/recipes/ReducingBoilerplate.html) 关于保持你 codebase 整洁的实践提示。

除了 `type` Action 的其他结构取决于你。如果有兴趣的话，看下 [Flux Standard Action]() 看看推荐的 action 是怎么构建的。

我们将添加一个 action type 描述用户打钩一个完成的 todo. 我们用 `index` 引用这样一个特殊的 todo, 因为我们想把 todo 存在数组中。在真实的应用中，创建新项时生成一个唯一的 ID 是明智的选择。

```js
{
    type: TOGGLE_TODO,
    index: 5
}
```

尽可能每个 action 传递一点数据是个不错的主意。例如，传递 `index` 比传递整个 todo 对象要好些。

最后，我们再添加一个 action 类型用于改变当前可见的 todos.

```js
{
    type: SET_VISIBILITY_FILTER,
    filter: SHOW_COMPLETED
}
```

## Action Creators

__Action creators__ 准确地说是创建 actions 的函数。很容易混淆 "action" 和 "action creator" 这两个术语，使用 action 还是 action creator 视性形而定。

在 Redux 中，action creators 只是仅仅返回一个 action:

```js
function addTodo(text){
    return {
        type: ADD_TODO,
        text
    };
}
```

在传统 Flux 中，调用 action creators 时常常会触发一个 dispatch:

```js
function addTodoWithDispatch(text) {
  const action = {
    type: ADD_TODO,
    text
  }
  dispatch(action)
}
```

在 Redux 中不是这样。// 这样写出的代码不清晰。

如果要发起 dispatch, 要把结果传递给 `dispatch()` 函数：

```js
dispatch(addTodo(text));
dispatch(completeTodo(index));
```

你也可以创建 __bound action creator__ 自动 dispatch.

```js
const boundAddTodo = text => dispatch(addTodo(text));
const boundCompleteTodo = text => dispatch(completeTodo(index));
```

然后直接调用他们：

```js
boundAddTodo(text);
boundCompleteTodo(index);
```

`dispatch()` 函数可以通过 store 直接调用 `store.dispatch()`, 但你很有可能用redux 的辅助方法如 `connect()`. 你可以使用 [bindActionCreators()]() 给 `dispatch()` 函数自动绑定多个 action creators.

Action creators 也可以是异步的并且有副作用。你可以在高级教程中读些关于 [async actions]() 的内容，学习下怎样处理 AJAX 请求及编辑 action creators 为异步控制流。在完成基本教程前不要跳到异步 action, 初级教程涉及到了很多重要的概念，在学高级教程及异步 actions 时这些都用得到。

__action.js__

```js
/*
 * action types
*/

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/*
 * other constants
*/

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};

/*
 * action creators
*/

export function addTodo(text){
    return { type: ADD_TODO, index };
}

export function toggleTodo(index){
    return { type: TOGGLE_TODO, index };
}

export function setVisibilityFilter(filter){
    return { type: SET_VISIBILITY_FILTER, filter };
}

```

## Next Steps

现在让我们订义一些 reducers 指定当你发出这些行动时 state 如何更新。