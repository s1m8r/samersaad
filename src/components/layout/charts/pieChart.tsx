import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import FooterCard from "./footerCard";
interface chart {
  name: string;
  badge: number;
  fill: string;
}
interface Props {
  chartData: chart[];
}
export default function ChartPie({ chartData }: Props) {
  const chartConfig = {
    badge: {
      label: "Products",
    },
  } satisfies ChartConfig;
  return (
    <>
      {" "}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Product Badges</CardTitle>
          <CardDescription>Top-rated products by badge</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square"
          >
            <PieChart width={250} height={250}>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie data={chartData} dataKey="badge" nameKey="name" />
            </PieChart>
          </ChartContainer>
        </CardContent>
        <FooterCard description="Grouped by product badge tier" />
      </Card>
    </>
  );
}
