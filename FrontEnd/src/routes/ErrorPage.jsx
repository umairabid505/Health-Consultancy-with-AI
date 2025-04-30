import React from "react";
import { IoHomeOutline } from "react-icons/io5";

const ErrorPage = () => {
  return (
    <main class="flex items-center justify-center w-full min-h-screen select-none text-gray-900 ">
      <div class="relative flex flex-col items-center space-y-7 ">
        <h1 class="text-[110px] lg:text-[200px] select-none text-center font-black  text-gray-400">
          404
        </h1>
        <p class="text-base xs:text-xl  lg:text-2xl font-bold capitalize  ">
          You have discovered a secret place
        </p>
        <p class="md:text-lg text-center  lg:text-xl font-medium break-words text-dull w-[300px] xs:w-[350px] md:w-[700px] lg:w-[770px]">
          Unfortunately, this is only a 404 page. You may have mistyped the
          address, or the page has been moved to another URL.
        </p>
        <div>
          <a
            href="/"
            class="rounded flex w-fit group items-center gap-4 justify-center border-2 border-sky-500 font-semibold md:bg-none bg-gradient-to-r from-[#32ebe4] to-[#304ffd] md:hover:bg-gradient-to-r md:hover:from-[#32ebe4] md:hover:to-[#304ffd] p-3 lg:p-6 capitalize focus:outline-none hover:scale-105 active:scale-90 shadow-lg hover:shadow-xl cursor-pointer "
          >
            <span class="text-2xl">
              <IoHomeOutline />
            </span>
            Go back to Home Page
          </a>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
