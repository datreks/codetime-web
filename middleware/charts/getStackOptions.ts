import { EChartsOption } from "echarts";
import { getDuration } from "../utils/getDuration";

export function getStackOptions(data: any, category: string): EChartsOption {
  const keys = new Set();
  data = Object.keys(data.data).map((date) => {
    const list = data.data[date];
    const obj = {} as any;
    for (const item of list) {
      obj[item[category]] = item.duration;
      keys.add(item[category]);
    }
    obj.day = date;
    return obj;
  });
  data.forEach((d: any) => {
    keys.forEach((k: any) => {
      if (d[k] === undefined) d[k] = 0;
    });
  });

  const option = {
    legend: {
      type: "scroll",
      textStyle: {
        color: "#777",
      },
    },
    tooltip: {},
    dataset: {
      source: data,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter(v: any) {
          return getDuration(v);
        },
      },
    },
    xAxis: {
      type: "time",
      axisLabel: {
        formatter: "{yyyy}-{MM}-{dd}",
      },
    },
    series: Array.from(keys).map((k) => {
      return {
        type: "bar",
        name: k,
        stack: "total",
        encode: { x: "day", y: k },
      };
    }),
  } as EChartsOption;
  return option;
}
