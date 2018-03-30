import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from '../../folder';

// const mapDispatchToProps = dispatch => ({
// actions: bindActions(actions, dispatch)
// });
const mapStateToProps = (state) => ({ list: state.list });

@connect(mapStateToProps, null)
export default class List extends Component {
    static propTypes = {
        list: PropTypes.array.isRequired,
    }
    render() {
        console.log('renderList');
        return (
            <ul>
                {this.props.list.map(item => <li key={item}>{item}</li>)}
            </ul>
        )
    }
}
