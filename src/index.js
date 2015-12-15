import React from 'react';
import Parse from 'parse'
import { render } from 'react-dom';
import { App } from 'containers';

Parse.initialize(
  'mBMPw6wrZ1sWdo5C0I3fjh9JYetqOaQXbrKbjiXE',
  'msIKCvhGCUQCKO3zHjvh3vuYoS9QnI12qEuUySj1'
)

render(<App />, document.getElementById('root'));
