# Reducers


# Designing the State Shape

在 Redux 中，所有的应用状态都被存储为一个单个对象。在写代码前想下应用状态的形状是个好主意。你应用状态用对象的最小表示是什么？

对于我们的 todo 应用程序，我们想存储两个不同的事情：

- 当前选中的可见的过滤器

-
...


## Designing the State Shape

你通常发现，你需要存储一些数据，及一些 UI 状态，在状态树里。这很好，但尽量保持数据与 UI 状态分离。

```js
{
    visibilityFilter: 'SHOW_ALL',
    todos: [
        {
            text: 'Consider using Redux',
            complete: true
        },
        {
            text: 'Keep all state in a single tree',
            completed: false
        }
    ]
}
```

> Note on Relationships
>
> 

## Handling Actions

现在我们已经决定我们的状态对象是什么样子，我们要为他写一个 reducer. reducer 是个单纯的函数，接收先前的状态和一个 action, 并返回下一个状态。

```syntax
(previousState, action) => newState
```

叫他 reducer 是因为这个类型的函数将传递给 `Array.prototype.reduce(reduce, ?initialValue)`. reducer 保持 pure 是很重要的。在 reducer 中你不应该：

- 修改其参数

- 执行副作用，如 API 调用及路由动画

- 调用非纯函数，如 `Date.now()` 或 `Math.random()`

我们将在[高级关卡](https://redux.js.org/advanced)中探索如何执行副作用。现在，只要记住 reducer 必须是 pure function 就好。给定同一参数，他必须计算出接下来的状态并返回他。没有惊喜。没有副作用。没有 API 调用。没有修改 (no mutation). 仅仅计算。

说明这个之后，让我们开始写我们的 reducer 慢慢教他理解我们之前定义的 [actions](https://redux.js.org/basics/actions).

我们先指定初始状态。Redux 第一次将会以 `undefined` 调用我们的 reducer. 我们可以利用这个机会为我们的应用指定初始状态：

```js
import { VisibilityFilters } from './actions';

const initialState = {
    visibilifyFilter: VisibilityFilters.SHOW_ALL,
    todos: []
};

function todoApp(state, action){
    if(typeof state == 'undefined'){
        return initialState;
    }

    // for now, don't hanlde any actions
    // and just return the state given to us. 
    return state;
}
```

更简洁的是使用 ES6 默认参数语法，这样更紧凑些：

```js
function todoApp(state = initialState, action){
    // For now, don't handle any actions
    // and just return the state given to us.
    return state;
}
```

现在让我们处理 `SET_VISIBILITY_FILTER`. 我们要做的就是改变状态上的 `visibilityFilter`. 简单：

```js
function todoApp(state = initialState, action){
    switch(action.type){
        case SET_VISIBILITY_FILTER:
            return Object.assign({}, state, {
                visibilityFilter: action.filter
            });
        default:
            return state;
    }
}
```

Note that:

1. 我们并没有修改 `state`. 我们用 `Object.assign()` 创建了一个拷贝。 `Ojbect.assign(state, { visibilityFilter: action.filter })` 是错的：他修改了第一个参数。你必须提供一个空的对象作为第一个参数。你也呆以使用 [object spread operator]() `{ ...state, ...newState }`.

2. 我们在 `default` 分支中返回了之前的 `state`. 对未知的 action 返回先前的 `state` 是重要的。

Note on `Object.assign`
...

Note on `switch` and Boilerplate
....

## Handling More Actions

我们还有两个 actions 要处理！就像我们处理 `SET_VISIBILITY_FILTER` 那样，我们也将引入 `ADD_TODO` 及 `TOGGLE_TODO` actions 然后扩展我们的 reducer 处理 `ADD_TODO`.

```js
import {
    ADD_TODO,
    TOGGLE_TODO,
    SET_VISIBILITY_FILTER,
    VisibilityFIlters
} from './actions';

function todoApp(state = initialState, action){
    switch(action.type){
        case SET_VISIBILITY_FILTER:
            return Object.assign({}, state, {
                visibilityFilter: action.filter
            })
        case ADD_TODO:
            return Object.assign({}, state, {
                todos: [
                ...state.todos,
                {
                    text: action.text,
                    completed: false
                }
                ]
            });
        default:
            return state
    }
}
```

就如之前的做法一样，我们并未直接写入 `state` 或者是他的字段，而是我们返回了一个新队象。新的 `todos` 等于旧的 `todos` 在其末尾结合一个新的项。新鲜 todo 由使用从 action 返回的数据构造而成。

最后， `TOGGLE_TODO` 处理应该不会使你感到很吃惊吧：

```js
case TOGGLE_TODO:
    
```

因为我们要更新数组中的特定项，而非修改数组，我们不得创建一个数组，更新特定项，保持其他项不变。如果你发现自己经常做这样的事情，把这种操作写成成辅助函数倒是不错，如 [immutibility-helper](), [updeep](), 或者像 [Immutalbe]() 这样有深更新支持的库。只要记着不要在 `state` 中赋值 ，除非先克隆他。

## Splitting Reducers

目前我们的代码是这样的, 很清晰：

```js
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      })
    case TOGGLE_TODO:
      return Object.assign({}, state, {
        todos: state.todos.map((todo, index) => {
          if (index === action.index) {
            return Object.assign({}, todo, {
              completed: !todo.completed
            })
          }
          return todo
        })
      })
    default:
      return state
  }
}
```

是否有更容易理解的方式呢？似乎 `todos` 和 `visibilityFilter` 是完全独立的更新的。有时状态中的字段依赖依赖彼此是必要的，这里的情形我们可以容易地在一个单独的函数中更新 `todos`:

```js
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    default:
      return state
  }
}
​
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: todos(state.todos, action)
      })
    case TOGGLE_TODO:
      return Object.assign({}, state, {
        todos: todos(state.todos, action)
      })
    default:
      return state
  }
}
```

#

注意区分 ui state, state, store

## Pure function

满足以下两点的函数被称为 Pure function:

- 给定同样的参数总是求出同样的结果，函数执行结果不依赖任何隐藏信息或程序执行中可能变化的状态，也不依赖外部 I/O 设备输出。

- 求值结果不造成任何句意上可观察的副作用或输出，如修改可修改对象或输出至 I/O 设备

[Pure function](https://en.wikipedia.org/wiki/Pure_function)
