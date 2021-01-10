import React from 'react';
import ReactDOM from 'react-dom';
import { JournalApp } from './JournalApp';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './styles/styles.scss';


ReactDOM.render(
  <JournalApp />,
  document.getElementById('root')
);

serviceWorkerRegistration.register();