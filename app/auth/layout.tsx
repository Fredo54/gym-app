const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" bg-neutral-900 text-zinc-200 h-full flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
