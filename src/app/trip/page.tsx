"use client";

import React, { useState } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  theme,
  Input,
  Button,
  Space,
  Steps,
  ConfigProvider,
} from "antd";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { LocationCard, DateCard } from "../components/tripcardpage";

const { Header, Content, Footer, Sider } = Layout;

const items = [UserOutlined, VideoCameraOutlined, UploadOutlined].map(
  (icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
  })
);

const MainMenu: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [current, setCurrent] = useState<number>(0);
  const [location, setLocation] = useState<string>("");
  const [dateRange, setDateRange] = useState<[any,any] | null>(null)
  const [answer, setAnswer] = useState<string | null>(null);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const sendMessage = useAction(api.openai.chat);
  const handleClick = async () => {
    const answer = sendMessage({ input: message });
    setAnswer(await answer);
    setMessage("");
  };

  const handleClickNext = () => {
    if (current == 3) {
      setCurrent(0);
    } else {
      setCurrent((current) => current + 1);
    }
  };

  return (
    <Layout>
      <ConfigProvider
        theme={{
          token: {
            colorText: "rgb(255, 220, 127)",
            colorTextDisabled: "white",
            colorTextQuaternary: "rgb(255, 220, 127)",
            colorPrimary: "rgb(255, 220, 127) ",
            colorTextDescription: "white",
          },
          components: {
            Steps: {
              navArrowColor: "rgba(0, 0, 0, 0)",
            },
          },
        }}
      >
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
          <div className="mt-[40%] pl-5">
            <Steps
              progressDot
              initial={0}
              current={current}
              direction="vertical"
              items={[
                {
                  title: "Trip Location",
                  description: "",
                },
                {
                  title: "Trip Date",
                  description: "",
                },
                {
                  title: "Trip Type",
                  description: "",
                },
                {
                  title: "Trip Category",
                  description: "",
                },
              ]}
            />
          </div>
        </Sider>
      </ConfigProvider>

      <Layout>
        <Header
          style={{ background: colorBgContainer }}
          className="text-center"
        >
          <h2 className="text-black-500 text-sm mt-5">MovinAI</h2>
        </Header>
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
            {current == 0 ? (
              <LocationCard location={location} setLocation={setLocation} />
            ) : current == 1 ? (
              <DateCard dateRange={dateRange} setDateRange={setDateRange}/>
            ) : current == 2 ? null : current == 3 ? null : null}

            <Space className="mt-[80px] flex justify-between w-full px-[10%]">
              <Button
                style={{ display: current == 0 ? "none" : "block" }}
                onClick={() => setCurrent((current) => current - 1)}
              >
                Back
              </Button>
              <Button onClick={handleClickNext}>
                {current == 3 ? "Submit" : "Next"}
              </Button>
            </Space>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          MovinAI {new Date().getFullYear()} Created by Diwan M
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainMenu;
