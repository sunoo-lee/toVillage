"use client";

import { useEffect, useState } from "react";

export default function Weekly() {
  const [month, setMonth] = useState(0);
  const [weekCount, setWeekCount] = useState(0);
  const [thisWeek, setThisWeek] = useState([""]);

  const getWeeklyData = () => {
    const today = new Date();
    const currentDate = today.getDate();
    const firstDay = new Date(today.setDate(1)).getDay();
    const month = today.getMonth() + 1;

    const result = Math.ceil((currentDate + firstDay) / 7);
    setWeekCount(result);
    setMonth(month);
  };

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

  const getDateRange = (startDate: any, endDate: any) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const result = [];

    while (start <= end) {
      result.push(start.toISOString().split("T")[0].slice(-2));
      start.setDate(start.getDate() + 1);
    }

    return result;
  };

  useEffect(() => {
    getWeeklyData();
  }, []);

  useEffect(() => {
    getThisWeek();
  }, []);

  return (
    <div className="w-full pt-10 pb-8 bg-slate-200 rounded-b-3xl">
      <div className="text-center text-2xl font-semibold pb-12 ">
        {month}월 {weekCount}주
      </div>
      <div className="text-lg w-full font-medium">
        <ul className="flex items-center justify-around w-full px-4 ">
          {thisWeek.map((element, index) => (
            <li key={index}>
              <div>{element}</div>
            </li>
          ))}
        </ul>
      </div>
      {/* <div className="pb-8 rounded-b-3xl bg-slate-400"></div> */}
    </div>
  );
}
