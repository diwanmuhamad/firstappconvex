import React, { useState, useEffect } from "react";
import { Col, Card } from "antd";

interface SelectBtnCardProps {
  title: string;
  category: string[];
  setCategory: (e: string[]) => void;
}

export const SelectBtnCard: React.FC<SelectBtnCardProps> = ({
  title,
  category,
  setCategory,
}) => {
  const [selected, setSelected] = useState<Boolean>(false);

  const handleClick = () => {
    setSelected((selected) => !selected);
  };

  useEffect(() => {
    if (selected && !category.includes(title)) {
      let newCategory = [...category];
      newCategory.push(title);
      setCategory(newCategory);
    } else if (!selected && category.includes(title)) {
      let newCategory = [...category];
      newCategory = newCategory.filter((el) => el !== title);
      setCategory(newCategory);
    }
  }, [selected]);

  return (
    <Col className="gutter-row" xs={12} md={6}>
      <Card
        onClick={handleClick}
        style={{
          borderRadius: "50px",
          backgroundColor: `${selected == true ? "#172554" : "white"}`,
          color: `${selected == true ? "white" : "black"}`,
        }}
        className="cursor-pointer"
      >
        {title}
      </Card>
    </Col>
  );
};
