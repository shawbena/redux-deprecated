# Data Flow

Redux 架构聚焦严格的单向数据流问题 (strict unidirectional data flow)。

这意味着应用中的所有数据都遵循同样的生命周期模式，命名得应用逻辑更加可预测和易于理解。

他也鼓励数据格式化 (data normalization), 这样最后不会有多个，独立的，意识不到彼此的同一数据的拷贝。

如果你仍有疑问，读下 [Motivation]() 及 [Case for Flux]() 找下支持单向数据流的有力证据。尽管 Redux 不是 Flux, 他也有同样的优点。

任何 Redux 应用的数据生命周期有以下4步：

1. 你调用 `store.dispatch(action)`

action 就是一个描述发生什么的对象。如：

```js
{ type: 'LIKE_ARTICLE', articleId: 42 }
{ type: 'FETCH_USER_SUCCESS', response: { id: 3, name: 'Mary' } }
{ type: 'ADD_TODO', text: 'Read the Redux docs.' }
```

把 action 想象成一个非常简短的新闻片段。"Mary liked article 42." 或 "'Read the redux docs.' was added to the list of tods."

在你应用的任何地方你都可以调用 [`store.dispatch(action)`](), 这也包括组件及 XHR 回调中，甚至计划的间隔中 (sheduled intervals).

2. Redux store 调用你给他的 reducer.

[store](store.md) 将传递两个参数给 [reducer](reducers.md): 当前的状态树 (state tree) 及 action. 如，在 todo app 中，根 reducer 可能接收类似下面的东西：

```js
// the current application state (list of todos and chosen filter)
let previousState = {
    visibleTodoFilter: 'SHOW_ALL',
    todos: [
        {
            text: 'Read the docs',
            complete: false
        }
    ]
};

// The action being performed (adding a todo)
let action = {
    type: 'ADD_TODO',
    text: 'Understand the flow.';
};

// your reducer returns the next application state
let nextState = todoAPp(previousSate, action);
```

3. 根 reducer 可将多个 reducers 的输出结合成一个单一的 state 树。

。。。

4. Redux store 存储根 reducer 返回的完成 state.
...

## Next Steps

现在你知道 Redux 怎样工作了，让我们 [connect it to a React app](UsageWithReact.md)

> Note for Advanced Users
> 如果你之前熟悉过基本概念并看过这篇教程，别忘了看下高级教程中的 [async flow](advanced/async-flow.md) 学习下 action 在到达 reducer 之前中间件是如何转换他们的。

#

[data normalization](https://en.wikipedia.org/wiki/Canonical_form#Computing)