import React, { Component } from 'react'
import { DateInput } from 'react-admin'

class CustomDateInput extends Component {
  render () {
    const styles = {
      row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
      }
    }

    const { source, operation, label } = this.props

    return (
      <span style={styles.row}>
        <DateInput
          source={`${source}.${operation}`}
          label={label}
        />
      </span>
    )
  }
}

export default CustomDateInput;