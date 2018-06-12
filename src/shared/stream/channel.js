// prettier-ignore
export const createChannel = channel => {
  let buffer = []
  let readers = []
  let done = false

  return channel = {
    next: () => new Promise(resolve => done ? resolve({ done }) :
      readers.unshift(resolve) &&
      buffer.length && readers.pop()(buffer.pop()())
    ),
    put: value => new Promise((resolve, reject) =>
      done ? reject(new Error('trying to put in a closed channel')) :
      buffer.unshift(() => resolve() || { value, done }) &&
      readers.length && readers.pop()(buffer.pop()())
    ),
    close: () => done = true &&
      readers.concat(buffer).forEach(resolve => resolve({ done })),
    [Symbol.asyncIterator]: () => channel,
  }
}
