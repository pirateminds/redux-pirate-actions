<h1 align="center">redux-pirate-actions</h1>

<h5 align="center">Redux actions wrapper to simplify action creation process.</h5>

```js
import { simpleActions } from 'redux-pirate-actions';

export const createDependencies = (actions, store) => {
  const actionsCallbacks = bindActionCreators(simpleActions(actions), store.dispatch)
  return [store, actionsCallbacks]
}
```

Now you doesn't need any type constants for redux. The type field will auto generate with `redux-pirate-actions` using the function name for that.

Actions can be any simple functions

```js
// simple promise
const foo = () => new Promise();

// an object
const boo = () => ({ data: { field: 1, field2: 2 }});

// or almost nothing, but this way you will see the warn in the console with message: 'The action goo should return Object or Promise';
const goo = () => {};
```

## Instalation

`npm install redux-pirate-actions -s`

## Motivation

We trap to constants hell quite often using pure redux functions. And often the constant have same name with action.

```js
const CHANGE_SOMETHING = 'CHANGE_SOMETHING';

const changeSomething = ()=> ({
    type: CHANGE_SOMETHING
});
```

The code become a rubbish, and it can be better. So we drop the constatns and create `redux-pirate-actions` to automate this process.

## How to use

There few way to use the `redux-pirate-actions`. We provide two defined methods.

- `simpleActions` - the actions wrapper that define the type filed when it doesn't exists
- `setActionTypes` - the way to setup types object to be able use it in the reducers
- `getTypes` - the way to get the types object at the reducers

NOTE: to simplify the usage we set the copy of the types object to the `window.types` object. But it's mostly lifehack here.

First of all we needs some actions.

```js
export const foo = () => ({ data: 'foo'});
export const boo = () => ({ data: 'foo'});
```

Then we have to wrap actions before use `bindActionCreators` funcion from `redux`.

```js
import { bindActionCreators } from 'redux'
import { simpleActions } from 'redux-pirate-actions';

export default (actions, store) => {
  const actionsCallbacks = bindActionCreators(simpleActions(actions), store.dispatch)
  return [store, actionsCallbacks]
```

And now at reducers we use actions by name

```js
import { getTypes } from 'redux-pirate-actions';
const types = getTypes();
// or types can come from window object

export function someData(state = '', action) {
    switch (action.type) {
        case types.foo:
            return action.data;

        case types.boo:
            return action.data;

        default:
            return state
    }
}
```

## Limitations

The types object should be received before `redux` init the store with default state. Other vise types would be empty.

We provide possibility to generate types list before `simpleActions` will call via the `setActionTypes`.

```js
import { setActionTypes } from 'redux-pirate-actions';
...
setActionTypes(actions);
...
export const store = createStore({}, reducers);
```

## Examples

This module was developed to act with [redux-pirate-promise](https://github.com/pirateminds/redux-pirate-promise) together. 
The minimal store should looks like: [how to create store](https://gist.github.com/wegorich/2c6a8c2478f9ffce108b5a972fa37fd4
)
The minimal controller should looks like: [how to use](https://gist.github.com/wegorich/d3ec7dd2fe324697bf0d37d3d5caece8)

---
Copyright (c) 2017 Pirate Minds. [Licensed with The MIT License (MIT)](/LICENSE).
