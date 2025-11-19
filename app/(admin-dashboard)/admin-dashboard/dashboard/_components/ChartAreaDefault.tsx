"use client";

import { CartesianGrid, XAxis, YAxis, AreaChart, Area, Line } from "recharts";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
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
import { getScheduleStatistics, ScheduleStatisticsData } from "@/services/AdminDashboard";
 
export const description = "A line chart";

const chartConfig = {
  schedules: {
    label: "Schedules",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartAreaDefault() {
  const [chartData, setChartData] = useState<ScheduleStatisticsData[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("11");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchScheduleData = async (month: number) => {
    try {
      setLoading(true);
      console.log('Fetching data for month:', month);
      const response = await getScheduleStatistics(month);
      console.log('API Response:', response);
      console.log('Response data:', response.data);
      
      // Use the data directly from API (no transformation needed if interface matches)
      setChartData(response.data);
    } catch (error) {
      console.error('Error fetching schedule statistics:', error);
      setChartData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScheduleData(parseInt(selectedMonth));
  }, [selectedMonth]);

  const handleMonthChange = (value: string) => {
    console.log('Month changed to:', value);
    setSelectedMonth(value);
  };

  if (loading) {
    return (
      <Card className="border-none shadow-none">
        <CardContent className="h-[400px] flex items-center justify-center">
          <div>Loading schedule statistics...</div>
        </CardContent>
      </Card>
    );
  }

  console.log('Chart data to render:', chartData);

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="flex justify-between">
        <CardTitle>Schedule Statistics</CardTitle>
        <Select value={selectedMonth} onValueChange={handleMonthChange}>
          <SelectTrigger className="shadow-none rounded-full">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Month</SelectLabel>
              <SelectItem value="1">January</SelectItem>
              <SelectItem value="2">February</SelectItem>
              <SelectItem value="3">March</SelectItem>
              <SelectItem value="4">April</SelectItem>
              <SelectItem value="5">May</SelectItem>
              <SelectItem value="6">June</SelectItem>
              <SelectItem value="7">July</SelectItem>
              <SelectItem value="8">August</SelectItem>
              <SelectItem value="9">September</SelectItem>
              <SelectItem value="10">October</SelectItem>
              <SelectItem value="11">November</SelectItem>
              <SelectItem value="12">December</SelectItem>
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
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              domain={[0, "dataMax + 1"]} // Added buffer for better visibility
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            {/* The area with gradient under the line */}
            <Area
              type="monotone"
              dataKey="schedules" // Make sure this matches your API response key
              stroke="#123F93"
              fill="url(#gradientUnderLine)"
              fillOpacity={0.3}
            />
            <Line
              dataKey="schedules" // Make sure this matches your API response key
              type="monotone"
              stroke="#123F93"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}