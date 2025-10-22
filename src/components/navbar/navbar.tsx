import { link } from "fs";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppinsFont = Poppins({
    weight: ['400', '700'],
    subsets: ['latin'],
});

const NAV_LINKS = [
    {
        name: "Blogs",
        link: "/blogs",

    },
    {
        name: "pricing",
        link: "/pricing",
    },
    {
        name: "Docs",
        link: "/docs",
    },
    {
        name: "About us",
        link: "/about-us",
    }, 
    {
        name: "Contact us",
        link: "/contact"
    }
];

export const Navbar = () => {
    return (
        <>
            <nav className="bg-gray-200 p-4 justify-between flex flex-row items-center">
                <Link href="/"><h3 className={`${poppinsFont.className} text-2xl text-black font-semibold`}>Splitr</h3></Link>
                <div className="nav-links flex flex-row">
{NAV_LINKS.map((item, index) => {
                    return <Link key={index} href={item.link} className="text-xl mr-4 hover:underline hover:text-gray-800 transition-all text-gray-600" id={index.toString()}>{item.name}</Link>
                })}               

                </div>
                
                {/* dashboard */}
                <Link href="/dashboard"><input type="button" value="Dashboard" className="bg-black text-white px-4 py-2 rounded-lg hover:bg-black/70 transition-all cursor-pointer" /></Link>
            </nav>
        </>
    );
}