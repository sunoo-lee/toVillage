"use client";

import { useEffect, useState } from "react";

interface WeekInfo {
  date: string;
  day: string;
}

export default function Weekly() {
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [weekCount, setWeekCount] = useState(0);
  const [thisWeek, setThisWeek] = useState<WeekInfo[]>([]);

  const getWeeklyData = () => {
    const today = new Date();
    const currentDate = today.getDate();
    const firstDay = new Date(today.setDate(1)).getDay();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const result = Math.ceil((currentDate + firstDay) / 7);
    setWeekCount(result);
    setMonth(month);
    setYear(year);
  };

  const getDateRange = (startDate: any, endDate: any) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const result = [];
    const day = ["일", "월", "화", "수", "목", "금", "토"];
    let i = 0;
    while (start <= end) {
      result.push({
        date: start.toISOString().split("T")[0].slice(-2),
        day: day[i],
      });
      start.setDate(start.getDate() + 1);
      ++i;
    }

    return result;
  };

  useEffect(() => {
    getWeeklyData();
  }, []);

  useEffect(() => {
    const getThisWeek = () => {
      const now = new Date();
      const nowDayOfWeek = now.getDay();
      const nowDay = now.getDate();
      const nowMonth = now.getMonth();
      let nowYear = now.getFullYear();
      nowYear += nowYear < 2000 ? 1900 : 0;
      const weekStartDate = new Date(
        nowYear,
        nowMonth,
        nowDay - nowDayOfWeek + 1
      );
      const weekEndDate = new Date(
        nowYear,
        nowMonth,
        nowDay + (6 - nowDayOfWeek) + 1
      );
      const result = getDateRange(weekStartDate, weekEndDate);
      setThisWeek(result);
    };
    getThisWeek();
  }, []);

  return (
    <div className="w-full pt-16 pb-5  rounded-b-3xl">
      <div className="text-center text-3xl font-semibold pb-8 ">
        {year}년 {month}월
      </div>
      <div className="text-lg w-full font-medium">
        <ul className="flex items-center justify-around w-full px-4 ">
          {thisWeek.map((item, index) => (
            <li key={index}>
              {new Date().getDate() + "" === item.date ? (
                <div className="relative text-center before:absolute before:-inset-3 before:rounded-xl before:border-2 before:bg-rose-400 before:p-5 ">
                  <div className="relative text-white">{item.day}</div>
                  <div className="relative text-white">{item.date}</div>
                </div>
              ) : (
                <div className=" text-center">
                  <div>{item.day}</div>
                  <div>{item.date}</div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
