"use client";

import React from "react";
import { SearchOutlined, UserOutlined, UsergroupAddOutlined, HeartOutlined, HomeOutlined } from "@ant-design/icons";
import { Input, DatePicker, Card, Space } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

interface LocationCardProps {
  location: string;
  setLocation: (e: string) => void;
}

interface DateCardProps {
  dateRange: [any, any] | null;
  setDateRange: (e: any) => void;
}

interface TypeCardProps {
  type: number;
  setType: (e: number) => void;
}

export const LocationCard: React.FC<LocationCardProps> = ({
  location,
  setLocation,
}) => {
  return (
    <div className="text-center w-full p-4">
      <h2 className="text-3xl">Where is your trip destination?</h2>
      <Input
        value={location}
        onChange={(e) => {
          setLocation(e.target.value);
        }}
        size="large"
        placeholder="Search your destination"
        prefix={<SearchOutlined />}
        style={{ width: "60%", marginTop: "50px", borderRadius: "50px" }}
      />
    </div>
  );
};

export const DateCard: React.FC<DateCardProps> = ({
  dateRange,
  setDateRange,
}) => {
  return (
    <div className="text-center w-full p-4">
      <h2 className="text-3xl">How long is your trip?</h2>
      <RangePicker
        value={dateRange}
        onChange={(e) => {
          setDateRange([e?.[0], e?.[1]]);
          console.log(e?.[0]);
        }}
        size={"large"}
        style={{ width: "60%", marginTop: "50px" }}
      />
    </div>
  );
};

export const TypeCard: React.FC<TypeCardProps> = ({type, setType}) => {
  return (
    <div className="text-center w-full p-4">
      <h2 className="text-lg sm:text-3xl">What type of trip are you going to have?</h2>
      <Space className="mt-8 flex-col sm:flex-row" size={"large"}>
        <Card onClick={()=> setType(1)} style={{ minWidth: "100px",width: "15vw", height: 100,backgroundColor: `${type == 1? "#172554" : "white"}`, color: `${type == 1? "white" : "black"}` }} className="cursor-pointer">
          <UserOutlined/>
          <p>Solo Trip</p>
        </Card>
        <Card onClick={()=>setType(2)} style={{ minWidth: "100px",width: "15vw", height: 100, backgroundColor: `${type == 2? "#172554" : "white"}`, color: `${type == 2? "white" : "black"}` }} className="cursor-pointer">
          <UsergroupAddOutlined />
          <p>Friends Trip</p>
        </Card>
        <Card onClick={()=>setType(3)} style={{ minWidth: "100px",width: "15vw", height: 100, backgroundColor: `${type == 3? "#172554" : "white"}`, color: `${type == 3? "white" : "black"}`  }} className="cursor-pointer">
          <HeartOutlined />
          <p>Partner Trip</p>
        </Card>
        <Card onClick={()=>setType(4)} style={{ minWidth: "100px",width: "15vw", height: 100, backgroundColor: `${type == 4? "#172554" : "white"}`, color: `${type == 4? "white" : "black"}`  }} className="cursor-pointer">
          <HomeOutlined />
          <p>Family Trip</p>
        </Card>
      </Space>
    </div>
  );
};
