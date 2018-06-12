import { createChannel, reduce } from './stream'

// prettier-ignore
export const createStore = (reducer, initialState, chan = createChannel()) => (
  chan.put(),
  Object.assign(
    reduce(reducer, initialState)(chan),
    { dispatch: chan.put }
  )
)
