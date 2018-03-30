import React, { Component } from 'react';
import PropTypes from 'prop-types';


function connect(mapState, mapAction) {
    const mapActionToProps = mapAction ? mapAction : () => ({});
    const mapStateToProps = mapState ? mapState : () => ({});
    return function (comm) {
        class Connection extends Component {
            static contextTypes = {
                store: PropTypes.shape({
                    subscribe: PropTypes.func.isRequired,
                    unsubscribe: PropTypes.func.isRequired,
                    bindActions: PropTypes.func.isRequired,
                    getstate: PropTypes.func.isRequired,
                }).isRequired,
            }
            constructor(props, context) {
                super(props, context);
                this.store = this.context.store;
                this.state = {
                    id: this.store.subscribe(this.updateComponent),
                    tree: mapStateToProps(this.store.getstate())
                };
                this.actions = mapActionToProps(this.store.bindActions);
            }
            componentWillUnmount() {
                this.store.unsubscribe(this.state.id);
            }
            updateComponent = () => {
                const newTree = mapStateToProps(this.store.getstate());
                let isChange = false;
                const newTreeKeys = Object.keys(newTree);
                let oldTreeKeys = Object.keys(this.state.tree);
                isChange = newTreeKeys.length != oldTreeKeys.length;
                if (isChange == false) {
                    for (let i = 0; i < newTreeKeys.length; i++) {
                        const key = newTreeKeys[i];
                        if (newTree[key] != this.state.tree[key]) {
                            isChange = true;
                            break;
                        }
                    }
                }
                if (isChange) {
                    this.setState({
                        ...this.state,
                        tree: newTree,
                    })
                }
            }
            render() {
                const props = {
                    ...this.props,
                    ...this.actions,
                    ...this.state.tree
                };
                return React.createElement(comm, props, null);
            }
        }
        return Connection;
    };
}
export default connect;

