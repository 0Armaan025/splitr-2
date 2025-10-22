import { Poppins } from "next/font/google";
import React from "react";

type Props = {};

const poppinsFont = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const LandingContent = (props: Props) => {
  return (
    <div
      className={`${poppinsFont.className} landing-content flex flex-col justify-center items-center px-4 md:px-0 min-h-[80vh] bg-white`}
    >
      {/* Headline */}
      <div className="lead-text mt-20 w-full max-w-5xl">
        <h3 className="text-center text-4xl md:text-5xl lg:text-6xl font-semibold text-black">
          Express your{" "}
          <span className="text-blue-600 underline underline-offset-4 decoration-[3px]">
            creativity
          </span>{" "}
          & create awesome books with{" "}
          <span className="text-blue-600 underline underline-offset-4 decoration-[3px]">
            Splitr
          </span>
        </h3>
      </div>

      {/* Subtext */}
      <div className="para-text mt-10 w-full max-w-3xl text-center px-2 md:px-0">
        <h4 className="text-gray-800 text-sm md:text-md lg:text-lg leading-relaxed">
          We believe that every student has creativity waiting to be unleashed.
          Your inner author has been training for this moment — so grab it and
          build your story with our SaaS platform today!
        </h4>
      </div>

      {/* Buttons */}
      <div className="buttons-div flex flex-col sm:flex-row justify-center items-center mt-12 gap-4">
        <button
          className="bg-white text-black border-4 border-black rounded-xl px-8 py-3 font-semibold shadow-[4px_4px_0_rgba(0,0,0,1)] 
          hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_rgba(0,0,0,1)] 
          transition-all duration-150 w-full sm:w-auto"
        >
          Get Started
        </button>

        <button
          className="bg-yellow-300 text-black border-4 border-black rounded-xl px-8 py-3 font-semibold shadow-[4px_4px_0_rgba(0,0,0,1)] 
          hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_rgba(0,0,0,1)] 
          transition-all duration-150 w-full sm:w-auto"
        >
          View a Demo
        </button>
      </div>
    </div>
  );
};

export default LandingContent;
