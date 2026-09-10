import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
interface chartData {
  name: string;
  rating: number;
}
interface Props {
  chartData: chartData[];
  color?: string;
  title: string;
  descriptionTitle: string;
}

export default function ChartBar({
  chartData,
  color = "var(--chart-1)",
  title,
  descriptionTitle,
}: Props) {
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{descriptionTitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: string) =>
                value.length > 6 ? `${value.slice(0, 6)}...` : value
              }
            />
            <YAxis domain={[0, 6]} hide />
            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
            <Bar dataKey="rating" fill={color} radius={6} barSize={60} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <FooterCard description="Ranked by average customer rating" />
    </Card>
  );
}
