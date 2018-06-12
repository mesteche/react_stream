import { stream, fp, redux, renderer } from './shared'

import Grid from './Grid'

const { pipe } = fp
const { map, debounce, idleIterator } = stream
const { createStore } = redux
const { render, ...props } = renderer

const setupInitialState = (nbRows, nbCols) =>
  Array.from(Array(nbRows), (r, id) => ({
    id,
    cols: Array.from(Array(nbCols), (c, id) => ({
      id,
      value: Math.random(),
    })),
  }))

const reducer = (state, action = {}) =>
  action.type === 'update' ? setupInitialState(40, 10) : state

const initialState = setupInitialState(40, 10)

const store = createStore(reducer, initialState)

const update = () => store.dispatch({ type: 'update' })

const update600 = () => {
  for (let i = 0; i < 600; i++) update()
}

const unqueueFrames = async iterable => {
  for await (const frame of iterable) {
    await new Promise(requestAnimationFrame)
  }
}

pipe(
  debounce(idleIterator),
  map(state => (
    <div>
      <button onClick={update600}>Update 600 times</button>
      <Grid state={state} />
    </div>
  )),
  map(render(document.getElementById('root'))),
  unqueueFrames,
)(store)
