type HeaderProps = {
  label: string;
};
export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col justify-center gap-y-4 items-center">
      <h1>Auth Login</h1>
      <p className="text-sm">{label}</p>
    </div>
  );
};
