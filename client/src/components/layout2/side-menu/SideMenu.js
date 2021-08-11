import React from 'react'
import "./SideMenu.css"
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

const SideMenu = () => {
    return <nav className={`side-menu ${state.navCollapsed ? 'collapsed' : ''}`}>
                <div className="logo-wrapper">
                    <img src={logo} alt="Logo" />
                </div>
                
                <ul className="menu-list">
                    <li className="menu-item active">
                        <i className="fas fa-credit-card"></i> <a href="javascript:;">Wallet</a>
                    </li>
                    <li className="menu-item">
                        <i className="fas fa-retweet"></i> <a href="javascript:;"> P2P</a>
                    </li>
                    <li className="menu-item">
                        <i className="fa fa-sitemap"></i> <a href="javascript:;">Transactions</a>
                    </li>
                    <li className="menu-item">
                        <i className="fa fa-rocket"></i> <a href="javascript:;">Trade Now</a>
                    </li>
                    <li className="menu-item">
                        <i className="fa fa-list"></i> <a href="javascript:;"> Rates</a>
                    </li>
                    <li className="menu-item">
                        <WechatOutlined /> <a href="javascript:;"> Chat</a>
                    </li>
                    <li className="menu-item">
                        <i className="fa fa-cog"></i> <a href="javascript:;"> Settings</a>
                    </li>
                    <li className="menu-item">
                        <i className="fa fa-power-off"></i> <a href="javascript:;" id='nav-toggle'>Logout</a>
                    </li>

                </ul>
                <a href="javascript:;" onClick={toggleNavCollapse} className="nav-toggle"><i className="fa fa-caret-left"></i></a>
            </nav>
}

export default SideMenu;