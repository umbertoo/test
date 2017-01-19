import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from '../reducers';
import confirmMiddleWare from '../middlewares/confirmMiddleWare';

export default function configureStore(initialState) {

    const store = createStore(reducer, initialState,
        compose(
            applyMiddleware(
              thunk,
              // confirmMiddleWare(),
              logger({timestamp:false,duration:true,collapsed:true})
            ),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );

    if (module.hot) {
        module.hot.accept('../reducers/index', () => {
            const nextRootReducer = require('../reducers/index').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
