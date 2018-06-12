export const map = mapper =>
  async function*(iterable) {
    for await (const item of iterable) {
      yield mapper(item)
    }
  }

export const filter = predicate =>
  async function*(iterable) {
    for await (const item of iterable) {
      predicate(item) && (yield item)
    }
  }

export const reduce = (reducer, acc) =>
  async function*(iterable) {
    for await (const item of iterable) {
      yield (acc = reducer(acc, item))
    }
  }
