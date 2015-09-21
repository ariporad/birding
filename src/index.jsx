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

class wrappedApp extends React.Component {
  render() {
    const debug = __DEV__ ? (
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    ) : undefined;
    return (
      <div >
        <Provider store={store}>
          {() => <App />}
        </Provider>
        {debug}
      </div>
    );
  }
}

React.render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={wrappedApp} />
  </Router>
), document.getElementById('root'));
