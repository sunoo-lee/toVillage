"use client";

import MainPage from "@/components/Main/MainPage";
import ProjectDetail from "@/components/Projects/ProjectDetail";
import ProjectPage from "@/components/Projects/ProjectPage";
import ContainerBox from "@/components/UI/ContainerBox";
import pageStore from "@/store/pageStore";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const currentPage = pageStore((state) => state.currentPage);
  const [todoModal, setTodoModal] = useState(false);

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage]);

  const modalOpenHandler = () => {
    setTodoModal((prev) => true);
  };

  const modalCloseHandler = () => {
    setTodoModal((prev) => false);
  };

  const addPoint = async () => {
    try {
      const access_token =
        localStorage.getItem("access_token") ||
        sessionStorage.getItem("access_token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      console.log(localStorage.getItem("access_token"));
      const item = {
        uuid: "36f181c1-f1a4-4412-b750-469934ca2d94",
      };
      const response = await axios.post(
        "http://localhost:8080/points/add",
        item
      );
      const data = await response.data;
      console.log(data);
    } catch (error: any) {
      console.log("입력: ", error.message);
    }
  };

  const usePoint = async () => {
    try {
      const access_token =
        localStorage.getItem("access_token") ||
        sessionStorage.getItem("access_token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      const item = {
        uuid: "36f181c1-f1a4-4412-b750-469934ca2d94",
        newUsage: {
          building: "building test",
          location: "location test",
        },
      };
      const response = await axios.post(
        "http://localhost:8080/points/use",
        item
      );
      const data = await response.data;
      console.log(data);
    } catch (error: any) {
      console.log("사용: ", error.message);
    }
  };

  const canclePoint = async () => {
    try {
      const access_token =
        localStorage.getItem("access_token") ||
        sessionStorage.getItem("access_token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      const item = {
        uuid: "36f181c1-f1a4-4412-b750-469934ca2d94",
        usedHistory: {
          building: "building test",
          location: "location test",
        },
      };
      const response = await axios.post(
        "http://localhost:8080/points/cancel",
        item
      );
      const data = await response.data;
      console.log(data);
    } catch (error: any) {
      console.log("취소: ", error.message);
    }
  };

  return (
    <main className="grid w-full h-full py-10 bg-[#92AE6D] select-none place-items-center scrollbar-hide">
      <button
        onClick={modalOpenHandler}
        className="absolute px-6 py-2 rounded-full top-16 left-5 bg-slate-200"
      >
        팝업
      </button>
      <div className="absolute top-16 right-5 space-x-3">
        <button
          onClick={addPoint}
          className="px-6 py-2 rounded-full  bg-slate-200"
        >
          획득
        </button>
        <button
          onClick={usePoint}
          className="px-6 py-2 rounded-full  bg-slate-200"
        >
          사용
        </button>
        <button
          onClick={canclePoint}
          className="px-6 py-2 rounded-full  bg-slate-200"
        >
          취소
        </button>
      </div>
      {todoModal && (
        <ContainerBox>
          <button
            onClick={modalCloseHandler}
            className="absolute p-2 px-4 bg-blue-200 rounded-full right-4 top-4"
          >
            닫기
          </button>
          {currentPage === "main" && <MainPage />}
          {currentPage === "project" && <ProjectPage />}
          {currentPage === "projectDetail" && <ProjectDetail />}
        </ContainerBox>
      )}
      <div className="absolute w-full bottom-0 flex justify-between p-4">
        <Link href={"/build"}>
          <button className=" px-6 py-2 rounded-full bg-slate-200">건축</button>
        </Link>
        <button className=" px-6 py-2 rounded-full  bg-slate-200">마을</button>
      </div>
    </main>
  );
}
