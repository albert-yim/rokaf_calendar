import React, { useMemo, useState } from "react";
import axios from "axios";
import moment from "moment";
import {
  ROKAFCalendar,
  RegularVacationRadioButton,
  VacationRadioButton,
} from "../components";
import {
  VacationCycleKey as vacationCycleKey,
  VacationTypeKey,
} from "../types";
import { regularVacationCycles } from "../helper/dateCalculate";
import styles from "./Home.module.scss";

export default function Home() {
  const [generation, setGeneration] = useState(846);
  const [vacationCycle, setVacationCycle] =
    useState<vacationCycleKey>("6weeks");
  const [vacationType, setVacationType] = useState<VacationTypeKey>("regular");
  getHoliday();

  /** 성과제 도는 날들 */
  const vacationCycleDates = useMemo(() => {
    return regularVacationCycles(generation, vacationCycle);
  }, [generation, vacationCycle]);
  return (
    <div>
      <RegularVacationRadioButton
        vacationCycle={vacationCycle}
        setVacationCycle={setVacationCycle}
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
          vacationCycleDates={vacationCycleDates}
        />
      </div>
    </div>
  );
}
/*
 * test function to get holidays using openAPI
 * */
function getHoliday() {
  const serviceKey =
    "XN9ntmyLIdghZyxgg1ts36bJsk/i9J+eGIblVN+uwe3lkN20iphcSzh5g2uzVP9dCd0ElvaSe59KHd6naxrCfw==";
  const uri = `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?${serviceKey}`;
  const temp = encodeURIComponent(serviceKey);
  console.log(`encodeURI: ${temp}`);
  console.log(`decodeURI: ${decodeURIComponent(temp)}`);
  const holiday = axios
    .get(
      `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo`,
      {
        params: {
          // ServiceKey: `40ouTF6DkTh3N0Ldqje4nNHoKzZzfhhhdrR5LVgyBhmJaeq7R+WHSkj9y4ipAA+L9Ch+i7zhYtMgG4LlVBo21w==`,
          // serviceKey: `40ouTF6DkTh3N0Ldqje4nNHoKzZzfhhhdrR5LVgyBhmJaeq7R%2BWHSkj9y4ipAA%2BL9Ch%2Bi7zhYtMgG4LlVBo21w%3D%3D`,
          ServiceKey: serviceKey,
          solYear: "2023",
          solMonth: "08",
          _type: "_json",
        },
      },
    )
    //   const holiday = axios
    //     .get(
    //       `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?serviceKey="40ouTF6DkTh3N0Ldqje4nNHoKzZzfhhhdrR5LVgyBhmJaeq7R+WHSkj9y4ipAA+L9Ch+i7zhYtMgG4LlVBo21w=="&solYear="2023"&solMonth="08"
    // `,
    //     )
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(`error`);
      if (error.response) {
        // 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답했습니다.
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // 요청이 전송되었지만, 응답이 수신되지 않았습니다.
        // 'error.request'는 브라우저에서 XMLHtpRequest 인스턴스이고,
        // node.js에서는 http.ClientRequest 인스턴스입니다.
        console.log(error.request);
      } else {
        // 오류가 발생한 요청을 설정하는 동안 문제가 발생했습니다.
        console.log("Error", error.message);
      }
      console.log(error.config);
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
