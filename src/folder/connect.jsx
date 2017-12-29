import React, { Component } from 'react';
import PropTypes from 'prop-types';


function connect(paths, actions, mapProps) {
    return function (comm) {
        class Connection extends Component {
            static contextTypes = {
                store: PropTypes.shape({
                    dispatch: PropTypes.func.isRequired,
                    getData: PropTypes.func.isRequired,
                    addWatcher: PropTypes.func.isRequired,
                    removeWatcher: PropTypes.func.isRequired,
                    bindActions: PropTypes.func.isRequired,
                }).isRequired,
            }
            constructor(props, context) {
                super(props, context);
                const store = this.context.store;
                this.state = {
                    actions: store.bindActions(actions),
                    change: 0,
                    watcherIds: [],
                    data: store.getData(''),
                };
                paths.forEach((path) => {
                    const id = store.addWatcher(path, this.updateComponent);
                    this.state.watcherIds.push({ id, path });
                });
            }
            componentWillUnmount() {
                this.state.watcherIds.forEach((item) => {
                    this.context.store.removeWatcher(item.path, item.id);
                });
            }
            updateComponent = () => {
                this.setState(pre => ({ ...pre, change: pre.change + 1 }));
            }
            render() {
                const props = mapProps(this.state.data, this.state.actions);
                return React.createElement(comm, props, null);
            }
        }
        return Connection;
    };
}
export default connect;

