class Tree {
    constructor(tree) {
        if (tree) {
            this.tree = tree;
        } else {
            this.tree = {};
        }
    }
    set(path = [], value) {
        let pointer = this.tree;
        for (let i = 0, len = path.length; i < len; i++) {
            const key = path[i];
            const nextKey = path[i + 1];

            if (pointer[key]==undefined||pointer[key]==null) {
                if (typeof (nextKey) == 'number') {
                    pointer[key] = [];
                } else {
                    pointer[key] = {};
                }
            }

            if (nextKey==undefined||nextKey==null) {
                pointer[key] = value;
            }

            pointer = pointer[key];
        }
    }
    get(path = []) {
        let pointer = this.tree;
        for (let i = 0, len = path.length; i < len; i++) {
            const key = path[i];
            if (pointer[key]) {
                pointer = pointer[key];
            } else {
                return null;
            }
        }
        return pointer;
    }
}

export default Tree;
