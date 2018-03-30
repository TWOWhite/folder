function doNotHave(obj, name) {
    const value = obj[name];
    return value == null || value == undefined;
}
class ImCursor {
    constructor(dispatch, getData) {
        this.dispatch = dispatch;
        this.getData = getData;
        this.cursors = [];
        this.basePath = [];
    }
    clear() {
        this.cursors.length = 0;
    }
    goto(...args) {
        this.basePath = args;
    }
    path(...args) {
        return {
            set: (value) => {
                this.cursors.push({
                    path: this.basePath.concat(args),
                    value,
                });
            }
        };
    }
    commit() {
        this.dispatch(this.cursors);
    }
    get(...args) {
        return this.getData(this.basePath.concat(args));
    }
}
function createStore(_data) {
    const _watcher = new Map(); // key:[{id,watcher}]
    function setIn({ path, value }) {
        let pointer = _data;
        path.forEach((item, index) => {
            if (doNotHave(pointer, item)) {
                pointer[item] = {};
            }
            if (index == path.length - 1) {
                pointer[item] = value;
            }
            pointer = pointer[item];
        });
    }
    function findWatcher({ path }) {
        let wPath = '';
        let result = _watcher.get('/') || [];
        path.forEach((item) => {
            wPath = wPath + '/' + item;
            result = result.concat(_watcher.get(wPath) || []);
        });
        return result;
    }
    return {
        dispatch(cursor) {
            let watchers = [];
            cursor.forEach((item) => {
                watchers = watchers.concat(findWatcher(item));
                setIn(item);
            });
            watchers.forEach((item) => {
                item.watcher(_data);
            });
        },
        getData(paths) {
            let pointer = _data;
            for (let i = 0, len = paths.length; i < len; i++) {
                if (doNotHave(pointer, paths[i])) {
                    return undefined;
                } else {
                    pointer = pointer[paths[i]];
                }
            }
            return pointer;
        },
        addWatcher(path, watcher) {
            const key = '/' + path.join('/');
            const current = _watcher.get(key) || [];
            current.push({
                id: current.length,
                watcher,
            });
            _watcher.set(key, current);
            return current.length;
        },
        removeWatcher(path, id) {
            const current = _watcher.get(path.join('/')) || [];
            _watcher.set(path.join('/'), current.filter(item => item.id != id));
        },
        bindActions(actions) {
            const result = {};
            Object.keys(actions).forEach((key) => {
                result[key] = actions[key].bind(new ImCursor(this.dispatch, this.getData));
            });
            return result;
        }
    };
}


export default createStore;
