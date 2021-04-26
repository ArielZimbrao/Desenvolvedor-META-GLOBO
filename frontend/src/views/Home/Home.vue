<template>
  <div class="page-container">
    <Menu/>
    <div ref="home" class="home">
      <span class="home-title">
        Environment Statistics
      </span>
      <div class="data-container">
        <div class="chart-container">
          <span class="data-title">CPU Usange</span>
          <apexchart ref="cpuchart" width="500" type="line" :options="chartOptionsCPU" :series="seriesCPU"></apexchart>
        </div>
        <div class="chart-container">
          <span class="data-title">Memory Usange</span>
          <apexchart ref="memorychart" width="500"  type="line" :options="chartOptionsMemory" :series="seriesMemory"></apexchart>
        </div>
        <div class="status-container">
          <span class="data-title">Status Cluster</span>
          <div class="current-status-container">
            <div v-if="checkOkStatusCluster" class="status-ok current-status">
              <i class="fas fa-check"></i>
              <span class="last-update-status">{{updateStatusDate}}</span>
            </div>
            <div v-if="checkFailedStatusCluster" class="status-failed current-status">
              <i class="fas fa-exclamation-triangle"></i>
              <span class="last-update-status">{{updateStatusDate}}</span>
            </div>
          </div>
          <div class="status-options-container">
            <div class="status-option-item">
              <div class="status status-ok"></div>
              <span class="status-title">Ok</span>
            </div>
            <div class="status-option-item">
              <div class="status status-failed"></div>
              <span class="status-title">Failed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Menu from '@/components/Menu/Menu.vue'
import StatusClusterEnum from '@/utils/status-cluster.enum.js'
import moment from 'moment'

export default {
  name: 'Home',
  components: {
    Menu
  },
  computed: {
    checkOkStatusCluster() {
      return this.status === StatusClusterEnum["OK"];
    },
    checkFailedStatusCluster() {
      return this.status === StatusClusterEnum["FAILED"];
    }
  },
  beforeMount() {
    if(!this.$requestService.IsAuthenticate()) {
      this.$router.push('/login');
    }

    this.$requestService.GetCpuUsage().then((response) => {
      this.updateChartCPU(response.labels, response.data);
    });
    this.$requestService.GetMemoryUsage().then((response) => {
      this.updateChartMemory(response.labels, response.data);
    });
    this.$requestService.GetClusterStatus().then((response) => {
      this.updateStatusCluter(response);
    });
  },
  methods: {
    updateStatusCluter(status) {
      this.status = StatusClusterEnum[status];
      this.updateStatusDate = `last update: ${moment().format('MM/DD/YYYY HH:mm')}hrs`
    },
    updateChartCPU(categories, series) {
      if (this.$refs.cpuchart) {
        this.$refs.cpuchart.updateOptions({
          xaxis: {
            categories: categories,
            labels: {
                show: true
              }
            }
          }, false, true
        );
        this.$refs.cpuchart.updateSeries([{
          data: series,
        }], true);
      } else {
        setTimeout(() => {
          this.updateChartCPU(categories, series);
        }, 100);
      }
    },
    updateChartMemory(categories, series) {
      if (this.$refs.memorychart) {
        this.$refs.memorychart.updateOptions({
          xaxis: {
            categories: categories,
            labels: {
                show: true
              }
            }
          }, false, true
        );
        this.$refs.memorychart.updateSeries([{
          data: series,
        }], true);
      } else {
        setTimeout(() => {
          this.updateChartMemory(categories, series);
        }, 100);
      }
    }
  },
  data: function() {
    return {
      status: null,
      updateStatusDate: null,
      seriesCPU: [{
        name: "CPU Usage in percent",
        data: []
      }],
      chartOptionsCPU: {
        id: 'cpuchart',
        chart: {
          height: "100%",
          width: "100%",
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
      },
      seriesMemory: [{
        name: "Memory Usage in percent",
        data: []
      }],
      chartOptionsMemory: {
        id: 'memorychart',
        chart: {
          height: "100%",
          width: "100%",
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