import { CardWrapper } from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonLabel="Back to login"
      backButtonHref="auth/login"
    >
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="w-16 h-16  text-destructive" />
      </div>
    </CardWrapper>
  );
};
