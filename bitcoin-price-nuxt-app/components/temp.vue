<template>
  <div>
    <HeaderComponent />
    <SettingsComponent @settingsChange="updatePieChartSettings" />
    <client-only>
      <nuxt-plotly
        :data="chartSettings.data"
        :layout="chartSettings.layout"
        :config="chartSettings.config"
        style="width: 100%"
      ></nuxt-plotly>
    </client-only>
  </div>
</template>

<script>

/* __placeholder__ */
import {
    NuxtPlotlyConfig,
    NuxtPlotlyData,
    NuxtPlotlyLayout,
    NuxtPlotlyHTMLElement,
} from 'nuxt-plotly';

import axios from 'axios';
import { reactive } from 'vue';
import HeaderComponent from './components/HeaderComponent.vue';
import SettingsComponent from './components/SettingsComponent.vue';


export default {
  components: {
    HeaderComponent,
    SettingsComponent
  },

  data() {
  return {
    chartSettings: reactive({
      data: NuxtPlotlyData = [],
      config: { 
        scrollZoom: true, 
        displayModeBar: true 
      },
      layout: { 
        title: 'Bitcoin'
      },
    }),
    pieChartSettings: {
      selectedPeriod: 'day',
      startDate: null,
      endDate: '2015-01-01',
      customInterval: 1,
    }
  };
},

  mounted() {
    this.fetchBitcoinPrices();
  },
  methods: {
    updatePieChartSettings(settings) {
      console.log('Updated pie chart settings:', settings);
      this.pieChartSettings = settings;
      this.fetchBitcoinPrices();
      console.log('datas', this.chartSettings.data);
    },
    async fetchBitcoinPrices() {

      const baseUrl = 'http://localhost:3001/api/bitcoin-prices';
      const { startDate, endDate } = this.pieChartSettings;

      const queryParams = new URLSearchParams();
      if (startDate) {
        queryParams.append('startDate', startDate);
      }
      if (endDate) {
        queryParams.append('endDate', endDate);
      }

      const urlWithParams = `${baseUrl}?${queryParams.toString()}`;
      console.log('url', urlWithParams);


      try {
        const response = await axios.get(urlWithParams);
        this.chartSettings = { ...this.chartSettings, data: this.transformData(response.data) };
        console.log('chartSettings.data');
      } catch (error) {
        console.error('Error fetching bitcoin prices:', error);
      }
    },
    
    transformData(data) {
      const x = data.map(item => transformUTCDateToLocal(item.date));
      const y = data.map(item => item.price);
      return [{ x: x, y: y, type: 'scatter', mode: 'markers', marker: { size: 2 } }];
    }
  },

  watch: {
    pieChartSettings: {
      deep: true,
      handler() {
        this.fetchBitcoinPrices();
      }
    }
  }
  
};

function transformUTCDateToLocal(utcDateStr) {
    const date = new Date(utcDateStr);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}
</script>
