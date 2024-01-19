<template>
  <div class="settings">
    <div class="data-setting">
      <label for="startDate">From: </label>
      <input type="date" id="startDate" v-model="startDate">

      <label for="endDate">To: </label>
      <input type="date" id="endDate" v-model="endDate">
    </div>

    <div class="period-setting">
      <select class="period" id="periodSelect" v-model="periodSelection" @change="handlePeriodChange">
        <option value="1">Day</option>
        <option value="7">Week</option>
        <option value="30">Month</option>
        <option value="365">Year</option>
        <option value="custom">Custom</option>
      </select>

      <div v-if="isCustomPeriod" class="period">
        <input type="number" id="customInterval" v-model="customInterval" @input="handleCustomIntervalChange">
        <label for="customInterval"> day(s):</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingsComponent',
  data() {
    return {
      periodSelection: '1', // default to 'Day'
      customInterval: 1,
      startDate: null,
      endDate: null,
    };
  },
  computed: {
    selectedPeriod() {
      return this.isCustomPeriod ? this.customInterval : parseInt(this.periodSelection);
    },
    isCustomPeriod() {
      return this.periodSelection === 'custom';
    }
  },
  methods: {
    handlePeriodChange() {
      this.emitSettingsChange();
    },
    handleCustomIntervalChange() {
      if (this.isCustomPeriod) {
        this.emitSettingsChange();
      }
    },
    emitSettingsChange() {
      const settings = {
        selectedPeriod: this.selectedPeriod,
        startDate: this.startDate,
        endDate: this.endDate,
        customInterval: this.customInterval,
      };
      this.$emit('settingsChange', settings);
    }
  },
  watch: {
    startDate() {
      this.emitSettingsChange();
    },
    endDate() {
      this.emitSettingsChange();
    }
  }
};
</script>

<style>

  input[type="date"] {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
  }

  .data-setting label {
    margin-right: 15px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 10px;
  }
  .settings {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    padding: 20px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
  }

  .data-setting {
    display: flex;
    justify-content: space-between;
    margin: 10px;
    width: 400px;
  }

  .period-setting {
    display: flex;
    justify-content: space-around;
    margin: 10px;
    width: 300px;
  }

  .period {
    display: flex;
    align-items: center;
    margin-top: 10px;
    width: 80px;
    height: 30px; 
  }

  input[type="number"] {
    width: 50px;
    height: 25px;
    margin-left: 10px; 
  }
</style>
