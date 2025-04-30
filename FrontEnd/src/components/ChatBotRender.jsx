import React, { useState } from "react";
import { BsChatHeart } from "react-icons/bs";
import HealthConsultancyChatbot from "./ChatBot";

const ChatBotRender = () => {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  return (
    <>
      <button
        title="Health ChatBot"
        className={`hidden  fixed top-[450px] lg:top-[530px] right-[20px] bg-[#059AFC] p-[10px] transition-all duration-300 ease-in-out overflow-hidden lg:flex items-center gap-2 ${
          isChatbotVisible
            ? "rounded-xl w-[385px] px-4 py-2 justify-between"
            : "rounded-2xl w-[55px] h-[55px] justify-center"
        }`}
        onClick={() => setIsChatbotVisible(!isChatbotVisible)}
      >
        {/* Chat Icon - Always Visible */}
        <BsChatHeart className="text-[35px] text-white transition-all duration-300 ease-in-out" />

        {/* Text - Only Appears When Expanded */}
        <span
          className={`absolute left-16 text-white font-semibold transition-opacity duration-300 ease-in-out whitespace-nowrap ${
            isChatbotVisible ? "opacity-100 delay-200" : "opacity-0"
          }`}
        >
          Virtual Healthcare AI ChatBot
        </span>
      </button>

      {/* Chatbot Component */}
      <div
        className={`fixed top-[70px] right-0 shadow-3xl transform transition-transform duration-300 ease-linear ${
          isChatbotVisible ? "translate-x-[-0px] right-5" : "translate-x-full"
        }`}
      >
        <HealthConsultancyChatbot />
      </div>
    </>
  );
};

export default ChatBotRender;
