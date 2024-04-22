// import { auth } from "@/auth";
import { currentUser } from "@/lib/auth";
import { UserInfo } from "@/components/user-info";

const ServerPage = async () => {
  // const session = await auth();
  const user = await currentUser();
  return (
    <div className="w-full bg-neutral-900 text-zinc-200 ">
      <UserInfo user={user} label="💻 Server Component" />
    </div>
  );
};

export default ServerPage;
