// prettier-ignore
export const idleIterator = async () => function*(timer) {
  for (
    let time = timer.timeRemaining();
    time > 0;
    time = timer.timeRemaining()
  ) yield time
}.call(null, await new Promise(requestIdleCallback))

// prettier-ignore
export const debounce = idleIterator => input => {
  const takers = []
  let buffer, done = false

  const runtime = (async timer => {
    for await (const value of input) {
      buffer = (takers.pop() || (b => b))({ value, done })
      timer.next().done && (timer = await idleIterator())
    }
    done = true
  }).call(null, { next: () => ({ value: 0, done: true }) })

  return Object.assign(runtime, {
    [Symbol.asyncIterator]: () => runtime,
    next: () => new Promise(resolve =>
      buffer  ? (buffer = resolve(buffer))  :
      done    ? resolve({ done })           :
      takers.unshift(resolve))
  })
}
