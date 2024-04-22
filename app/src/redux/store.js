import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { createBrowserHistory } from 'history'
import { persistReducer, persistStore } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage'
import authReducer from './auth/reducer'

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
}

const history = createBrowserHistory()
const routeMiddleware = routerMiddleware(history)
const middlewares = [routeMiddleware]
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  combineReducers({
    auth: persistReducer(persistConfig, authReducer),
    router: routerReducer,
  }),
  composeEnhancer(applyMiddleware(...middlewares)),
)

const persistor = persistStore(store)

export { store, history, persistor }
