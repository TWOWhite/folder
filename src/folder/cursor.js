class ImCursor {
    constructor(dispatch) {
        this.basePath = [];
        this.cursors = [];
        this.dispatch = dispatch;
    }
    push(path, value) {
        const newPath = this.basePath.concat(path);
        this.cursors.push({
            path: newPath,
            value
        });
    }
    path(...args) {
        return {
            set: (value) => {
                this.push(args, value);
            },
            update: (func) => {
                this.push(args, func);
            }
        };
    }
    submit() {
        this.dispatch(this.cursors);
    }
    clear() {
        this.cursors.length = 0;
    }
}

export default ImCursor;
