import React, { Component } from 'react';
import PropTyps from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import { sidePageRoutes } from '../../router';
import './index.less';

const { Header, Content, Footer, Sider } = Layout;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

export default class App extends Component {
    static propTypes = {
        location: PropTyps.object.isRequired,
        history: PropTyps.object.isRequired,
    }
    getOpenNavs() {
        const location = this.props.location;
        const pathArr = location.pathname.split('/').slice(0, 2);
        return [pathArr.join('/')];
    }
    handleOnSelectNav = ({ key }) => {
        this.props.history.push(key);
    }
    render() {
        const { location } = this.props;
        return (<Layout>
            <Sider
                breakpoint="lg"
            >
                <div className="ec-logo">Web Front-End&nbsp;&nbsp;<Icon type="html5" /></div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[location.pathname]}
                    defaultOpenKeys={this.getOpenNavs()}
                    onSelect={this.handleOnSelectNav}
                >
                    <SubMenu key="/offline" title={<span><Icon type="cloud-download-o" />&nbsp;离线系统</span>}>
                        <MenuItem key="/offline/new">发布离线包</MenuItem>
                        <MenuItem key="/offline/list">离线系统发布记录</MenuItem>
                        <MenuItem key="/offline/config">离线系统设置</MenuItem>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }} />
                <Content style={{ padding: 20, flexGrow: '1', border: 'solid 20px #f0f2f5', borderBottom: 'none', backgroundColor: '#fff', display: 'flex' }}>
                    {sidePageRoutes}
                </Content>
                <Footer style={{ textAlign: 'center', padding: '10px 50px' }}>
                    EC Web Front-End Development @2018
                </Footer>
            </Layout>
        </Layout>);
    }
}
