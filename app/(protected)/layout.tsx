import { Navbar } from "@/app/(protected)/settings/_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="md:w-[60vw] w-[90vw] flex flex-col gap-y-10 items-center justify-center">
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
