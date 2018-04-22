# Store

前面的章节，我们定义了 actions 表示发生的动作，及根据动作更新 state 的 reducers.

`Store` 是将他们结合起来的对象。store 有以下责任：

- 存放应用状态

- 允许通过 `getState()` 访问状态

- 允许通过 `dispatch(action)` 更新状态

- 通过 `subscribe(listener)` 注册侦听器

- 通过 `subscribe(listener)` 返回的函数解绑侦听器

注意在一个 Redux 应用中只能有一个 store. 如果你想分割你的数据处理逻辑，你将使用 [reducer composition]() 而不是多个 stores.

如果你有一个 reducer 的话，创建一个 store 禾简单的。在之前的章节中我们使用 [combineReducers]() 将多个 reducer 结合成一个。现在我们引入他，并将他传递给 [createStore]().

```js
import { createStore } from 'redux';
import todoApp from './reducers';
const store = createStore(todoApp);
```

给 `createStore` 传递第二个参数可以指定初始状态。当化合客户端状态以配置服务器上运行的应用状态是有用的。

```js
const store = creatStore(todoApp, window.STATE_FROM_SERVER);
```

现在我们已经创建一个 store, 让我们验下！即使没有 UI，我们也可以更新逻辑。

```js
import{
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters
} from './actions';

// Log the initial state
console.log(store.getState())
 
// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)
 
// Dispatch some actions
store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))
store.dispatch(toggleTodo(0))
store.dispatch(toggleTodo(1))
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))
 
// Stop listening to state updates
unsubscribe()
```

运行 `npm run build`, 打开 build/index.html 查看结果:

![result](/images/test-store.png)

你甚至可以在写 UI 之前指定 app 的行为。但在这个教程中我们不这么做，这时你应该能测试你的 reducers 及 action creators 了。不需要什么都模拟，他们只是个纯函数罢了，调用他们，断言返回值。

# Next Steps

在为我们的 todo app 创建 UI 前时，我们将绕道学习下 [how the data flows in a Redux application](https://redux.js.org/basics/data-flow)
