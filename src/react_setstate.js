import React from 'react'
import { render } from 'react-dom'
import { renderer } from './shared'
import { ws } from './api'

import Grid from './Grid'

import { setupInitialState, UPDATES } from './data'

const { render: _, ...props } = renderer

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: setupInitialState(40, 10),
    }
    this.updateLoop = (data) => {
      ws.send(UPDATES)
    }
    this.updateState = data => {
      this.setState(state => ({ data: JSON.parse(data.data) }))
    }
  }
  
  componentDidMount() {
    ws.addEventListener('message', this.updateState)
  }

  componentWillUnmount() {
    ws.removeEventListener('message', this.updateState)
  }

  render() {
    return (
      <div>
        <button onClick={this.updateLoop}>Update {UPDATES} times</button>
        <Grid state={this.state.data} />
      </div>
    )
  }
}

ws.addEventListener('open', () => {
  render(<App />, document.getElementById('app2'))
})
