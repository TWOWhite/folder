import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from '../../folder';

const actions = {
    onChange({ target }) {
        this.set('value', target.value);
        this.commit();
    },
    async insertIntoList() {
        const { value } = this.getstate();
        this.update('list', (list) => list.concat([value]));
        await new Promise((r) => {
            setTimeout(() => {
                r();
            }, 1000);
        });
        this.commit();
    }
}

const mapDispatchToProps = bind => ({ actions: bind(actions) });

const mapStateToProps = (store) => ({ value: store.value });

@connect(mapStateToProps, mapDispatchToProps)
export default class Input extends Component {
    static propTypes = {
        value: PropTypes.string.isRequired,
        actions: PropTypes.object.isRequired,
    }
    render() {
        return (
            <div>
                <input type="text" value={this.props.value} onChange={this.props.actions.onChange} />
                <button onClick={this.props.actions.insertIntoList}>insert</button>
            </div>
        )
    }
}

