import React from "react";
import { Outlet } from "react-router-dom";
import ChatBotRender from "../../components/ChatBotRender";

export default function DiagnoseContent() {
  return (
    <div className="flex-1 bg-white/85 mt-5 lg:mt-10 min-h-[460px] rounded-lg shadow-md max-w-[95%] mx-6  lg:w-full ">
      <Outlet />
      <ChatBotRender />
    </div>
  );
}
