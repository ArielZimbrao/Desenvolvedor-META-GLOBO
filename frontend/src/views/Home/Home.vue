<template>
  <div class="page-container">
    <Menu/>
    <div class="home">
      <apexchart ref="cpuchart" width="500" type="line" :options="chartOptionsCPU" :series="seriesCPU"></apexchart>
    </div>
  </div>
</template>
<script>
import Menu from '@/components/Menu/Menu.vue'
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'Home',
  components: {
    Menu
  },
  
  beforeCreate() {
    if(!this.$requestService.IsAuthenticate()) {
      this.$router.push('/login');
    }

    /*this.$requestService.GetCpuUsage().then((response) => {
      this.updateChartCPU(response.labels, response.data);
    });
    this.$requestService.GetMemoryUsage().then((response) => {
      console.log(response);
    });*/
  },
  methods: {
    updateChartCPU(categories, series) {
      VueApexCharts.exec('cpuchart', 'updateOptions', {
        xaxis: {
          categories: categories,
          labels: {
              show: true
            }
          }
        }, false, true
      );
      VueApexCharts.exec('cpuchart', 'updateSeries', [{
        data: series,
      }], true);
    }
  },
  data: function() {
    return {
      seriesCPU: [{
        name: "CPU Usage in percent",
        data: []
      }],
      chartOptionsCPU: {
        id: 'cpuchart',
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: [],
        }
      }
    }
  },
}
</script>
<style lang="scss" scoped>
  @import './Home.scss';
</style>