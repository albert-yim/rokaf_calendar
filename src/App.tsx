import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import "./App.css";
import ROKAFCalendar from "./components/ROKAFCalendar";
import RegularVacationRadioButton from "./components/RegularVacationRadioButton";
import { RegularVacationKey, VacationTypeKey } from "./types";
import VacationRadioButton from "./components/VacationRadioButton";

export default function App() {
  // vacationCycle instead of regularVacation?
  const [regularVacation, setRegularVacataion] =
    useState<RegularVacationKey>("6weeks");
  const [vacationType, setVacationType] = useState<VacationTypeKey>("regular");
  return (
    <div className="App">
      <RegularVacationRadioButton
        regularVacation={regularVacation}
        setRegularVacation={setRegularVacataion}
      />
      <VacationRadioButton
        vacationType={vacationType}
        setVacationType={setVacationType}
      />
      <div /* className={styles.header} */>
        <input />
        <ROKAFCalendar
          generation={846}
          currentVacationType={vacationType}
          regularVacation={regularVacation}
        />
      </div>
    </div>
  );
}
/*
 * test function to get holidays using openAPI
 * */
function getHoliday() {
  const holiday = axios
    .get(
      `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getAnniversaryInfo`,
      {
        params: {
          // ServiceKey: `40ouTF6DkTh3N0Ldqje4nNHoKzZzfhhhdrR5LVgyBhmJaeq7R+WHSkj9y4ipAA+L9Ch+i7zhYtMgG4LlVBo21w==`,
          serviceKey: `40ouTF6DkTh3N0Ldqje4nNHoKzZzfhhhdrR5LVgyBhmJaeq7R%2BWHSkj9y4ipAA%2BL9Ch%2Bi7zhYtMgG4LlVBo21w%3D%3D`,
          pageNo: 1,
          numOfRows: 100,
          solYear: "2023",
          solMonth: "08",
        },
      },
    )
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(`error`);
      console.log(error);
    });
  //   서비스키	ServiceKey	4	필	-	공공데이터포털에서 받은 인증키
  // 페이지 번호	pageNo	4	필	1	페이지번호
  // 한 페이지 결과 수	numOfRows	4	필	10	한 페이지 결과 수
  // 연	solYear	4	필	2019	연
  // 월	solMonth	2	옵	02	월
}
const calFirstDate = (num: number) => {
  // 811기부터(2020-03-09)
  const baseNum = 833;
  let temp = baseNum;
  const baseDate = moment("2021-12-06");
  if (num < baseNum) {
    return baseDate.toString();
  }
  const test = num - baseNum;
  console.log(test);
  // console.log(test);
  // const diffWeek: any = ((num as Number) - baseNum) * 5;
  while (temp < 847) {
    const diffWeek = (temp - baseNum) * 4;
    const date = moment(baseDate);
    date.add(diffWeek, "week").toString();
    console.log(`${temp}기${date}`);
    temp = temp + 1;
  }
  const diffWeek = (num - baseNum) * 5 - 1;
  return baseDate.add(diffWeek, "week").toString();
  // return (num - baseNum)*moment()
  console.log(diffWeek);
  // return diffWeek;
};
