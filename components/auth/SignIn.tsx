// // import { UserAuth } from "../context/AuthContext";
// "use client";

// import { authenticate } from "@/app/lib/actions";
// import { useFormState } from "react-dom";
// import { CardWrapper } from "@/components/auth/card-wrapper";
// import { LoginForm } from "@/components/auth/login-form";
export default function SignIn() {
  return <></>;
}
// export default function Page() {
//   // const { googleSignIn } = UserAuth();
//   // const [errorMessage, dispatch] = useFormState(authenticate, undefined);

//   // const handleSignIn = async () => {
//   //   try {
//   //     await dispatch();
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // };
//   // console.log(errorMessage);
//   return (
//     <CardWrapper
//       headerLabel="Welcome back Sign in to fitness app to access its features"
//       backButtonLabel="Don't have an account?"
//       backButtonHref="/"
//       showSocial
//     >
//       <LoginForm />
//       <form
//         action={dispatch}
//         className="box-border inline-flex flex-col  p-10 gap-2.5  rounded-2xl mt-36 bg-neutral-800 m-auto h-1/2"
//       >
//         <div className="flex flex-col items-center gap-14">
//           <h1 className="p-0 gap-14 font-bold text-5xl text-center text-zinc-200 ">
//             Login
//           </h1>
//           <p className="font-normal text-base text-center text-neutral-300">
//             Sign in to Fitness App to access its features!
//           </p>
//         </div>
//         <div className="flex flex-col p-5 gap-4 bg-zinc-800 rounded-2xl m-auto">
//           <div className="flex flex-col items-start p-0 gap-4 ">
//             <div className="font-normal text-lg text-blue-100 ">Email</div>
//             <input
//               className="box-border border-spacing-4 bg-neutral-700 rounded-3xl pt-3 pb-3 pl-6 pr-6"
//               placeholder="mail@website.com"
//             ></input>

//             <div className="font-normal text-lg text-blue-100">Password</div>
//             <input
//               className="box-border  bg-neutral-700 rounded-3xl pt-3 pb-3 pl-6 pr-6"
//               placeholder="Min. 8 Characters"
//             ></input>
//           </div>
//           <button className="justify-center w-3/4 p-1 m-auto bg-blue-300 rounded-3xl">
//             <p
//               // onClick={() => handleSignIn()}
//               className="font-normal text-sm text-sky-950"
//             >
//               Sign in
//             </p>
//           </button>
//           <button className="justify-center p-1 bg-blue-300 rounded-3xl">
//             <p
//               // onClick={() => handleSignIn()}
//               className="font-normal text-lg text-sky-950"
//             >
//               Sign in with Google
//             </p>
//           </button>
//         </div>
//         {/* <div className="w-3/5 h-20 bg-purple-400 flex flex-col justify-center m-auto mt-5">
//         <div className="flex justify-center ">Sign In!</div>
//         <button
//           onClick={() => handleSignIn()}
//           className="flex justify-center border-4 w-1/2 mx-auto"
//         >
//           Sign in with Google
//         </button>
//       </div> */}
//       </form>
//     </CardWrapper>
//   );
// }
