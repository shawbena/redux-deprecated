# API

##  __<Provider store>__

使下面组件层级中的 `connect()` 调用可访问 Redux store. 正常如果你不用 `<Provider>` 包括父组件或祖先组件便不能使用 `connect()`.

如果你真 的需要，你可以手动将 `store` 作为属性 (pror) 传递给每个 `connect()` 过的组件，我们只失推荐在单元测试中存根 (stubbing store) store 时这样做，或在非完整的 React 代码中。正常情况下，你应该用 `<Provider>`.

__Props__

- `store` (Redux Store). 你应用中 的单个 Redux store.

- `childreen` (ReactElement) 根组件层级。

__Example__

_Vanilla  React_

```js
ReactDOM.render(
    <Provider store={store}>
        <MyRootComponent />
    </Provider>,
    rootEl
);
```

_Reacct Router_

```js
ReactDOM.render(
    <Provider>
        <Routeer history={history}>
            <Route path="/" component={App}>
                <Route path="foo" component={Foo} />
                <Route path="bar" component={Bar} />
            </Route>
        </Routeer>
    </Provider>
);
```

## __connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])_

将一个 React 组件连接至 Redux store. `connect` 是 `connectAdvanced` 的简单用法，提供大多使用情形的便利 API. 他不修改组件类，而是返回一个新的，connectedd 类供你使用。

__Arguments__

- [`mapStateToProps(state, [ownProps]): stateProps`]， Function, 如果指定了这个参数，新组件将订阅 Redux store 更新。这意味着任何时候 store 更新了，将调用 `mapStateToPros`. `mapStateToProps` 的结果必须是个单纯的对象 (plain object), 将用来合并成为组件的 props. 如果代乐乐不三十年订阅 store 更新，传递 `null` 或 `undefine` 代替 `mapStateToProps`.

如果你的 `mapStateToProps` 接收两个参数，第二个参数将会是传递给  connected 组件的 props. 每次 conneccted 的组件接收新 props 时都会调用 `mapStateToProps`。（第二个参数通常习惯上叫 `ownProps`）

> Note: `mapStateToProps()` 也可返回函数，这种情形，`mapStateeToProps()` 将被用作特殊的组件实例。很少用到这种情形。
> ...

> `mapStateToProps` 函数的第一个参数是整佧 Redux store state，他返回的对象将被用作  props 传递。这个函数常常被称为 __selector__. 使用 [reselect](https://github.com/reactjs/reselect)更有效地编辑 selectors  和 [compute derived data](https://redux.js.org/recipes/computing-derived-data).

- [`mapDispatchToProps(dispatch, [ownProps]): dispatchProps`]: Object or Function. 如果 (`mapDispatchToProps`) 是 Object, 对象中的函数都被假设为 React action creator. 一个有同样的函数名的对象将合并到组件属性中，对象中的每个 action creator 都被包裹进一个 `dispatch` 调用中，所以可以直接调用。

如果是函数，第一个参数将会是 `dispatch`. 怎么返回一个对象，怎样使用 `dispatch` 绑定 action creator 这都取决于你。(提示：你也可以使用 Redux 的辅助方法 [bindActionCreators()](https://redux.js.org/api-reference/bindactioncreators)).

如果 `mapDispatchToProps` 函数接收两个参数，第二个参数将会是传递给 connected 组件的属性 (props), 每当 connected 组件接收新属性时都会调用 `mapDispatchToProps`. (第二个参数通常习惯上叫 `ownProps`)

如果你既不提供 `mapDipatchToProps` 函数也不提供包 action creators 的对象，默认的 `mapDispatchToProps` 实现，仅仅向你组件的属性注入 `dispatch`.

> Note: 如果你需要控制渲染性能这样的高级情形，`mapDispatchToProps()` 也可以返回一个函数。。。。

- [`mergeProps(stateProps, dispatchProps, ownProps): props`]，Function: 将传递给该函数 `mapStateToProps()`, `mapDispatchToProps()` 的结果，及父组件的 `props`. 返回的对象将作为属性传递给包裹的组件。可以指定该函数根据 props 选择片段 state, 或根据 props 将 action creators 绑定至 props 中的特殊变量。如果忽略了该函数，默认将使用 `Object.assign({}, ownProps, stateProps, dispatchProps)`

- [`options`], Object, 如果指定了，进一步自定义 connect 的行为。除了可传递给 `connectAdvanced()` 的选项，`connect()` 还接收这些选项：

。。。

