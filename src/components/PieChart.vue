<template>
  <div>
    <div id="pie-chart-high1"></div>
  </div>
</template>

<script>
import Highcharts from 'highcharts'
let pieChart
export default {
  name: 'ComponentPieChart',
  props: {
    'series': {
      type: Object,
      required: true
    }
  },
  watch: {
    series (newData) {
      if (pieChart.series.length) {
        pieChart.series[0].remove()
        pieChart.addSeries({data: newData.data})
      }
    }
  },
  methods: {
    redrawPieChartDueToTriggerLeftPanels () {
      this.$root.$on('redrawPieChartDueToLeftDrawer', (param) => {
        const width = (param) ? -300 : 300
        pieChart.setSize(pieChart.chartWidth + width, pieChart.chartHeight)
      })
    },
    drawPieChart () {
      let vm = this
      // eslint-disable-next-line camelcase
      let Pie_Chart_Options = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
          events: {
            load: function () {
              this.credits.element.onclick = function () {
                window.open(
                  'https://www.highcharts.com/',
                  '_blank' // <- This is what makes it open in a new window.
                )
              }
            }
          }
        },
        title: {
          text: 'Доля на рынке'
        },
        credits: {
          text: 'Highcharts.com'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              style: {
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
              }
            }
          }
        },
        series: [vm.series]
      }
      pieChart = Highcharts.chart('pie-chart-high1', Pie_Chart_Options)
    },
    fixDueToRightDrawerAnimation () {
      setTimeout(() => {
        this.drawPieChart()
      }, 200)
    }
  },
  mounted () {
    this.fixDueToRightDrawerAnimation()
  },
  created () {
    this.redrawPieChartDueToTriggerLeftPanels()
  },
  beforeDestroy () {
    this.$root.$off('redrawPieChartDueToLeftDrawer')
  }
}
</script>
