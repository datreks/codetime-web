import { EChartsOption } from "echarts";
import { getDuration } from "../utils/getDuration";
export function getCodeTimeOptions(data: any): EChartsOption {
  const options = {
    tooltip: {
      formatter: (param: any) => {
        return `${param.data.time} </br> <span class="font-weight-bold">
        ${getDuration(param.data.duration)}</span>`;
      },
    },
    xAxis: {
      type: "time",
    },
    grid: {
      left: "10px",
      right: "10px",
      top: "10px",
      bottom: "10px",
      containLabel: true,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter(v: any) {
          return getDuration(v);
        },
      },
    },
    dataset: {
      dimensions: ["time", "duration"],
      source: data,
    },
    series: {
      type: "bar",
      itemStyle: {
        borderRadius: [5, 5, 0, 0],
      },
      dimensions: ["time", "duration"],
    },
  } as EChartsOption;
  return options;
}