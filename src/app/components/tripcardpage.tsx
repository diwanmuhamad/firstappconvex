"use client";

import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, DatePicker } from "antd";
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
