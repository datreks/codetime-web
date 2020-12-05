import { EChartsOption } from "echarts";

export function getCodeTimeOptions(data: any): EChartsOption {
  const options = {
    xAxis: {
      type: "category",
    },
    grid: {
      left: "10px",
      right: "10px",
      top: "10px",
      bottom: "10px",
      containLabel: true,
    },
    yAxis: { type: "value" },
    dataset: {
      dimensions: ["date", "value"],
      source: data,
    },
    series: {
      type: "bar",
      dimensions: ["date", "value"],
    },
  } as EChartsOption;
  return options;
}
