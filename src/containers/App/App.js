import React, { PropTypes } from 'react'
import ParseReact from 'parse-react'
import { Main, Login } from 'containers'

export default React.createClass({
  propTypes: {
    children: PropTypes.node,
  },

  mixins: [ParseReact.Mixin],

  observe() {
    return { user: ParseReact.currentUser }
  },

  render() {
    const styles = require('./App.sass')

    return (
      <div className={styles.wrapper}>
        {this.data.user ? <Main>{this.props.children}</Main> : <Login />}
      </div>
    )
  },
})
