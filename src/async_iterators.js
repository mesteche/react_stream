import { stream, fp, redux, renderer } from './shared'

import Grid from './Grid'

import { setupInitialState, UPDATES } from './data'
import { ws } from './api'

const { pipe } = fp
const { map, debounce, idleIterator, createChannel } = stream
const { createStore } = redux
const { render, ...props } = renderer

const reducer = (state, { type, data } = {}) =>
  type === 'update' ? { data } : state

const initialState = {
  data: setupInitialState(40, 10),
}

const store = createStore(reducer, initialState)

const debounceClassic = time => iterable => {
  const out = createChannel()

  const run = async () => {
    let timer = null
    for await (const frame of iterable) {
      clearTimeout(timer)
      timer = setTimeout(() => out.put(frame), time)
    }
  }

  run()

  return out
}
const unqueueFrames = async iterable => {
  for await (const frame of iterable) {
    const timer = await idleIterator()
    await new Promise(setTimeout, timer.next().value)
    // for (const time of timer) {
    //   await new Promise(requestAnimationFrame)
    // }
  }
}
// const unqueueFrames = async iterable => {
//   let timer = await idleIterator()
//   for await (const frame of iterable) {
//     for (const time of timer) {
//       await new Promise(requestAnimationFrame)
//     }
//     timer = await idleIterator()
//   }
// }

const mesure = (n, nStart = n) => item => {
  if (n === nStart - 1) {
    console.time('mesure' + nStart)
  }
  if (n === 0) {
    n = nStart
    console.timeEnd('mesure' + nStart)
  }
  n--
  return item
}


ws.addEventListener('open', () => {
  const requestMore = () => ws.send(UPDATES)
  const init = pipe(
    // map(mesure(600)),
    debounce(idleIterator),
    map(({ data }) => (
      <div>
        <button onClick={requestMore}>Update {UPDATES} times</button>
        <Grid state={data} />
      </div>
    )),
    map(render(document.getElementById('app1'))),
    // debounceClassic(200),
    unqueueFrames,
  )

  ws.addEventListener('message', data => {
    store.dispatch({ type: 'update', data: JSON.parse(data.data) })
  })

  init(store)
})
