import { EChartsOption } from "echarts";
import { getDuration } from "../utils/getDuration";

export function getStackOptions(
  data: any,
  category: string,
  count: number = 30
): EChartsOption {
  const keys = new Set();
  const dataset = Object.keys(data.data).map((date) => {
    const list = data.data[date];
    const obj = {} as any;
    for (const item of list) {
      obj[item[category]] = item.duration;
      keys.add(item[category]);
    }
    obj.day = date;
    return obj;
  });
  dataset.forEach((d: any) => {
    keys.forEach((k: any) => {
      if (d[k] === undefined) d[k] = 0;
    });
  });
  dataset.splice(0, dataset.length - count);
  const option = {
    legend: {
      type: "scroll",
      textStyle: {
        color: "#777",
      },
    },
    grid: {
      left: "0px",
      right: "30px",
      top: "50px",
      bottom: "0px",
      containLabel: true,
    },
    tooltip: {
      formatter: (param: any) => {
        return `${param.data.day} </br>
        ${param.seriesName}: 
         <span class="font-weight-bold">
        ${getDuration(param.data[param.seriesName])}</span>`;
      },
    },
    dataset: {
      source: dataset,
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
      splitNumber: 3,
    },
    series: Array.from(keys).map((k) => {
      return {
        type: "bar",
        name: k,
        stack: "total",
        encode: { x: "day", y: k },
        itemStyle: {
          borderRadius: 4,
          borderWidth: 2,
        },
      };
    }),
  } as EChartsOption;
  return option;
}
