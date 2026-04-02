"use client";

import { Card, CardContent} from "@/components/ui/card";
import { Provider } from "./_components/provider";

const Onboarding = () => {
  return (
    <div className="container mx-auto flex min-h-svh items-center justify-center">
      <Card>
        <CardContent className="w-200">
          <Provider />
        </CardContent>
      </Card>
    </div>
  );
};
export default Onboarding;
