import React from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination, Modal, DatePicker, Icon, Input, Radio } from 'antd';
import connect from '../../../folder/connect';
import * as actions from '../../../actions/offlineNew';
import NewOffConfig from '../../../components/NewOffConfig';
import TablePage from '../../../components/TablePage';
import '../style.less';

const columns = [
    { title: '时间', dataIndex: 'date', width: '20%' },
    { title: '编号', dataIndex: 'id', width: '20%' },
    { title: 'MD5', dataIndex: 'md5', width: '20%' },
    { title: '类型', dataIndex: 'type', width: '20%' },
    { title: '操作', dataIndex: 'method', width: '20%' },
];
const RadioGroup = Radio.Group;
const types = [{ label: 'PC端', value: 'pc' }, { label: '移动端', value: 'mobile' }];

class OffNew extends TablePage {
    static propTypes = {
        offNew: PropTypes.object.isRequired,
        acts: PropTypes.object.isRequired,
    }
    initState() {
        return {
            otherHeight: 101
        };
    }
    componentDidMount() {
        this.props.acts.searchByCondition();
    }
    handleReleaseBtnClick = index => () => {
        this.props.acts.showReleaseModal(index);
    }
    handleChangeReleaseConfig = key => (value) => {
        this.props.acts.changeReleaseModalConfig(key, value);
    }
    renderTable() {
        return columns.map((item, index) => {
            const newItem = { ...item };
            if (index == 4) {
                newItem.render = (t, r, i) => {
                    return <span className="off-table-btn" onClick={this.handleReleaseBtnClick(i)}>发布</span>;
                };
            }
            return newItem;
        });
    }
    render() {
        const { list, page, releaseModal, condition } = this.props.offNew;
        const { hideReleaseModal } = this.props.acts;
        return (
            <div className="off-view" ref={(c) => { this.view = c; }}>
                <div className="off-condition">
                    <div className="off-line">
                        <span>日期：</span>
                        <DatePicker />
                    </div>
                    <div className="off-line">
                        <span>终端类型：</span>
                        <RadioGroup options={types} value={condition.type} />
                    </div>
                </div>
                <Table
                    columns={this.renderTable()}
                    dataSource={list}
                    rowKey={r => r.id}
                    pagination={false}
                    scroll={{ y: this.state.tableHeight }}
                />
                <div className="off-pagination">
                    <Pagination
                        current={page.current}
                        total={page.total}
                    />
                </div>
                <Modal
                    visible={releaseModal.show}
                    title="发布选项"
                    okText="发布"
                    cancelText="取消"
                    onCancel={hideReleaseModal}
                    maskClosable={false}
                >
                    <NewOffConfig
                        data={releaseModal.item}
                        config={releaseModal.config}
                        onChangeScope={this.handleChangeReleaseConfig('scope')}
                        onChangeGrayText={this.handleChangeReleaseConfig('grayText')}
                    />
                </Modal>
            </div>
        );
    }
}

export default connect([['offline', 'new']], actions, (data, acts) => ({
    acts,
    offNew: data.offline.new,
}))(OffNew);
