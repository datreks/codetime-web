import { EChartsOption } from "echarts";
import { getDuration } from "../utils/getDuration";

export function getLangRadioOptions(data: any): EChartsOption {
  data = data.map((d: any) => {
    return {
      name: d.language,
      value: d.duration,
    };
  });
  let selected = data.slice(5).reduce((pre: any, d: any) => {
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
        // const value = new Date(a.value * 1000).toISOString().substr(11, 5);
        return `<span class="subtitle">${name}</span><br/><span class="font-weight-bold">
        ${getDuration(a.value)}</span> [${percent}%]`;
      },
    },
    legend: {
      type: "scroll",
      textStyle: {
        color: "#777",
      },
      selected: selected,
    },
    series: {
      type: "pie",
      radius: ["40%", "70%"],
      itemStyle: {
        borderRadius: 10,
        borderColor: "#1e1e1e",
        borderWidth: 10,
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
