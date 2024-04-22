"use client";

import { admin } from "@/actions/admin";
import { FormSuccess } from "@/app/components/form-success";
import { RoleGate } from "@/components/auth/role-gate.tsx";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentRole } from "@/hooks/use-current-role";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {
  //   const role = useCurrentRole();
  //   const role = currentRole();
  const onApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        // console.log("OKAY");
        toast.success("Allowed API Route!");
      } else {
        // console.error("FORBIDDEN");
        toast.error("Forbidden API Route!");
      }
    });
  };

  const onServerActionClick = async () => {
    const { error, success } = await admin();
    if (success) {
      toast.success(success);
    } else if (error) {
      toast.error(error);
    }
  };
  return (
    <Card className="w-full w-max-[600px]">
      <CardHeader className="text-2xl font-semibold text-center">
        <p>Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content!" />
        </RoleGate>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only API Route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
