import { EChartsOption } from "echarts";
import { getDuration } from "../utils/getDuration";
import { getNextSaturday, getStartSunday } from "../utils/getNextSaturday";

export function getCalendarOptions(data: any[], width: number): EChartsOption {
  const min = data.reduce(
    (p: number, c: any) => (c.duration < p ? c.duration : p),
    Infinity
  );
  const max = data.reduce(
    (p: number, c: any) => (c.duration > p ? c.duration : p),
    -Infinity
  );
  const cell = (width - 20) / 53;
  const options = {
    tooltip: {
      formatter: (param: any) => {
        return `${param.data.time} </br> <span class="font-weight-bold">
        ${getDuration(param.data.duration)}</span>`;
      },
    },
    dataset: {
      source: data,
    },
    visualMap: {
      max,
      min,
      type: "piecewise",
      show: false,
      inRange: {
        color: ["#5470C633", "#5470C6ff"],
      },
    },
    calendar: {
      left: 15,
      right: 5,
      top: 20,
      cellSize: cell,
      range: [getStartSunday(), getNextSaturday()],
      dayLabel: { color: "#777" },
      monthLabel: { color: "#777" },
      itemStyle: {
        borderWidth: cell / 10,
        borderColor: "#5470C611",
        color: "#0000",
      },
      splitLine: { lineStyle: { color: "#0000" } },
      yearLabel: { show: false },
    },
    series: [
      {
        type: "heatmap",
        coordinateSystem: "calendar",
      },
    ],
    darkMode: true,
  } as EChartsOption;
  return options;
}
