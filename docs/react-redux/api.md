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

### Arguments

- [`mapStateToProps(state, [ownProps]): stateProps`]， Function, 如果指定了这个参数，新组件将订阅 Redux store 更新。这意味着任何时候 store 更新了，将调用 `mapStateToPros`. `mapStateToProps` 的结果必须是个单纯的对象 (plain object), 将用来合并成为组件的 props. 如果代乐乐不三十年订阅 store 更新，传递 `null` 或 `undefine` 代替 `mapStateToProps`.

如果你的 `mapStateToProps` 接收两个参数，第二个参数将会是传递给  connected 组件的 props. 每次 conneccted 的组件接收新 props 时都会调用 `mapStateToProps`。（第二个参数通常习惯上叫 `ownProps`）

> Note: `mapStateToProps()` 也可返回函数，这种情形，`mapStateeToProps()` 将被用作特殊的组件实例。很少用到这种情形。
> ...

> `mapStateToProps` 函数的第一个参数是整佧 Redux store state，他返回的对象将被用作  props 传递。这个函数常常被称为 __selector__. 使用 [reselect](https://github.com/reactjs/reselect)更有效地编辑 selectors  和 [compute derived data](https://redux.js.org/recipes/computing-derived-data).

- [`mapDispatchToProps(dispatch, [ownProps]): dispatchProps`]: Object or Function. 如果 (`mapDispatchToProps`) 是 Object, 对象中的函数都被假设为 Redux action creator. 一个有同样的函数名的对象将合并到组件属性中，对象中的每个 action creator 都被包裹进一个 `dispatch` 调用中，所以可以直接调用。

如果是函数，第一个参数将会是 `dispatch`. 怎么返回一个对象，怎样使用 `dispatch` 绑定 action creator 这都取决于你。(提示：你也可以使用 Redux 的辅助方法 [bindActionCreators()](https://redux.js.org/api-reference/bindactioncreators)).

如果  `mapDispatchToProps` 函数接收两个参数，第二个参数将会是传递给 connected 组件的属性 (props)，每当 connected 的组件接收新的 props 时，都将再次调用这个函数 (第二个参数习惯上通常叫 `ownProps`).

如果你没有提供 `mapDispatchToProps` 函数，或提供的是充满 action creators 的对象，默认的 `mapDispatchToProps` 实现将向你的组件属性中注入 `dispatch`.

> Note: 高级情形中，如果代乐乐需要对渲染性能有更多的控制，`mapDispatchToProps()` 也可以返回一个函数，这时，返回的函数将...

- [`mergeProps(stateProps,  dispatchProps, ownProps): props`], Function, 将 `mapStateToProps()`, `mapDispatchToProps()` 的结果及父组件的 `props` 作为参数传递，你返回的简单对象 (plain object) 将作为属性传递给包裹的组件。你可以使用这个函数基于属性 (props) 选择片段 state 或将 action creator 绑定至 props 上的特定变量。如果忽略了这从此函数，默认将使用 `Object.assign({}, ownProps, stateProps, dispatchProps)`.

- [`options`], Object, 如果指定了，进一步自定义 connector 的行为。除了传递给 `connectedAdvanceed()` (见下) 的选项，`conneect()` 还接收这些额外的选项：

  - [`pure`], Boolean, 如果 true, 如果相关的 state/props 基于相应的相等检查保持相同 `connect()` 将避免重新渲染和调用 `mapStateToProps`, `mapDispatchToProps`, 及 `mergeProps`. 假设包裹的组件是 "pure" 组件而且除了其 props 及选择的 Redux store 的 state 之外不依赖任何输入或状态。默认值：`true`

  - [`areStatesEqual`], Function, 当为 pure, 比较进入的 store state 与之前的状态。默认值： `strictEqual (===)`

  - [`areOwnPropsEqual`], Function, 当为 pure, 比较传入的 props 与之前的值。默认值：`shalllowwEqual`

  - [`areStatePropsEqual`], Function: 当为 pure 时，比较 `mapStateToProps` 与其之前的值。默认值：`shallowEqual`.

  - [`areMergedPropsEqual`], Function, 当为 pure 时，比较 `mergeProps` 的结果与其之前的值。默认值：`shallowEqual`

  - [`storeKey`], String: 从哪颗读取 store 的 context 键。如果你处于有多从个 store 的不明智的情形时可能需要这样做。默认值: '`store`'

__The arity of mapStateToProps and mpDispatchToProps determines whether they receive ownProps__

> Note: 如果正式的函数定义包含一个强制参数 (function 的长度为 1), `ownProps` 是不会传递给 `mapStateToProps` 及 `mapDispatchToProps`. 例如下定义的函数第二个参数不会接收 `ownProps`:

```js
 function mapStateToProps(state){
    console.log(state); // state
    console.log(arguments[1]); // undefined
 }
```

```js
const mapStateToProps(state, ownProps = {}) => {
    console.log(state); // state
    console.log(ownProps); // undefined
}
```

没有强制参数或有两个参数的函数将收到 `ownProps`:

```js
const  mapStateToProps = (state, ownProps) => {
    console.log(state); // state
    console.log(ownProps); // ownProps
}
```

```js
function mapStateToProps(){
    console.log(arguments[0]); // state
    console.log(arguments[1]); // ownProps
}
```

```js
const mapStateToProps = () => {
    console.log(args[0]); // state
    console.log(args[1]); // ownProps
}
```

__Optimizing connect when options.pure is true__

当 `options.pure` 为 true 时，`connect` 执行一些相等性检查以避免不必要的调用 `mapStateToProps`,  `mapDispatchToProps`, `mergeProps` 及最后的 `render`. 这些 (检查，i see) 包括 `areStatesEqual`, `areOwnPropsEqual`, `areStatePropsEqual`, 及 `areMergedPropsEqual`. 默认值大概适用于 99%  的情形，但你还是可能希望出于性能或其他原因以自定义设置覆盖默认设置。这时有些例子：

- 如果你的 `mapStateToProps` 函数计算开销大而且只与一点 state 关联，你可能希望覆盖 `mapStateToProps`. 如: `areStateEqual: (next, prev) => prev.enties.todos === next.enties.todos`，这会有效地忽略的除小片之外的状态。

- 你可能希望覆盖 `areStatesEqual` 总是返回 false (`areStatesEqual: () => false`) 如果你有不纯 (impure) 的 reducers 修改你的 store state. (这可能会影响其他的相等性检查，取决于你的 `mapStateToProps` 函数)

- 你可能希望覆盖 `areOwnPropsEqual` 来为到来的 props 开白名单。你可能也得实现 `mapStateToProps`, `mapDispatchToProps` 及 `mergeProps` 也来开白名单 props. (实现这可能会简单些，如使用 [recompose's mapProps](https://github.com/acdlite/recompose/blob/master/docs/API.md#mapprops))

- 你可能希望覆盖 `areStatePropsEqual` 使用 `strictEqual` 如果你的 `mapStateToProps` 使用了 memoized selector, 如果相关的属性变化的化将只返回一个新的对象。这对性能的提升很少，因为每次 `mapStateToProps` 调用时将避免单个 props 的额外的相等性检查。

- 你可能希望覆盖 `areMergedPropsEqual` 以实现相等，如果你的 selectors 生成复杂的 props。如, 嵌套的对象，新数组等等 (深度相等检查可应该会比重新渲染快).

### Returns

给你组件传递来自提供的参数衍生的 state 及 aciton creators 的高阶 React 组件类。由 `connectAdvanced` 创建, 高阶组件的细节于此。

### Examples

__Inject just `dispatch` and don't listen to store__

```js
export default connect()(TodoApp);
```

__Inject all action creators(`addTodo`, `completeTodo`, ...) without subscribing to the store__

```js
import * as actionCreators form './actionCreators';
export defalut connect(null, actionCreators)(TodoApp);
```

__Inject `disaptch` and every field in the global state__

> 不要这样做！这会干掉任何性能优化，因为每当 state 变化时，`TodoApp` 将重新渲染。
> 在你视图的组件层级有更细粒度的 `connect()` 来侦听相关的 state 会更好些。

```js
export default connect(state => state)(TodoApp);
```

__Inject `dispatch` and `todos`__

```js
function mapStateToProps(state){
    return { todos: state.todos };
}

export default connect(mapStateToProps)(TodoApp);
```

__Inject `todos` and all action creators__

```js
import * as actionCreators form './actionCreators';

function mapStateToProps(state){
    return { todos: state.todos };
}

export default connect(mapStateToProps, actionCreators)(TodoApp);
```

__Inject `todos` and all aciton creators(`addTodo`, `completeTodo`, ...) as `actions`__

```js
import * as actionCreators from './actionCreators';
import { bindActionCreators } from 'redux';

function mapStateToProps(state){
    return { todos: state.todos };
}

function mapDispatchToProps(dispatch){
    return { acitons: bindActionCreators(actionCreators, dispatch )};
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
```

__Inject `todos` and a specific action creator (`addTodo`)__

```js
import { addTodo } from './actionCreators';
import { bindActionCreators } from 'redux';

function mapStateToProps(state){
    return { todos: state.todos };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ addTodo }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
```

__Inject `todos` and specific action creators (`addTodo` and `deleteTodo`) with shorthand syntax__

```js
import { addTodo, deleteTodo } from './actionCreators';

function mapStateToProps(state){
    return { todos: state.todos };
}

const mapDispatchToProps = {
    addTodo,
    deleteTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
```

__Inject `todos`, todoActionCreators as `todoActions`, and counterActionCreators as `counterActions`__

```js
import * as todoActionCreators from './todoActionCreators';
import * as counterActionCreators from './counterActionCreators';
import { bindActionCreators } from 'redux';

function mapStateToProps(state){
    return { todos: state.todos };
}

function mapDispatchToProps(dispatch){
    return {
        todoActions: bindActionCreators(todoActionCreators, dispatch),
        counterActions: bindActionCreators(counterActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDisaptchToProps)(TodoApp);
```

__Inject `todos`, and todoActionCreators and counterActionCreators together as `actions`__

```js
import * as todoActionCreators from './todoActionCreators';
import * as counterActionCreators from './counterActionCreators';
import { bindActionCreators } from 'redux';

function mapStateToProps(state){
    return { todos: state.todos };
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(Object.assign({}, todoActionCreators, counterActionCreators), dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
```

__Inject `todos`, and all todoActionCreators and counterActionCreators directly as props__

```js
import * as todoActionCreators from './todoActionCreators';
import * as counterActionCreators from './counterActionCreators';
import { bindActionCreators } from 'redux';

function mapStateToProps(state){
    return { todos: state.todos };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Object.assign({}, todoActionCreators, counterActionCreators), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
```


__Inject `todos` of a specific user depending on props, and inject `props.userId` into the action__

```js
import * as  actionCreators from './actionCreators';

function mapStateToProps(state){
    return { todos: state.todos };
}

// good, good
function mergeProps(stateProps, dispatchProps, ownProps){
    return Object.assign({}, ownProps, {
        todos: stateProps.todos[ownProps.userId],
        addTodo: (text) => dispatchProps.addTodo(ownProps.userId, text)
    });
}

export default connect(mapStateToProps, actionCreators, mergeProps)(TodoApp);
```

__Factory functions__

工厂函数 (factory functions) 可用于性能优化。

```js
import { addTodo } from './actionCreators';

function mapStateToPropsFactory(initialState, initialProps){
    const getSomeProperty = createSelector(...);
    const anotherProperty = 200 + initialState[initialProps.another];

    return function (state){
        return {
            anotherProperty,
            someProperty: getSomeProperty(state),
            todos: state.todos
        };
    }
}

function mapDispatchToPropsFactory(initialState, initialProps){
    function goToSomeLink(){
        initialProps.history.push('some/link');
    }
    
    return function(dispatch){
        return {
            addTodo
        };
    }
}

export default connect(mapStateToPropsFactory, mapDispatchToPropsFactory)(TodoApp);
```

## `connectedAdvanced(selectorFactory, [connectOptions])`

将一个 React 组件连接至 Redux store. 虽然 `connect()` 基于此，但此函数并没把 `state`, `props`, `dispatch` 结合成你的组件最终的 props 的想法。他不假定默认值或结果缓存，而是把这此责任留给调用者。

他不修改传给他的组件类，而是返回你一个新的 connected 的组件类。

### Arguments

- `selectorFactory(dispatch, factoryOptions): selector(state, ownProps): props` (Function): 初始化一个 sector 函数 (在每个实例的构造函数中). 每当 connector 组件需要计算新属性就会调用这个 selector 函数。 `selector` 的期望结果是一个单纯的对象，这个对象将会作为属性传递给包裹的组件。如果连续调用 `selector` 返回与上次调用返回的是同一对象 (`===`)，组件将不会重新渲染。`selector` 的职责是适时返回先前的对象。

- [`connectOptions (factoryOptions)`] (Object) 如果指定的话，进一步自义 connector 的行为

 - [`getDisplayName`] (Function): 计算 connector 组件相对包裹的组件的 displayName 属性。通常被包裹组件覆盖。默认值： `name => 'ConnectedAdvanced('+name+')'`

 - [`methodName`] (String): 在错误消息中显示。常被包裹函数覆盖。默认值： `connectAdvanced`
 
 - [`renderGroupProp`] (String): 如果定义了，一个有此值的属性将被添加到传递给组件的 props 中。其值将会是组件已经被渲染的次数，追踪不必要的重新渲染时会很有用。默认值：`undefined`

 - [`shouldHandleStateChanges`] (Boolean): 控制 connector 组件是否订阅 redux store state 变化。如果设为 false, 只在 `componentWillReceiveProps` 时接重新渲染。默认值：`true`

 - [`storeKey`] (String): 得到 store 的 props/context 键。如果你处于不建议的多 store 的情形时才建议你使用这个。默认值：`store`
 
 - [`withRef`] (Boolean): 如果为 true, 存储一个包裹的组件实例的 ref，你可以通过 `getWrappedInstance()` 方法获取到。默认值：`false`

 - 其他传给 `connectOptions` 的额外选项将传给 `selectorFactory` 的 `factoryOptions` 参数。

### Returns

一个高阶的 React 组件类，将来自 store state 的数据构建成 props 传递给包裹的组件。高阶组件是一个函数，他接收一个组件作为参数并返回一个新的组件。

__Static Properties__

- `WrappedComponent` (Component): 传递给 `connectAdvanced(...)(Component)` 的原始的组件类

__Static Methods__

原始组件的所有静态方法都被保留。

__Instance Methods__

`getWrappedInstance(): ReactComponent`

返回包裹的组件实例。只当指定了 `{ withRef: true }` 时可用。

### Remarks

- 由于 `connectAdvanced` 返回一个高阶组件，他需要被调用两次。第一次传递上面描述的参数，第二次传递给组件：`connectAdvanced(selectorFactory)(MyComponent)`

- `connectAdvanced` 不修改传递的 React 组件。他返回一个新的，connected 的组件给你用。

### Examples

__Inject `todos` of a specific user depending on props, and inject `props.userId` into the action__

```js
import * as actionCreators from './actionCreators';
import { bindActionCreators } from 'redux';

function selectorFactory(dispatch){
    let ownProps = {};
    let result = {};
    const actions = bindActionCreators(actionCreators, dispatch);
    const addTodo = (text) => actions.addTodo(ownProps.userId, text);
    return (nextState, nextOwnProps) => {
        const todos = nextState.todos[nextownProps.userId];
        const nextResult = { ...nextOwnProps, todos, addTodo };
        ownProps = nextOwnProps;

        if(!shallowEqual(result, nextResult)){
            result = nextResult;
        }

        return result;
    };
}

export default connectAdvanced(selectorFactory)(TodoApp);
```

## `createProvider([storeKey])`

当创建一个新的 `<Provider>` 将根据传递的 conext 的键设置 Redux Store. 只有处理不建议的多 store 的情形时你才可能需要这样做。你也需要给 [connect]() 的参数 `options` 传递同样的 `storeKey`.

### Arguments

- [`storeKey`] (String): 用于设置 store 的 context 的键。默认值：`store`

### Examples

在创建多个 store 前，请先读下这篇 FAQ: [Can or should I create multiple stores?](http://redux.js.org/docs/faq/StoreSetup.html#can-or-should-i-create-multiple-stores-can-i-import-my-store-directly-and-use-it-in-components-myself)

```js
import { connect, createProvider } from 'react-redux';
const STORE_KEY = 'componentStore';

function connectExtended(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    option = {}
){
    opitons.storeKey = STORE_KEY;
    return connect(
        mapStateToProps,
        mapDispatchToProps,
        mergeProps,
        options
    );
}

export { connectExtended as connect };
```

现在你可以引入 `Provider` 及 `connect` 并使用他们。

