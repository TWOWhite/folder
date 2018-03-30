import immutable from 'immutable';
import { createStore, compose, applyMiddleware } from 'redux';

const DEFAULT_TYPE = '@@IMSTORE_UPDATE';

function getPath(str) {
    return str.split('/');
};
function ImCursor(dispatch, root) {
    let rootPath = [];
    const actions = [];
    return {
        setRoot(pathStr) {
            rootPath = getPath(pathStr);
        },
        set(pathStr, value) {
            actions.push({
                type: 'set',
                path: rootPath.concat(getPath(pathStr)),
                value,
            });
        },
        update(pathstr, value) {
            actions.push({
                type: 'update',
                path: rootPath.concat(getPath(pathstr)),
                value,
            });
        },
        commit() {
            dispatch({
                type: DEFAULT_TYPE,
                data: actions
            });
        },
        get(pathStr) {
            const value = root().getIn(getPath(pathStr));
            if (value.toJS){
                return value.toJS();
            }else{
                return value;
            }
        }
    }
}

class ImAction {
    constructor(args, func) {
        this.args = args;
        this.func = func;
    }
}

export function createImStore(state, otherMiddleWare = []) {
    const defaultState = immutable.fromJS(state);
    function reducer(state = defaultState, { type, data }) {
        if (type == DEFAULT_TYPE) {
            let newState = state;
            data.forEach((item) => {
                if (item.type == 'set') {
                    newState = state.setIn(item.path, item.value);
                } else if (item.type == 'update') {
                    newState = state.updateIn(item.path, item.value);
                }
            });
            return newState;
        } else {
            return state;
        }
    }
    const middle = store => next => (action) => {
        if (action instanceof ImAction) {
            const imCursor = ImCursor(store.dispatch, store.getState)
            action.func.apply(imCursor, action.args);
        } else {
            next(action);
        }
    }
    const enhancer = compose(applyMiddleware(...[...otherMiddleWare, middle]))
    return createStore(reducer, defaultState, enhancer);
}

export function bindActions(actions, dispatch) {
    const newActions = {};
    Object.keys(actions).forEach((key) => {
        newActions[key] = function (...args) {
            dispatch(new ImAction(args, actions[key]));
        }
    });
    return newActions;
}