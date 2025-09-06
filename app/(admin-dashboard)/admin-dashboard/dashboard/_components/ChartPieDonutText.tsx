"use client";
import * as React from "react";
import { Label, Legend, Pie, PieChart } from "recharts";
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart with text";

// Updated chart data with user statistics and different color hex codes
const chartData = [
  { category: "Visitors", count: 275, fill: "#123F93" }, // Green for Visitors
  { category: "Subscribers", count: 287, fill: "#FF692E" }, // Blue for Subscribers
  { category: "Users", count: 200, fill: "#22CAAD" }, // Orange for Users
];

// Configuration for the chart
const chartConfig = {
  visitors: { label: "Visitors" },
  users: { label: "Users" },
  subscribers: { label: "Subscribers" },
} satisfies ChartConfig;

export function ChartPieDonutText() {
  // Calculate the total of visitors, users, and subscribers
  const totalCount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, []);

  // Calculate percentages for each segment
  const chartDataWithPercentage = React.useMemo(() => {
    return chartData.map((item) => ({
      ...item,
      percentage: Math.round((item.count / totalCount) * 100),
    }));
  }, [totalCount]);

  return (
    <Card className="flex flex-col h-[500px] border-none shadow-none bg-transparent">
      <CardHeader className="items-center pb-0">
        <CardTitle>
          <h2 className=" ">User Statistics on Your Website</h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 mt-10 relative">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            {/* Custom SVG elements for borders */}
            <defs>
              <g id="borders">
                {/* Inner border circle */}
                <circle
                  cx="50%"
                  cy="50%"
                  r={85}
                  fill="none"
                  stroke="#E4E6E8"
                  strokeWidth={1}
                />
                {/* Outer border circle */}
                <circle
                  cx="50%"
                  cy="50%"
                  r={125}
                  fill="none"
                  stroke="#E4E6E8"
                  strokeWidth={1}
                />
              </g>
            </defs>

            <Pie
              data={chartDataWithPercentage}
              dataKey="count"
              nameKey="category"
              innerRadius={90}
              outerRadius={120}
              strokeWidth={0}
              cornerRadius={4}
              paddingAngle={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <g>
                        {/* Render border circles */}
                        <circle
                          cx={viewBox.cx}
                          cy={viewBox.cy}
                          r={85}
                          fill="none"
                          stroke="#E4E6E8"
                          strokeWidth={1}
                        />
                        <circle
                          cx={viewBox.cx}
                          cy={viewBox.cy}
                          r={125}
                          fill="none"
                          stroke="#E4E6E8"
                          strokeWidth={1}
                        />

                        {/* Center text */}
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalCount.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total
                          </tspan>
                        </text>
                      </g>
                    );
                  }
                }}
              />
            </Pie>
            {/* Legend added at the bottom */}
 <ChartLegend
  content={({ payload }) => (
    <div className="flex justify-between w-full mt-4">
      {payload?.map((entry, index) => (
        <div key={index} className="flex items-center">
          <div 
            className="w-4 h-4 rounded-[2px]  mr-2" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-[#625F6E] font-medium">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  )}
/>
          
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
