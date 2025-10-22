import Footer from "@/components/footer/footer";
import { Navbar } from "@/components/navbar/navbar";

const AuthLayout = ({children}: { children: React.ReactNode }) => {
  return (
    <div className="authLayout flex flex-col min-h-screen">
      <main className="">
            <Navbar/>
        {children}
            <Footer/>
        </main>
    </div>
  );
}

export default AuthLayout;