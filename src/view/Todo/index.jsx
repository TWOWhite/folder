import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from './list';
import Input from './Input';

export default class Todo extends Component {
    static propTypes = {
        prop: PropTypes
    }
    render() {
        return (<div>
            <List />
            <Input />
        </div>);
    }
}
