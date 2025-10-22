import Link from "next/link";
import React from "react";

type Props = {};

interface FeatureCardProps {
  title: string;
  icon: string;
  description: string;
  learnMoreLink: string;
}

const FeaturesSection = (props: Props) => {
  return (
    <div className="featuresSection flex flex-col justify-center items-center px-4 sm:px-6 lg:px-0 py-20 bg-white border-t-4 border-black">
      <h3 className="text-black font-bold mt-8 text-2xl sm:text-3xl md:text-4xl text-center">
        Features you’ll unlock with the{" "}
        <span className="text-blue-600 underline underline-offset-4 decoration-[3px]">
          Freemium Plan
        </span>
        !
      </h3>

      <div className="feature-cards mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
        <FeatureCard
          icon="https://i.pinimg.com/736x/6c/e3/65/6ce36516f9983c7086f34d0a5c1fe1ae.jpg"
          learnMoreLink="#"
          description="Unlock powerful tools to boost your productivity and simplify your workflow."
          title="Efficiency"
        />
        <FeatureCard
          icon="https://i.pinimg.com/736x/6c/e3/65/6ce36516f9983c7086f34d0a5c1fe1ae.jpg"
          learnMoreLink="#"
          description="Seamless collaboration features to help you and your team create magic together."
          title="Collaboration"
        />
        <FeatureCard
          icon="https://i.pinimg.com/736x/6c/e3/65/6ce36516f9983c7086f34d0a5c1fe1ae.jpg"
          learnMoreLink="#"
          description="Analytics that help you understand what’s working and what’s not — fast."
          title="Insights"
        />
      </div>
    </div>
  );
};

export default FeaturesSection;

// --- FEATURE CARD ---
const FeatureCard = ({
  title,
  description,
  icon,
  learnMoreLink,
}: FeatureCardProps) => {
  return (
    <div
      className="feature-card flex flex-col justify-start items-start p-8 bg-white border-4 border-black rounded-xl 
      shadow-[6px_6px_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_rgba(0,0,0,1)] 
      transition-all duration-200 w-full max-w-sm"
    >
      <div className="icon-wrapper w-16 h-16 mb-4 flex justify-center items-center bg-yellow-200 border-4 border-black rounded-lg">
        <img src={icon} alt={`${title} icon`} className="w-10 h-10 object-contain" />
      </div>

      <h3 className="text-xl font-bold mb-2 text-black">{title}</h3>
      <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>

      <Link
        href={learnMoreLink}
        className="text-black font-semibold border-b-2 border-black hover:text-blue-600 hover:border-blue-600 transition-all duration-150"
      >
        Learn More →
      </Link>
    </div>
  );
};
