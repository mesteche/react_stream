import React from 'react'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
import { createStore } from 'redux'

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
        data: setupInitialState(40, 10),
      }
    : state

const mapStateToProps = state => ({
  state: state.data,
})

const mapDispatchToProps = dispatch => ({
  updateLoop: () => {
    for (let i = 0; i < UPDATES; i++) dispatch({ type: 'update' })
  },
})

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

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app3'),
)
