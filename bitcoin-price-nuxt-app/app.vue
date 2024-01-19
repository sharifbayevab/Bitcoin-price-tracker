<template>
  <div class="bitcoin-app">
    <HeaderComponent />
    <SettingsComponent @settingsChange="updatePieChartSettings" />
    <div class="main">
      <client-only class="plot">
        <nuxt-plotly class="plot"
          :data="data"
          :layout="layout"
          :config="config"
          style="width: 100%"
        ></nuxt-plotly>
    </client-only>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { NuxtPlotlyConfig, NuxtPlotlyData, NuxtPlotlyLayout } from 'nuxt-plotly';
import axios from 'axios';

const pieChartSettings = ref({
  selectedPeriod: '1',
  customInterval: 1,
  startDate: null,
  endDate: null,
});

const x = ref([]);
const y = ref([]);
const data = ref<NuxtPlotlyData>([
  { x: x.value, y: y.value, type: 'scatter', mode: 'markers', marker: { size: 2 } },
]);
updateChartData();
const layout: NuxtPlotlyLayout = {
  title: 'Bitcoin',
  xaxis: {
          title: 'Date',
        },
  yaxis: {
          title: 'Price',
        },
};

const config: NuxtPlotlyConfig = { scrollZoom: true, displayModeBar: true};

function updatePieChartSettings(settings: any) {
  // console.log('Updated pie chart settings:', settings);
  pieChartSettings.value = settings;
  updateChartData();
  // console.log('datas', pieChartSettings.value);
}

async function updateChartData() {
  const baseUrl = 'http://localhost:3001/api/bitcoin-prices';
  const { startDate, endDate, selectedPeriod} = pieChartSettings.value;

  const queryParams = new URLSearchParams();
  if (startDate) {
    queryParams.append('startDate', startDate);
  }
  if (endDate) {
    queryParams.append('endDate', endDate);
  }
  if (selectedPeriod) {
    queryParams.append('selectedPeriod', selectedPeriod);
  }

  const urlWithParams = `${baseUrl}?${queryParams.toString()}`;

  try {
    const response = await axios.get(urlWithParams);
    interface BitcoinPrice {
      id: number;
      price: string; 
      date: string;
    }
    const dates = ref(response.data.map((item: BitcoinPrice) => transformUTCDateToLocal(item.date)));
    const prices = ref(response.data.map((item: BitcoinPrice) => item.price));
    data.value[0] = { x: dates.value, 
                      y: prices.value, 
                      // type: 'grid', 
                      mode: 'line',
                      marker: { size: 2 } 
                    };
  } catch (error) {
    console.error('Error fetching bitcoin prices:', error);
  }
}

function transformUTCDateToLocal(utcDateStr: string) {
  const date = new Date(utcDateStr);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}
</script>

<style>

.bitcoin-app {
  height: 90%;
}
.main {
  height: 60vh;
}
.plot {
  height: 100%;
}
</style>