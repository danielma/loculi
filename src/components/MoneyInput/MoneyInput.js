import React, { PropTypes } from 'react'
import { noop, money } from 'utils'

export default class MoneyInput extends React.Component {
  static propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    value: 0,
    onChange: noop,
  }

  handleChange = () => {
    const { value } = this.refs.input

    this.props.onChange(parseFloat(value.replace(/(\W|^.0+|\.)/g, '')))
  }

  render() {
    const { onChange, value, ...others } = this.props

    return (
      <input
        type="text"
        ref="input"
        value={money.centsToString(value)}
        onChange={this.handleChange}
        {...others} />
    )
  }
}
