"use client";

import { CartesianGrid, XAxis, YAxis, AreaChart, Area, Line } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "A line chart";

const chartData = [
  { month: "January", desktop: 100 },
  { month: "February", desktop: 1000 },
  { month: "March", desktop: 1500 },
  { month: "April", desktop: 900 },
  { month: "May", desktop: 500 },
  { month: "June", desktop: 1100 },
  { month: "July", desktop: 450 },
  { month: "August", desktop: 1000 },
  { month: "September", desktop: 500 },
  { month: "October", desktop: 300 },
  { month: "November", desktop: 1150 },
  { month: "December", desktop: 2000 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartAreaDefault() {
  return (
    <Card className="border-none shadow-none">
      <CardHeader className="flex justify-between">
        <CardTitle>Schedule Statistics</CardTitle>
        <Select>
          <SelectTrigger className="shadow-none rounded-full">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Month</SelectLabel>
              <SelectItem value="january">January</SelectItem>
              <SelectItem value="february">February</SelectItem>
              <SelectItem value="march">March</SelectItem>
              <SelectItem value="april">April</SelectItem>
              <SelectItem value="may">May</SelectItem>
              <SelectItem value="june">June</SelectItem>
              <SelectItem value="july">July</SelectItem>
              <SelectItem value="august">August</SelectItem>
              <SelectItem value="september">September</SelectItem>
              <SelectItem value="october">October</SelectItem>
              <SelectItem value="november">November</SelectItem>
              <SelectItem value="december">December</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 1,
              right: 1,
              top: 16,
              bottom: 16,
            }}
          >
            {/* Gradient under the line */}
            <defs>
              <linearGradient id="gradientUnderLine" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#60A5FA" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              horizontal={true}
              strokeDasharray="5 5"
              stroke="#A5A5AB"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              domain={[0, "dataMax"]} // Dynamic Y-axis scaling
              ticks={[0, 100, 500, 1000, 1500, 2000]} // Custom ticks
              tickCount={7}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => value.toLocaleString()} // Adds commas to numbers
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            {/* The area with gradient under the line */}
            <Area
              type="monotone"
              dataKey="desktop"
              stroke="#123F93" // Line color
              fill="url(#gradientUnderLine)" // Gradient below the line
              fillOpacity={0.3} // Adjust opacity for a subtle effect
            />
            <Line
              dataKey="desktop"
              type="monotone" // Smooth curve for a wave-like effect
              stroke="#123F93" // Same line color as above
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
