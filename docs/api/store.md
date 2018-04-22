# Store

存储你应用程序的整个 [state tree](../glossary.md#state) 的 store.

改变其中的 state 的唯一方法是对他 dispatch an [action](../glossary.md#action).

store 并不是类。只是一个有些方法的对象。要创建他，给 [createStore](createStore.md) 传递你的根 [reducing function](../glossary#reducer)

> A Note for Flux Users
>
> 如果你来自 Flux, 有个重要的不同之处你需要理解。Redux 没有 Dispatcher 也不支持多 stores. 而是只有一个有根 [reducing function](../glossary#reducer) 的单个 store. 随着你的应用成长，你将根 reducer 分割成小的 reducers 独立的操作 state tree 的不同部分，而非添加 stores. 你可以使用像 [combineReducers]() 这样的辅助函数把他们结合起来。这类似于一个 React 应用只有一个根组件，但他是有许多小组件编辑而成的。

## Store Methods

- [getState()](#getState)

- [dispatch(action)](#dispatch(action))

- [subscribe(listener)]()

- [replaceReducer(nextReducer)]()

### `getState()`

返回你应用程序的当前状态树。等于 store 的 reducer 上回返回值。

__Returns__

(any): 你应用的当前状态树。

### `dispatch(action)`

派出一个 action. 这是触发状态变化的唯一方法。

将会以当前的 [getState]() 结果及给定 `action` 调用 store 的 reducing 函数。返回值将被视为接下来的 state. 从现在开始他们同 [getState()](#getState()) 返回，并且将会通知变化侦听函数 (订阅者)。

> A Note for Flux Users
>
> 如果你在 [reducer]() 中尝试调用 `dispatch`, 将会抛出错误说 "Reducer may not dispatch acitons." 这类似 Flux 中的 "Cannot dispatch in a middle of dispatch" 错误，但不会造成与此相关的问题。在 Flux 中，当 Stores 在处理 action 及发出更新时禁止 dispatch. 这是不幸的，因为这使得无法在组悠扬生命周期钩子或其他开始的地方 dispatch actions.
>
> 在 Redux 中，根 Reducer 返回新 state 后会调用订阅(函数)，所以允许你在订阅函数中 dispatch. 唯一不允许的是在 reducers 中 dispatch, 因为 reducers 必须不能有副作用。如果你想触发一个副作用作为对 action 的响应，正确的地方是在潜在的异步 [action creator](../glossary.md#action-creator)

__Arguments__

- `action` (Object<sup>†</sup>): 一个纯对象 (plain objec)，描述你的程序的有意义的变化。Action 是获取 store 数据来源的唯一方式，所以任何数据，无论来自 UI 事件，网络回调，或者其他来源如 WebSocket 都需要作为 action 被 dispatch. Acitons 必须有一个 `type` 字段以指明要执行的 action 的类型。Types 可以定义为常量然后从其他模块引入。使用字符串类型的 `type` 比 [Symbols]() 更好些，因为字符串是可序列化的 (serializable)。除了 `type`, action 对象的其他结构真的由你决定。如果你感兴趣，看下 [Flux Standard Action]() 了解下推荐的创建 action 的做法。

__Returns__

(Object<sup>†</sup>): dispatched action (见注).

__Notes__

<sup>†</sup>"vanilla" 存储实现,你通过调用 [createStore]()获得, 仅仅支持单纯的 object 对象并立即把他们交给 reducer.

然而，如果你以 [applyMiddleware]() 包裹 [createStore](), 中间件可以换种方式解释 actions, 并提供 dispatching [async acitons]() 的支持。异步的 actions 通常是异步的基本值如 Promises, Observables 或 thunks.

中间件由社区创建，默认并不随 Redux 发放。你需要自己安装包如 [redux-thunk]() 或 [redux-promise]() 如果你想用的话。你也可以创建自己的中间件。

学习下如何描述异步 API 调用，在 action creators 中读取当前的 state, 执行副作用，或链式他们按顺序执行，见 [applyMiddleware](applyMiddleware.md) 示例。

__Example__

```js
import { createStore } from 'redux';
const store = createStore(todos, ['Use Redux']);

function addTodo(text){
    return {
        type: 'ADD_TODO',
        text
    };
}

store.dispatch(addTodo('Read the docs'));
store.dispatch(addTodo('Read about the middleware'));
```

### `subscribe(listener)`

添加一个订阅者。action 被 dispatch, 及部分 state tree 可能潜在的变化都会调用订阅者。你可以在回调中调用 `getState()` 读取当前的 state tree.

允许你在订阅函数中 (change listener) 调用 [dispatch]()，但有以下警告：

1. 只应在响应用户 acitons 或在特定情形 (如当 store 有特定的字段时调触发一个 action) 下调用 [dispatch](). 调用 [dispatch()]() 不带任何条件技术上是可以的，然而这会导致无穷的循，因为每次 [dispatch]() 调用通常会再次触发侦听函数。

2. 就在每次 [dispatch()]() 调用前订阅被拍照保存起来了。如果当这些订阅函数被调用时你订阅或取消订阅，这将不会影响当前正在进行中的 [dispatch](). 然而，下次 [dispatch()]() 调用，无论嵌套与否，将会使用最近的订阅列表快照。

3. 订阅者不应该期望看见所有的状态变化，因为在一个嵌套的 [dispatch()]() 期间 state 可能被更新多次。然而保证在 [dispatch()]() 开始前注册的订阅者将会以其退出时的最新状态调用。

这是一个低层次的 API. 你不大可能会直接使用他，而是使用 React (or other)bindings, 你可能想写一个[自定义的 `observeStore` 工具](https://github.com/reactjs/redux/issues/303#issuecomment-125184409). `Store` 也是一个 [Observable](https://github.com/zenparsing/es-observable), 所以用 [RxJS]() 这样的库 `subscribe` 变化。

要取消订阅，调用 `subscribe` 返回的函数。

__Arguments__

- `listener` (Function): action 被发出后，state 树可能变化时要调用的回调。你可以在这个回调中调用 [getState()]() 读取当前的 state tree. 期望 store 的 reducer 是纯函数是合理的，这样你可以比较 state tree 中深处的引用来获知其值是否发生了变化。

__Returns__

(Function): 可取消订阅的函数。

__Example__

```js
function select(state){
    return state.some.deep.property;
}

let currentValue;
function handleChange(){
    let previousVale = currentValue;
    currentValue = select(store.getState());

    if(previousValue !== currentValue){
        console.log('Some deep nested property changed from', previousValue, ' to ', currentValue);
    }
}

const unsubscribe = store.subscribe(handleChange);
unsubscribe();
```

### `replaceReducer(nextReducer)`

替换当前 store 当前用来计算 state 的 reducer.

这是个高级 API. 如果你的应用实现的代码分割 (code splitting) 而且你想动态加载一些 reducers 时可能需要这些。如果你的 Redux 实现了热加载机制你可能也需要实现这。

__Arguments__

`nextReducer` (Function) store 接下来使用的 reducer.