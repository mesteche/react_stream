import React from 'react'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
import { createStore } from 'redux'
import { ws } from './api'

import Grid from './Grid'

import { setupInitialState, UPDATES } from './data'

import { renderer } from './shared'
const { render: _, ...props } = renderer

const reducer = (
  state = {
    data: setupInitialState(40, 10),
  },
  action = {},
) =>
  action.type === 'update'
    ? {
        data: action.data,
      }
    : state

const mapStateToProps = state => ({
  state: state.data,
})

const mapDispatchToProps = dispatch => {
  ws.addEventListener('message', data => {
    dispatch({ type: 'update', data: JSON.parse(data.data) })
  })
  return dispatch => ({
    updateLoop: () => ws.send(UPDATES),
  })
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(({ updateLoop, state, ...props }) => (
  <div>
    <button onClick={updateLoop}>Update {UPDATES} times</button>
    <Grid state={state} />
  </div>
))

const store = createStore(reducer)

ws.addEventListener('open', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app3'),
  )
})
