import Link from 'next/link';
import React from 'react'

type Props = {}

interface FeatureCardProps {
    title: string;
    icon: string;
    description: string;    
    learnMoreLink: string;
};

const FeaturesSection = (props: Props) => {
  return (
    <div className="featuresSection flex flex-col justify-center items-center px-4 sm:px-6 lg:px-0 py-16 bg-gray-50">
        <h3 className='text-black font-bold mt-16 text-xl sm:text-2xl md:text-3xl text-center'>
            Features that you will get with the <span className='text-blue-500 font-bold'>freemium plan!</span>
        </h3>

        <div className="feature-cards mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
            <FeatureCard 
                icon='https://i.pinimg.com/736x/6c/e3/65/6ce36516f9983c7086f34d0a5c1fe1ae.jpg' 
                learnMoreLink='#' 
                description='Unlock amazing productivity features for your projects.' 
                title='Efficiency'
            />
            <FeatureCard 
                icon='https://i.pinimg.com/736x/6c/e3/65/6ce36516f9983c7086f34d0a5c1fe1ae.jpg' 
                learnMoreLink='#' 
                description='Collaboration tools that make teamwork a breeze.' 
                title='Collaboration'
            />
            <FeatureCard 
                icon='https://i.pinimg.com/736x/6c/e3/65/6ce36516f9983c7086f34d0a5c1fe1ae.jpg' 
                learnMoreLink='#' 
                description='Analytics and insights to track your progress easily.' 
                title='Insights'
            />
        </div>
    </div>
  )
}

export default FeaturesSection

const FeatureCard = ({title, description, icon, learnMoreLink}: FeatureCardProps) => {
    return (
        <div className="feature-card flex flex-col justify-start items-start p-6 bg-gray-50 border-2 border-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full max-w-sm">
            <div className="icon-wrapper w-16 h-16 mb-4 flex justify-center items-center bg-white border-2 border-gray-900 rounded-lg">
                <img src={icon} alt={`${title} icon`} className="w-10 h-10"/>
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-700 mb-4">{description}</p>
            <Link href={learnMoreLink} className="text-blue-500 font-semibold hover:underline mt-auto">Learn More →</Link>
        </div>
    );
}
