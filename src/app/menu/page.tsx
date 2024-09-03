"use client";

import React, { useState } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Input, Button, Space } from "antd";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const MainMenu: React.FC = () => {
  const [message, setMessage] = useState("")
  const [answer, setAnswer] = useState<string | null>(null)

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const sendMessage = useAction(api.openai.chat);
  const handleClick = async () => {

    const answer = sendMessage({ input: message });
    setAnswer(await answer)
    setMessage("")
  };

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="mt-[40%]"/>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
          onSelect={({ key }) => {
            console.log(key);
          }}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              height: "100vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div className="mb-4">
              {answer}
            </div>
            <Space.Compact style={{ width: "100%" }}>
              <Input onChange={(e)=> setMessage(e.target.value)}  value={message}/>
              <Button type="primary" onClick={handleClick}>Submit</Button>
            </Space.Compact>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainMenu;
