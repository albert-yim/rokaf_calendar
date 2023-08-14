import { Badge, BadgeProps, Calendar } from "antd";
import React, { useState } from "react";
import type { Dayjs } from "dayjs";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import dayjs from "dayjs";
type ROKAFCalendarType = {
  th?: number;
};
export default function ROKAFCalendar(props: ROKAFCalendarType) {
  const [value, setValue] = useState(dayjs("2023-08-17"));

  const getListData = (value: Dayjs) => {
    let listData;
    switch (value.date()) {
      case 8:
        // console.log(value);
        listData = [
          { type: "warning", content: "성과제" },
          // { type: "success", content: "This is usual event." },
        ];
        break;
      case 9:
        listData = [{ type: "warning", content: "성과제" }];
      case 10:
        listData = [
          { type: "warning", content: "성과제" },
          // { type: "error", content: "This is error event." },
        ];
        break;
      // case 15:
      //   listData = [
      //     { type: "warning", content: "This is warning event" },
      //     { type: "success", content: "This is very long usual event。。...." },
      //     { type: "error", content: "This is error event 1." },
      //     { type: "error", content: "This is error event 2." },
      //     { type: "error", content: "This is error event 3." },
      //     { type: "error", content: "This is error event 4." },
      //   ];
      //   break;
      default:
    }
    return listData || [];
  };
  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };
  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === "date") return dateCellRender(current);
    // if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return <Calendar value={value} onSelect={setValue} cellRender={cellRender} />;
}
