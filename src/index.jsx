import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import App from './components/App';

import BirdingView from './ducks/BirdingView';

const store = compose(
  devTools(),
  persistState(window.location.href.match(/[?&]debug=([^&]+)\b/))
)(createStore)(combineReducers({ BirdingView }));

class Wrapper extends React.Component {
  render() {
    const debugPanel = (
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    );
    return (
      <div >
        <Provider store={store}>
          {() => <App />}
        </Provider>
        {__DEV__ ? debugPanel: undefined}
      </div>
    );
  }
}

React.render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={Wrapper} />
  </Router>
), document.getElementById('root'));
