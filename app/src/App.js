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

const basename = process.env.REACT_APP_BASENAME || '/';

window.seoTagLine = 'Evergreen';

function App() {


    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router basename={basename}>
                    <div className="page-container">
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
