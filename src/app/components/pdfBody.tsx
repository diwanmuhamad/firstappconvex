import React, { useEffect, useState } from "react";

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
  const [objTrip, setObjTrip] = useState<ObjTrip[]>(updateText(text));

  useEffect(() => {
    console.log(updateText(text));
  }, []);
  return (
    <>
      {objTrip.map((el, index) => {
        return (
          <div key={index}>
            <h2 className="my-4 font-bold text-xl">{el.title}</h2>
            {el.content.map((el2, index2) => {
              return (
                <div key={index2}>
                  <h3 className="my-2 font-bold text-lg">{el2[0]}</h3>
                  {Array(el2.length - 1)
                    .fill("")
                    .map((el3, index) => {
                      return <div key={index}>{el2[index + 1]}</div>;
                    })}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};
