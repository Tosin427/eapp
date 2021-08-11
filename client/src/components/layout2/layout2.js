import React, { useState } from 'react'
import './layout.css'
import logo from '../../img/logo.png'
import {
    WechatOutlined,
    SettingOutlined,
    AreaChartOutlined,
    NodeExpandOutlined,
    PartitionOutlined,
    PullRequestOutlined,
    WalletOutlined,
    LogoutOutlined,
  } from "@ant-design/icons";
import { Link } from 'react-router-dom';

const initial_state = {
    navCollapsed: false,
    activeMenu: null,
}


const Layout = ({children}) => {
    const [state, setState] = useState(initial_state)


    const toggleNavCollapse = () => {
        return setState(prevState => ({
            ...prevState,
            navCollapsed: !prevState.navCollapsed
        }))
    }

    return <>
        <nav className={`side-menu ${state.navCollapsed ? 'collapsed' : ''}`}>
        <div className="logo-wrapper">
            <img src={logo} alt="Logo" />
        </div>
        
        <ul className="menu-list">
            <li className="menu-item active">
                <WalletOutlined /> <a href="javascript:;">Wallet</a>
            </li>
            <li className="menu-item">
                <PartitionOutlined /> <a href="javascript:;"> P2P</a>
            </li>
            <li className="menu-item">
                <PullRequestOutlined /> <Link to="/transactions">Transactions</Link>
            </li>
            <li className="menu-item">
                <NodeExpandOutlined /> <a href="javascript:;">Trade Now</a>
            </li>
            <li className="menu-item">
                <AreaChartOutlined /> <a href="javascript:;"> Rates</a>
            </li>
            <li className="menu-item">
                <WechatOutlined /> <a href="javascript:;"> Chat</a>
            </li>
            <li className="menu-item">
                <SettingOutlined /> <a href="javascript:;"> Settings</a>
            </li>
            <li className="menu-item">
                <LogoutOutlined /> <a href="javascript:;" id='nav-toggle'>Logout</a>
            </li>

        </ul>
        <a href="javascript:;" onClick={toggleNavCollapse} className="nav-toggle"><i className="fa fa-caret-left"></i></a>
    </nav>
    <header>
    </header>
    <div className={`dashboard-wrapper ${state.navCollapsed ? 'collapsed' : ''}`}>
        <div className="header">
            <span  onClick={toggleNavCollapse}  className='mobile-nav-toggle'>
                <i className='fa fa-chevron-right'></i>
            </span>
            <span className="name-abbv">CU</span>
            <a href="">Chinedu Ukpe</a>

        </div>
        <div className="bread-crumb">
            <i className="fa fa-user"></i> User/hello@gmail.com
        </div>
        <div className="dashboard-content">
            {children}
        </div>
    </div>
    </>
}

export default Layout;