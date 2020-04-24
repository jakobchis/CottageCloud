import React, { Component } from 'react'
import { TextInput } from 'react-admin'

class WildCardInput extends Component {
  render () {
    const { source, label } = this.props

    return (
      <span>
        <TextInput
          source={`${source}.like`}
          label={label}
        />
      </span>
    )
  }
}

export default WildCardInput;