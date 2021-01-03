import { EChartsOption } from "echarts";
import { getDuration } from "../utils/getDuration";
export function getCodeTimeOptions(data: any, type = "bar"): EChartsOption {
  const options = {
    tooltip: {
      formatter: (param: any) => {
        return `${param.data.time} </br> <span class="font-weight-bold">
        ${getDuration(param.data.duration)}</span>`;
      },
    },
    xAxis: {
      type: "time",
      axisLabel: {
        formatter: "{yyyy}-{MM}-{dd}",
      },
      minInterval: 86400000,
    },
    grid: {
      left: "0px",
      right: "30px",
      top: "10px",
      bottom: "0px",
      containLabel: true,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter(v: any) {
          return getDuration(v);
        },
      },
      max: "dataMax",
    },
    dataset: {
      dimensions: ["time", "duration"],
      source: data,
    },
    series: {
      type,
      smooth: true,
      itemStyle: {
        borderRadius: [5, 5, 0, 0],
      },
      dimensions: ["time", "duration"],
    },
  } as EChartsOption;
  return options;
}
