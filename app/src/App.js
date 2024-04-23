import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'
import Routes from './routes/route'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './assets/scss/app.scss'
import './assets/css/mobile-menu.css'
import './assets/css/style.css'

import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from 'react-toasts'

function App() {

  let urlnav = {
    count: 0,
    setBaseLabel: function () {
      let ll = document.getElementById('localApiLabel');
      if (window.localStorage.isLocal) {
        if (!ll) {
          let x = document.createElement('div');
          x.id = 'localApiLabel';
          x.innerHTML = 'Local API';
          x.style.backgroundColor = '#ff0a';
          x.style.position = 'fixed';
          x.style.right = 0;
          x.style.top = 0;
          x.style.padding = '7px';
          x.style.fontSize = '11px';
          document.body.appendChild(x);
        }
      } else {
        if (ll) {
          document.body.removeChild(ll);
        }
      }
    }
  };

  useEffect(function () {
    urlnav.setBaseLabel();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="page-container" onMouseDown={function (e) {
            if (e.ctrlKey) {
              if (urlnav.count < 5) {
                console.log(`${5 - urlnav.count} to switch URL base`);
              }
              if (urlnav.count >= 5) {
                urlnav.count = 0;
                if (window.localStorage.isLocal) {
                  window.localStorage.removeItem('isLocal');
                  urlnav.setBaseLabel();
                  alert('API Base changes to remote');

                } else {
                  window.localStorage.setItem('isLocal', 'yes');
                  urlnav.setBaseLabel();
                  alert('API Base changes to local');
                }
              }
              urlnav.count++;
              if (urlnav.tmo) {
                clearTimeout(urlnav.tmo);
              }
              urlnav.tmo = setTimeout(function () {
                urlnav.count = 0;
              }, 2000);
            }
          }}>
            <Routes />
            <ToastsContainer
              store={ToastsStore}
              position={ToastsContainerPosition.TOP_CENTER}
              className="height-80"
            />
          </div>
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
