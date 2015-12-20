import React from 'react';
import Parse from 'parse'
import { render } from 'react-dom';
import { Router } from 'react-router'
import Routes from 'routes'
import createBrowserHistory from 'history/lib/createBrowserHistory'

Parse.initialize(
  'mBMPw6wrZ1sWdo5C0I3fjh9JYetqOaQXbrKbjiXE',
  'msIKCvhGCUQCKO3zHjvh3vuYoS9QnI12qEuUySj1'
)

const history = createBrowserHistory()

render(<Router history={history}>{Routes}</Router>, document.getElementById('root'))
