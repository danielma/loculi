import React, { PropTypes } from 'react'

function noop() {}

function centsToString(cents) {
  if (isNaN(cents)) { return '$0.00' }
  if (cents < 10) { return `$0.0${cents}` }
  if (cents < 100) { return `$0.${cents}` }

  const str = cents.toString()
  const lastTwoDigits = str.substring(str.length - 2, str.length)
  const otherDigits = str.substring(0, str.length - 2)

  return `$${otherDigits}.${lastTwoDigits}`
}

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
        value={centsToString(value)}
        onChange={this.handleChange}
        {...others} />
    )
  }
}
