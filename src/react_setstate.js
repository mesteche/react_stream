import React from 'react'
import { render } from 'react-dom'
import { renderer } from './shared'

import Grid from './Grid'

import { setupInitialState, UPDATES } from './data'

const { render: _, ...props } = renderer

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: setupInitialState(40, 10),
    }
    this.updateLoop = () => {
      for (let i = 0; i < UPDATES; i++) {
        this.setState(state => ({
          data: setupInitialState(40, 10),
        }))
      }
    }
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

render(<App />, document.getElementById('app2'))
