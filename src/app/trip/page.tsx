"use client";

import React, { useState, useEffect } from "react";
import {
  Layout,
  theme,
  Button,
  Space,
  Steps,
  ConfigProvider,
  Modal,
  Empty,
  Table,
} from "antd";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { useAction, useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { TableProps } from "antd";
import {
  LocationCard,
  DateCard,
  TypeCard,
  CategoryCard,
  ResultCard,
} from "../components/tripcardpage";
import { UserOutlined, RightOutlined } from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

const typeList = ["Solo Trip", "Friends Trip", "Partner Trip", "Family Trip"];

// table history

interface HistoryType {
  key: string;
  userId: string;
  location: string;
  start: string;
  end: string;
  type: string;
  category: string;
}

const MainMenu: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);
  const [location, setLocation] = useState<string>("");
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [type, setType] = useState<number>(1);
  const [category, setCategory] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string | null>(null);

  //for trip history modal
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const columns: TableProps<HistoryType>["columns"] = [
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Start Date",
      dataIndex: "start",
      key: "start",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "End Date",
      dataIndex: "end",
      key: "end",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Trip Type",
      dataIndex: "type",
      key: "type",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Trip Category",
      dataIndex: "category",
      key: "category",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleClickUseHistory(record)}>Use</Button>
        </Space>
      ),
    },
  ];
  const { user } = useUser();

  const userId: string = user?.id ?? "";
  const dataHistory = useQuery(api.query.getQuery, { userId: userId });
  const newData: HistoryType[] = [];
  dataHistory?.forEach((el) => {
    const history: HistoryType = {
      key: "",
      userId: "",
      location: "",
      start: "",
      end: "",
      type: "",
      category: "",
    };

    history.key = el._id;
    history.userId = el.userId;
    history.location = el.location;
    history.start = el.start;
    history.end = el.end;
    history.type = el.type;
    history.category = el.category;

    newData.push(history);
  });
  const insert = useMutation(api.query.insertQuery);

  const insertTripHistory = () => {
    insert({
      userId: userId,
      location: location,
      start: dateRange?.[0].format("DD/MMMM/YYYY") ?? "",
      end: dateRange?.[1].format("DD/MMMM/YYYY") ?? "",
      type: type.toString(),
      category: category.join(", "),
    });
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const sendMessage = useAction(api.openai.chat);
  const handleSubmit = async () => {
    let msg = `Plan a trip to ${location} from ${dateRange?.[0].format("DD MMMM YYYY")} to ${dateRange?.[1].format("DD MMMM YYYY")} as ${typeList[type - 1]} with interest in ${category[0]}.  Make it with structured HTML tag (without head and body tag).`;

    const answer = sendMessage({ input: msg });
    setAnswer(await answer);
  };

  const reset = () => {
    setLocation("");
    setDateRange(null);
    setType(1);
    setCategory([]);
    setCurrent(0);
    setAnswer("");
  };

  const handleClickNext = () => {
    if (current == 3) {
      handleSubmit();
      insertTripHistory();
      setCurrent(4);
    } else {
      setCurrent((current) => current + 1);
    }
  };

  const handleClickUseHistory = (args: HistoryType) => {
    setLocation(args.location);
    setType(Number(args.type));
    setDateRange([
      dayjs(args.start, "DD/MMMM/YYYY"),
      dayjs(args.end, "DD/MMMM/YYYY"),
    ]);
    setCategory(args.category.split(", "));
    setCurrent(3);
    setOpenModal(false);
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
        <Header style={{ background: colorBgContainer }} className="text-right">
          <div>
            <UserOutlined /> <span>{user?.fullName}</span>
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              height: "100vh",
              width: "100%",
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

            <Space
              className="cursor-pointer text-gray-600 mt-[100px] w-full flex justify-center"
              onClick={() => setOpenModal(true)}
            >
              <p>History</p>
              <RightOutlined />
            </Space>
            <Modal
              title={<p>Trip Plan History</p>}
              open={openModal}
              onCancel={() => setOpenModal(false)}
              footer={null}
              width={1000}
              style={{ overflowX: "auto" }}
            >
              {dataHistory?.length === 0 ? (
                <Empty />
              ) : (
                <Table
                  dataSource={newData}
                  columns={columns}
                  scroll={{ x: 500 }}
                />
              )}
            </Modal>
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
