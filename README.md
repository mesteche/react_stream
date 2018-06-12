# react_stream
sample demo app of react and async iterators

## usage
Install the dependencies
`npm install`

Run the app
`npm start`

Open your browser at: [http://localhost:3000/](http://localhost:3000/)

Now try to edit src/index.js and comment the line 34:

```js
await new Promise(requestAnimationFrame)
```

Now try the line 39:
```js
debounce(idleIterator),
```

### What happened ?
On its own, react can manage to render 60fps on firefox, but it still renders each and every frames.
It means that if you have 600 updates of the state, react will take about 10 sec to get up to date with the last version.

The line 34 ensures that react won't try to render more than once per animation frame, so the rest of the app have more CPU time available.

The line 39 is the real magic.
It will only pass the last version of the state when requested.
If more updates are comming from the state, it will keep the last and drop the rest.
So that means that some updates (most of them actually) won't be rendered.

But it doesn't matter since these updates are building on top of each other,
the last update is always the complete state up to date, and the last update is always rendered.
Another thing to notice: it will only try to get updates from the state if the app as nothing more important to do (is idle).

If you wonder how it works, look at the code in src/shared/stream/time.js
