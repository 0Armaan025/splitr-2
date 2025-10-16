import { Poppins } from 'next/font/google'
import React from 'react'

type Props = {}

const poppinsFont = Poppins({
    weight: ['400', '700'],
    subsets: ['latin'],
});

const LandingContent = (props: Props) => {
    return (
        <div className="landing-content flex flex-col justify-center items-center px-4 md:px-0">
            <div className="lead-text mt-20 w-full max-w-5xl">
                <h3 className={`${poppinsFont.className} text-center text-4xl md:text-5xl lg:text-6xl font-semibold`}>
                    Express your <span className='text-blue-500'>creativity</span> & create awesome books with <span className='text-blue-500'>Splitr</span>
                </h3>
            </div>

            <div className="para-text mt-10 w-full max-w-3xl text-center px-2 md:px-0">
                <h4 className='text-gray-700 text-sm md:text-md lg:text-lg'>
                    We believe that it is important for every student to unleash their creativity and skill, their internal author must be waiting for this day to be unleashed upon them. Now is the time to use that time wisely and create your brand using our SaaS! :D
                </h4>          
            </div>

            {/* buttons div */}
            <div className="buttons-div flex flex-col sm:flex-row justify-center items-center mt-10 gap-4">
                <input type="button" value="Get Started" className="bg-blue-600 text-white transition-all px-6 py-3 rounded-full hover:bg-blue-900 cursor-pointer w-full sm:w-auto" />
                <input type="button" value="View a demo" className="bg-gray-400/20 transition-all border border-black px-6 py-3 rounded-full hover:bg-white text-black cursor-pointer w-full sm:w-auto" />
            </div>
        </div>
    )
}

export default LandingContent
