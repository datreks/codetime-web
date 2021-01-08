import { EChartsOption } from "echarts";
import { getDuration } from "../utils/getDuration";

export function getPieOptionsFromData(
  data: any,
  key: string,
  value: string
): EChartsOption {
  data = data.map((d: any) => {
    return {
      name: d[key],
      value: d[value],
    };
  });
  const options = getOptions(data);
  return options;
}

export function getPieOptionsFromMap(data: Map<string, number>) {
  const d: any[] = [];
  data.forEach((v, k) => {
    d.push({ name: k, value: v });
  });
  d.sort((a, b) => b.value - a.value);
  return getOptions(d);
}

function getOptions(data: any) {
  const selected = data.slice(5).reduce((pre: any, d: any) => {
    pre[d.name] = false;
    return pre;
  }, {});

  const options = {
    tooltip: {
      trigger: "item",
      formatter(a: any, _: any) {
        const name = a.name;
        const percent = a.percent;
        // const value = new Intl.NumberFormat().format(a.value);
        return `<span class="subtitle">${name}</span><br/><span class="font-weight-bold">
        ${getDuration(a.value)}</span> [${percent}%]`;
      },
    },
    legend: {
      type: "scroll",
      textStyle: {
        color: "#777",
      },
      selected,
    },
    series: {
      type: "pie",
      radius: ["40%", "70%"],
      minAngle: 20,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#1e1e1e",
        borderWidth: 5,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "34",
          fontWeight: "bold",
        },
      },
      data,
    },
  } as EChartsOption;
  return options;
}
