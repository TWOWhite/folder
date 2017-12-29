import React from 'react';
import PropTypes from 'prop-types';
import { Radio, Input } from 'antd';

const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;

function NewOffConfig({ data, config, onChangeScope, onChangeGrayText }) {
    return (
        <div>
            <p><span>日期：</span><span>{data.date}</span></p>
            <p><span>编号：</span><span>{data.id}</span></p>
            <p><span>MD5：</span><span>{data.md5}</span></p>
            <p><span>类型：</span><span>{data.type}</span></p>
            <div className="offc-line">
                <span>范围：</span>
                <RadioGroup onChange={({ target }) => { onChangeScope(target.value); }} value={config.scope} style={{ marginBottom: 20 }}>
                    <Radio value="gray">灰度</Radio>
                    <Radio value="all">全量</Radio>
                </RadioGroup>
            </div>
            {
                config.scope == 'gray' ? <TextArea onBlur={onChangeGrayText} defaultValue={config.grayText} rows={6} style={{ resize: 'none' }} /> : null
            }
        </div>
    );
}

NewOffConfig.propTypes = {
    data: PropTypes.object,
    config: PropTypes.object,
    onChangeScope: PropTypes.func.isRequired,
    onChangeGrayText: PropTypes.func.isRequired,
};
NewOffConfig.defaultProps = {
    data: {},
    config: {},
};

export default NewOffConfig;

