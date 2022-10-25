import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { persistStore } from 'redux-persist';
import rootReducer from './slices';

const middlewares = [
  thunkMiddleware,
];

/** Below the store has been created with these options:
* - The slice reducers were automatically passed to combineReducers()
* - redux-thunk were added as middleware
* - The Redux DevTools Extension is disabled for production
* - This should not include applyMiddleware() or the Redux DevTools Extension composeWithDevTools,
*   as those are already handled by configureStore
*/

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: {},
  middleware: middlewares,
  devTools: process.env.REACT_APP_ENV !== 'production',
});

export type ReduxState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default () => {
  const persistor = persistStore(store);
  return { store, persistor };
};
