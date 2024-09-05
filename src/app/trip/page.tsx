"use client";

import React, { useState } from "react";
import { Layout, theme, Button, Space, Steps, ConfigProvider } from "antd";
import { SignOutButton } from "@clerk/clerk-react";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  LocationCard,
  DateCard,
  TypeCard,
  CategoryCard,
  ResultCard,
} from "../components/tripcardpage";
import PdfGenerator from "../components/pdfGenerator";

const { Header, Content, Footer, Sider } = Layout;

const typeList = ["Solo Trip", "Friends Trip", "Partner Trip", "Family Trip"];

const MainMenu: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);
  const [location, setLocation] = useState<string>("");
  const [dateRange, setDateRange] = useState<[any, any] | null>(null);
  const [type, setType] = useState<number>(1);
  const [category, setCategory] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string | null>(null);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const sendMessage = useAction(api.openai.chat);
  const handleSubmit = async () => {
    let msg = `Plan a trip with timeline (detailed time estimation in every itinerary) to ${location} from ${dateRange?.[0].format("DD MMMM YYYY")} to ${dateRange?.[1].format("DD MMMM YYYY")} as ${typeList[type - 1]} with interest in ${category.join(", ")}. With Only maximum 3 itinerary items perday`;
    const answer = sendMessage({ input: msg });
    setAnswer(await answer);
  };

  const reset = () => {
    setLocation("");
    setDateRange(null);
    setType(1);
    setCategory([]);
    setCurrent(0)
  };

  const handleClickNext = () => {
    if (current == 3) {
      handleSubmit();
      setCurrent(4);
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

          <div className="bg-yellow-400 rounded p-4 w-[50%] mx-auto mt-10 text-center">
            <SignOutButton />
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
              <DateCard dateRange={dateRange} setDateRange={setDateRange} />
            ) : current == 2 ? (
              <TypeCard type={type} setType={setType} />
            ) : current == 3 ? (
              <CategoryCard category={category} setCategory={setCategory} />
            ) : (
              <ResultCard
                location={location}
                dateRange={`${dateRange?.[0].format("DD MMMM YYYY")} - ${dateRange?.[1].format("DD MMMM YYYY")}`}
                answer={answer}
                reset={reset}
              />
            )}

            {current == 4 ? null : (
              <Space className="mt-[20px] sm:mt-[80px] flex justify-between w-full px-[10%]">
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
            )}
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
