<template>
  <div>
    <nuxt-plotly
      :data="chartSettings.data"
      :layout="chartSettings.layout"
      :config="chartSettings.config"
      style="width: 100%; height: 700px;"
    ></nuxt-plotly>
  </div>
</template>

<script setup>
import { reactive, defineProps } from 'vue';

const props = defineProps({
    chartData: Object,
});

const layout = [
  {
    title: 'Bitcoin',
  },
];

const config = [
  { scrollZoom: true, displayModeBar: true },
  { scrollZoom: false, displayModeBar: false },
];

const chartSettings = reactive({
  changeDataNo: 1,
  data: props.chartData, 
  changeConfigNo: 1,
  config: config[0],
  changeLayoutNo: 1,
  layout: layout[0],
});

function changeData() {
  chartSettings.data = data[chartSettings.changeDataNo];
  chartSettings.changeDataNo = chartSettings.changeDataNo == 1 ? 0 : 1;
}

function changeLayout() {
  chartSettings.layout = layout[chartSettings.changeLayoutNo];
  chartSettings.changeLayoutNo = chartSettings.changeLayoutNo == 1 ? 0 : 1;
}

function changeConfig() {
  chartSettings.config = config[chartSettings.changeConfigNo];
  chartSettings.changeConfigNo = chartSettings.changeConfigNo == 1 ? 0 : 1;
}
</script>
