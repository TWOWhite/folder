import { Component } from 'react';

export default class TablePage extends Component {
    constructor(props) {
        super(props);
        this.state = this.initState ? this.initState() : {};
        this.state.tableHeight = 200;
    }
    componentDidUpdate() {
        if (this.view && this.state.tableHeight == 200) {
            this.state.tableHeight = this.view.offsetHeight - this.state.otherHeight || 0;
            const tableBody = this.view.querySelector('.ant-table-body');
            const style = tableBody.getAttribute('style');
            tableBody.setAttribute('style', style.replace(/max-height:\s?\d+px/, `height:${this.state.tableHeight}px`));
        }
    }
}
