import React from 'react';
import ReactDOM from 'react-dom';
import RoloApp from './RoloApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RoloApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
