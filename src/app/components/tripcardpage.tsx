"use client";

import React from "react";
import {
  SearchOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  HeartOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Input, DatePicker, Card, Space, Row, Result, Spin } from "antd";
import { SelectBtnCard } from "./selectBtnCard";
import type { GetProps } from "antd";
import PdfGenerator from "./pdfGenerator";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
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

interface CategoryCardProps {
  category: string[];
  setCategory: (e: string[]) => void;
}

interface PdfGeneratorProps {
  location: string;
  dateRange: string;
  answer: string | null;
  reset: () => void;
}

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: "rgba(0, 0, 0, 0.05)",
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

const categoryList: string[] = [
  "Hidden Gems",
  "Hiking and Nature",
  "Sports",
  "Outdoors",
  "Culture",
  "History",
  "Amazing Food",
  "Popular Attraction",
  "Art Gallery",
];

const getYearMonth = (date: Dayjs) => date.year() * 12 + date.month();

const disabled2DaysDate: RangePickerProps["disabledDate"] = (
  current,
  { from, type }
) => {
  if (from) {
    const minDate = from.add(-2, "days");
    const maxDate = from.add(2, "days");

    switch (type) {
      case "year":
        return (
          current.year() < minDate.year() || current.year() > maxDate.year()
        );

      case "month":
        return (
          getYearMonth(current) < getYearMonth(minDate) ||
          getYearMonth(current) > getYearMonth(maxDate)
        );

      default:
        return Math.abs(current.diff(from, "days")) >= 2;
    }
  }

  return false;
};

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
        disabledDate={disabled2DaysDate}
        minDate={dayjs(Date.now())}
        value={dateRange}
        onChange={(e) => {
          setDateRange([e?.[0], e?.[1]]);
        }}
        size={"large"}
        style={{ width: "60%", marginTop: "50px" }}
      />
    </div>
  );
};

export const TypeCard: React.FC<TypeCardProps> = ({ type, setType }) => {
  return (
    <div className="text-center w-full p-4">
      <h2 className="text-lg sm:text-3xl">
        What type of trip are you going to have?
      </h2>
      <Space className="mt-8 flex-col sm:flex-row" size={"large"}>
        <Card
          onClick={() => setType(1)}
          style={{
            minWidth: "100px",
            width: "15vw",
            height: 100,
            backgroundColor: `${type == 1 ? "#172554" : "white"}`,
            color: `${type == 1 ? "white" : "black"}`,
          }}
          className="cursor-pointer"
        >
          <UserOutlined />
          <p>Solo Trip</p>
        </Card>
        <Card
          onClick={() => setType(2)}
          style={{
            minWidth: "100px",
            width: "15vw",
            height: 100,
            backgroundColor: `${type == 2 ? "#172554" : "white"}`,
            color: `${type == 2 ? "white" : "black"}`,
          }}
          className="cursor-pointer"
        >
          <UsergroupAddOutlined />
          <p>Friends Trip</p>
        </Card>
        <Card
          onClick={() => setType(3)}
          style={{
            minWidth: "100px",
            width: "15vw",
            height: 100,
            backgroundColor: `${type == 3 ? "#172554" : "white"}`,
            color: `${type == 3 ? "white" : "black"}`,
          }}
          className="cursor-pointer"
        >
          <HeartOutlined />
          <p>Partner Trip</p>
        </Card>
        <Card
          onClick={() => setType(4)}
          style={{
            minWidth: "100px",
            width: "15vw",
            height: 100,
            backgroundColor: `${type == 4 ? "#172554" : "white"}`,
            color: `${type == 4 ? "white" : "black"}`,
          }}
          className="cursor-pointer"
        >
          <HomeOutlined />
          <p>Family Trip</p>
        </Card>
      </Space>
    </div>
  );
};

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  setCategory,
}) => {
  return (
    <div className="text-center w-full p-4">
      <h2 className="text-lg sm:text-3xl">
        What category are you interested for your trip?
      </h2>
      <Row gutter={[16, 16]} className="mt-8">
        {categoryList.map((el, index) => (
          <SelectBtnCard
            key={index}
            title={el}
            category={category}
            setCategory={setCategory}
          />
        ))}
      </Row>
    </div>
  );
};

export const ResultCard: React.FC<PdfGeneratorProps> = ({
  location,
  dateRange,
  answer,
  reset,
}) => (
  <>
    {!answer ? (
      <Spin tip="Generating PDF..." size="large">
        {content}
      </Spin>
    ) : (
      <>
        <Result
          status="success"
          title="Successfully Generated Your Plan Trip PDF!"
          subTitle="Click the download button below to save your pdf."
        />
        <PdfGenerator
          location={location}
          dateRange={dateRange}
          answer={answer}
          reset={reset}
        />
      </>
    )}
  </>
);
