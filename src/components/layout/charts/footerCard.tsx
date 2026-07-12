import { CardFooter } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export default function FooterCard() {
  return (
    <>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </>
  );
}
