import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import "antd/dist/antd.css";
import "./Sidebar.css";
import {
  WechatOutlined,
  SettingOutlined,
  AreaChartOutlined,
  NodeExpandOutlined,
  PartitionOutlined,
  PullRequestOutlined,
  WalletOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapsed = () => {
    setIsCollapsed(true);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<WalletOutlined />}>
            Wallet
          </Menu.Item>
          <Menu.Item key="2" icon={<PartitionOutlined />}>
            P2P
          </Menu.Item>
          <Menu.Item key="2" icon={<PullRequestOutlined />}>
            Transactions
          </Menu.Item>
          <Menu.Item key="2" icon={<NodeExpandOutlined />}>
            Trade Now
          </Menu.Item>
          <Menu.Item key="2" icon={<AreaChartOutlined />}>
            Rates
          </Menu.Item>
          <Menu.Item key="2" icon={<WechatOutlined />}>
            Chat
          </Menu.Item>
          <Menu.Item key="2" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Built ©2021 All rights Early Baze Wallet
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Sidebar;
