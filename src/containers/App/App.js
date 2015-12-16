import React from 'react'
import ParseReact from 'parse-react'
import { User } from 'parse'
import { Main, Login } from 'containers'

export default React.createClass({
  mixins: [ParseReact.Mixin],

  observe() {
    return { user: ParseReact.currentUser }
  },

  render() {
    const styles = require('./App.sass')

    return (
      <div className={styles.wrapper}>
        {this.data.user ? (
          <div>
            <a className={styles.logout} onClick={User.logOut}>
              <svg viewBox="0 0 60 60">
                <path d="M0,0 L30,0 L30,10 L10,10 L10,50 L30,50 L30,60 L0,60 Z"></path>
                <path d="M20,23 L40,23 L40,10 L60,30 L40,50 L40,37 L20,37 Z"></path>
              </svg>
            </a>
            <Main />
          </div>
        ) : <Login />}
      </div>
    )
  },
})
