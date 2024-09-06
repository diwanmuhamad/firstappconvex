import React, { useEffect } from "react";

interface PdfBodyProps {
  text: string | null;
}

type ObjTrip = {
  title: string;
  content: string[][];
};

const updateText = (text: string | null) => {
  let result: ObjTrip[] = [];
  let msg1 = text?.split("@@");
  msg1 = msg1?.filter((el) => el.includes("Day"));
  msg1?.forEach((el) => {
    let msg2 = el.split("@!");

    let temp: ObjTrip = { title: "", content: [] };
    temp.title = msg2[0];
    msg2.splice(0, 1);
    let msg3: string[][] = [];
    msg2.forEach((el) => {
      msg3.push(el.split("@$"));
    });
    temp.content = [...msg3];
    result.push(temp);
  });

  return result;
};

export const PdfBody: React.FC<PdfBodyProps> = ({ text }) => {
  useEffect(() => {
    console.log(updateText(text));
  }, []);
  return <div>{text}</div>;
};
