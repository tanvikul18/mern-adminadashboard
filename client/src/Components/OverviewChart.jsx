import { ResponsiveLine } from '@nivo/line';
import { useGetSalesQuery } from '../state/api.js';
import { useTheme,Box } from "@mui/material";
import { useMemo } from "react";
import { CircularProgress } from '@mui/material';

export const OverviewChart = ({ isDashboard = false, view }) => {
  const theme = useTheme();
  const { data, isLoading } = useGetSalesQuery();

  const { totalSalesLine, totalUnitsLine } = useMemo(() => {
    if (!data) return { totalSalesLine: [], totalUnitsLine: [] };
    const { monthlyData } = data;

    const totalSalesline = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: [],
    };

    const totalUnitsline = {
      id: "totalUnits",
      color: theme.palette.secondary.main,
      data: [],
    };

    let cumulativeSales = 0;
    let cumulativeUnits = 0;

    monthlyData.forEach(({ month, totalSales, totalUnits }) => {
      cumulativeSales += totalSales;
      cumulativeUnits += totalUnits;

      totalSalesline.data.push({ x: month, y: cumulativeSales });
      totalUnitsline.data.push({ x: month, y: cumulativeUnits });
    });

    return {
      totalSalesLine: [totalSalesline],
      totalUnitsLine: [totalUnitsline],
    };
  }, [data, theme.palette.secondary.main]);

  if (isLoading || !data) return <CircularProgress />;

  return (
    <ResponsiveLine
      data={view === "sales" ? totalSalesLine : totalUnitsLine}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.secondary.light,
            },
          },
          legend: {
            text: {
              fill: theme.palette.secondary.light,
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary.light,
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.secondary.light,
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.secondary.light,
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
      }}
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      enableArea={isDashboard}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => (isDashboard ? v.slice(0, 3) : v),
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard
          ? ""
          : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
        legendOffset: -60,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 30,
                translateY: -40,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
};
