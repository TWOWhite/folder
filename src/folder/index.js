import Tree from './tree';
import Cursors from './cursor';
// 创建状态库
function createStore(defaultState) {
    const watcherTree = new Tree();
    const dataTree = new Tree(defaultState);
    function dispatch(list) {
        let watchers = [];
        list.forEach((item) => {
            item.path.reduceRight((pre, curr) => {
                const a = pre.concat([curr]);
                const warr = watcherTree.get(a);
                if (warr) {
                    watchers = watchers.concat(warr);
                }
                return a;
            }, []);
            dataTree.set(item.path, item.value);
        });
        const root = dataTree.get();
        watchers.forEach((func) => {
            func(root);
        });
    }
    return {
        registeWatcher(pathes, func) {
            pathes.forEach((path) => {
                watcherTree.set(path, func);
            });
        },
        createActions(actions) {
            const result = {};
            Object.keys(actions).forEach((key) => {
                result[key] = actions[key].bind(new Cursors(dispatch));
            });
            return result;
        }
    };
}

export default createStore;
