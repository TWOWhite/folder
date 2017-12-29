import { Component } from 'react';
import PropTypes from 'prop-types';
import createStore from './index';

class Provider extends Component {
    static propTypes = {
        children: PropTypes.any,
        defaultState: PropTypes.object.isRequired,
    }
    static defaultProps = {
        children: null
    }
    static childContextTypes = {
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
        this.store = createStore(this.props.defaultState);
    }

    getChildContext() {
        return {
            store: this.store
        };
    }
    render() {
        return this.props.children;
    }
}

export default Provider;
