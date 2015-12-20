import React from 'react';
import Parse from 'parse'
import { render } from 'react-dom';
import { Router } from 'react-router'
import Routes from 'routes'

Parse.initialize(
  'mBMPw6wrZ1sWdo5C0I3fjh9JYetqOaQXbrKbjiXE',
  'msIKCvhGCUQCKO3zHjvh3vuYoS9QnI12qEuUySj1'
)

render(<Router>{Routes}</Router>, document.getElementById('root'))
