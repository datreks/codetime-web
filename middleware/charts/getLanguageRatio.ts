import { EChartsOption } from "echarts";

export function getLangRadioOptions(data: any): EChartsOption {
  const options = {
    legend: {},
    tooltip: {},
    dataset: {
      source: data,
    },
    xAxis: { show: false },
    yAxis: { type: "category", show: false },
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [
      {
        type: "bar",
        stack: true,
        encode: { y: "product" },
        itemStyle: {
          borderRadius: 10,
          borderWidth: 2,
        },
      },
      {
        type: "bar",
        stack: true,
        encode: { y: "product" },
        itemStyle: {
          borderRadius: 10,
          borderWidth: 2,
        },
      },
      {
        type: "bar",
        stack: true,
        encode: { y: "product" },
        itemStyle: {
          borderRadius: 10,
          borderWidth: 2,
        },
      },
    ],
  } as EChartsOption;
  return options;
}
