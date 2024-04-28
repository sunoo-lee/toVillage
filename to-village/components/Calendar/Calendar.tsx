"use client";

import { useEffect, useState } from "react";

interface Props {
  setDeadline: (deadline: string) => void;
  setToggle: (state: boolean) => void;
}

const DATE_MONTH_FIXER = 1;
const CALENDER_LENGTH = 42;
const DEFAULT_TRASH_VALUE = 0;
const DAY_OF_WEEK = 7;
const DAY_LIST = ["일", "월", "화", "수", "목", "금", "토"];

export default function Calendar({ setDeadline, setToggle }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [select, setSelect] = useState<number>();

  //달의 마지막 날짜 구하기
  const getDaysInMonth = (date: Date) => {
    const last = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return last.getDate();
  };

  //달의 첫 요일 구하기
  const getFirstDay = (date: Date) => {
    const firstDate = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDate;
  };

  const totalMonthDays = getDaysInMonth(currentDate);

  //1일 이전 날짜 처리
  const prevDayList = Array.from({
    length: Math.max(0, getFirstDay(currentDate)),
  }).map(() => DEFAULT_TRASH_VALUE);

  const currentDayList = Array.from({ length: totalMonthDays }).map(
    (_, i) => i + 1
  );

  const nextDayList = Array.from({
    length: CALENDER_LENGTH - currentDayList.length - prevDayList.length,
  }).map(() => DEFAULT_TRASH_VALUE);

  const getCalendarList = () => {
    if (nextDayList.length > 6) {
      nextDayList.length -= 7;
    }
    let newList: number[] = prevDayList.concat(currentDayList, nextDayList);
    return newList;
  };

  const currentCalendarList = getCalendarList();

  const weekCalendarList = currentCalendarList.reduce(
    (acc: number[][], cur, idx) => {
      const chunkIndex = Math.floor(idx / DAY_OF_WEEK);
      if (!acc[chunkIndex]) {
        acc[chunkIndex] = [];
      }
      acc[chunkIndex].push(cur);
      return acc;
    },
    []
  );

  const dateSelecthandler = (event: any, day: number) => {
    event.preventDefault();
    setSelect((state) => day);

    setTimeout(() => setToggle(false), 100);
  };

  const getPrevMonth = (event: any) => {
    event.preventDefault();

    const prevMonth = currentDate.getMonth() - 1;
    const prevDate = new Date(currentDate.getFullYear(), prevMonth, 1);
    setCurrentDate(prevDate);
  };

  const getNextMonth = (event: any) => {
    event.preventDefault();

    const nextMonth = currentDate.getMonth() + 1;
    const nextDate = new Date(currentDate.getFullYear(), nextMonth, 1);
    setCurrentDate(nextDate);
  };

  useEffect(() => {
    if (!select) return;
    const deadline =
      currentDate.getFullYear() +
      "-" +
      (currentDate.getMonth() + 1) +
      "-" +
      select;
    setDeadline(deadline);
  }, [currentDate, setDeadline, select]);

  const cancleButtonHandler = (event: any) => {
    event.preventDefault();
    const cancled = "";
    setDeadline(cancled);
    setToggle(false);
  };

  return (
    <div className="absolute w-60 left-0 top-20 font-medium mb-20 p-4 cursor-pointer border bg-white select-none">
      <div className="flex justify-evenly pb-3 items-center">
        <button
          className=" bg-neutral-200 rounded-full px-2 py-1"
          onClick={getPrevMonth}
        >
          <div className="">&#8678;</div>
        </button>
        <div>{currentDate.getMonth() + 1 + "월"}</div>
        <button
          className="bg-neutral-200 rounded-full px-2 py-1"
          onClick={getNextMonth}
        >
          <div className="">&#8680;</div>
        </button>
      </div>
      <div className="w-full flex flex-col justify-center pb-3">
        <div className="flex w-full justify-around">
          {DAY_LIST.map((item, i) => (
            <div
              key={i}
              className={`min-w-[calc(100%/8)] text-center ${
                item === "일"
                  ? "text-red-500"
                  : item === "토"
                  ? "text-blue-500"
                  : ""
              }`}
            >
              {item}
            </div>
          ))}
        </div>
        {weekCalendarList.map((item, i) => (
          <div className="flex w-full justify-around" key={i}>
            {item.map((day, i) => (
              <button
                onClick={(event) => {
                  dateSelecthandler(event, day);
                }}
                className={`flex justify-between min-w-[calc(100%/8)] py-1 active:bg-blue-500 hover:bg-blue-300 items-center text-center ${
                  day === 0 ? " invisible" : ""
                }
                  ${select === day ? " bg-blue-500" : ""}
                  `}
                key={i}
              >
                <div className="mx-auto">{day}</div>
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="text-right">
        <button onClick={cancleButtonHandler}>취소</button>
      </div>
    </div>
  );
}
