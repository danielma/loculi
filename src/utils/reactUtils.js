import React from 'react'
import ParseReact from 'parse-react'

export function observe(getObserves) {
  return function wrapWithConnect(Component) {
    const name = Component.displayName || Component.name || 'Component'

    return React.createClass({
      displayName: `Observe(${name})`,

      mixins: [ParseReact.Mixin],

      observe(props, state) {
        return getObserves(props, state)
      },

      render() {
        const props = {
          ...this.data,
          ...this.props,
        }

        return <Component {...props} />
      },
    })
  }
}

export default exports
