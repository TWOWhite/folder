import connect from './connect';
import Provider from './Provider'


function getType(obj) {
    return Object.prototype.toString.call(obj).replace(/(\[object\W+|\])/g, '').toLowerCase();
}

function dispatch(path, value) {
    if (path.length <= 0) { //路径到达，更新数据
        if(getType(value)=='function'){
            return value(this);
        }
        return value;
    } else { // 复制更新路径中经历的数据节点
        const key = path.pop();
        if (this[key] == undefined) return this;
        let newData = null;
        if (getType(this) == 'object') {
            newData = Object.assign({}, this);
        } else if (getType(this) == 'array') {
            newData = Object.assign([], this);
        } else {
            throw new Error(`can not dispatch in this type: ${getType(this)}`)
        }
        newData[key] = dispatch.call(newData[key], path, value);
        return newData;
    }
}

function getPath(str) {
    return str.split('/');
}

function getImCursor(dispatch, getstate) {
    let rootPath = [];
    const actions = [];
    return {
        setRoot(pathStr) {
            rootPath = getPath(pathStr);
        },
        set(pathStr, value) {
            actions.push({
                path: rootPath.concat(getPath(pathStr)),
                value,
            });
        },
        update(pathstr, value) {
            actions.push({
                path: rootPath.concat(getPath(pathstr)),
                value,
            });
        },
        commit() {
            dispatch(actions);
        },
        getstate
    }
}

function createStore(data) {
    let _tree = data;
    let _listeners = [];
    const callListener = () => {
        _listeners.forEach(item => item());
    }
    const dispatchAction = (actions) => {
        actions.forEach((item) => {
            _tree = dispatch.call(_tree, item.path.reverse(), item.value);
        });
        callListener();
    };
    const getstate = () => {
        return _tree;
    };
    return {
        subscribe(listener) {
            _listeners.push(listener);
            return _listeners.length - 1;
        },
        unsubscribe(id) {
            _listeners = _listeners.filter((item, index) => index != id);
        },
        bindActions(actions) {
            const newAction = {};
            Object.keys(actions).forEach((key) => {
                newAction[key] = function (...args) {
                    const newImCursor = getImCursor(dispatchAction, getstate);
                    actions[key].apply(newImCursor, args);
                }
            });
            return newAction;
        },
        getstate
    }
}

export {
    connect,
    createStore,
    Provider
}