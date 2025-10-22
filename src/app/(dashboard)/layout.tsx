import Footer from "@/components/footer/footer";
import { Navbar } from "@/components/navbar/navbar";
import { LeftSideBar } from "./dashboard/left-side-bar";

const DashboardLayout = ({children}: { children: React.ReactNode }) => {
  return (
    <div className="authLayout flex flex-col min-h-screen">
      <main className="flex flex-row ">
            <LeftSideBar/>
        {children}
            
        </main>
    </div>
  );
}

export default DashboardLayout;