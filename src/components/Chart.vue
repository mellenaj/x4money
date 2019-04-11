<template>
  <div ref="chartView">
    <div id="chart-high"></div>
    <table align="center" width="100%" class="productOptions">
      <tr v-for="(value, key) in selected_prod" :key="key">
        <td width="70%">{{key}} :</td>
        <td width="30%">{{value || 'нет данных'}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import Highcharts from 'highcharts'
let chart

export default {
  name: 'ComponentChart',
  props: {
    'comparisons': {
      type: Array,
      required: true
    },
    'filters': {
      type: Array,
      required: true
    },
    'selected_product_feature_in_units': {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      selected_prod: {}
    }
  },
  watch: {
    comparisons (newData) {
      if (chart.series.length) {
        chart.destroy()
        this.drawChart()
      }
    }
  },
  methods: {
    redrawChartDueToTriggerLeftPanels () {
      this.$root.$on('redrawChartDueToLeftDrawer', (param) => {
        const width = (param) ? -300 : 300
        chart.setSize(chart.chartWidth + width, chart.chartHeight)
      })
    },
    redrawChartDueToTriggerRightPanels () {
      this.$root.$on('redrawChartDueToRightDrawer', (param) => {
        const width = (param) ? -300 : 300
        chart.setSize(chart.chartWidth + width, chart.chartHeight)
      })
    },
    drawChart () {
      let vm = this
      // eslint-disable-next-line camelcase
      let Chart_Options = {
        chart: {
          type: 'scatter',
          zoomType: 'x',
          height: vm.$q.platform.is.desktop ? 50 + '%' : null,
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
          text: 'Сравнения товаров'
        },
        credits: {
          text: 'Highcharts.com'
        },
        subtitle: {
          text: (document.ontouchstart === undefined) ? 'Нажмите и перетащите область сюжета, чтобы увеличить масштаб' : 'Зажмите диаграмму, чтобы увеличить'
        },
        xAxis: {
          reversed: false,
          max: null,
          title: {
            enabled: true,
            text: 'Цена за 1 ' + vm.selected_product_feature_in_units.units
          },
          labels: {
            formatter: function () {
              let price = this.value.toLocaleString()
              return price + ' uah'
            }
          },
          maxPadding: 0.05,
          showLastLabel: true
        },
        yAxis: {
          max: null,
          title: {
            text: vm.selected_product_feature_in_units.label
          },
          labels: {
            formatter: function () {
              return this.value + ' ' + vm.selected_product_feature_in_units.units
            }
          },
          lineWidth: 2
        },
        legend: {
          enabled: false
        },
        tooltip: {
          style: {
            width: '140px'
          },
          positioner: function () {
            return { x: this.chart.chartWidth - 160, y: 110 }
          },
          headerFormat: '',
          pointFormatter: function () {
            let str = '<b>' + this.name + '</b> <br/>'
            str += '<b>Price: </b>' + this.low_price + ' uah<br/>'
            str += '<br/> <b>Total:</b> ' + this.x + ' uah за 1 ' + vm.selected_product_feature_in_units.units
            return str
          }
        },
        plotOptions: {
          spline: {
            marker: {
              enable: false
            }
          },
          series: {
            turboThreshold: 5000,
            cursor: 'pointer',
            point: {
              events: {
                click: function () {
                  if (confirm('ХОТИТЕ ПЕРЕЙТИ НА СТРАНИЦУ ПРОДУКТА ? ' + this.name)) {
                    window.open(this.url, '_blank')
                  }
                },
                mouseOver: function () {
                  vm.$emit('getProductОptions', this.options)
                },
                mouseOut: function () {
                  vm.$emit('getProductОptions', null)
                }
              }
            }
          }
        },
        series: vm.comparisons
      }
      chart = Highcharts.chart('chart-high', Chart_Options)
    },
    fixForRightDrawerAnimation () {
      setTimeout(() => {
        this.drawChart()
        this.$on('getProductОptions', (prod) => {
          if (prod) {
            let obj = {}
            this.filters.forEach((item) => {
              if (item.desc !== 'low_price') {
                obj[[item.name]] = prod[item.desc]
              }
            })
            this.selected_prod = obj
          } else {
            this.selected_prod = {}
          }
        })
      }, 200)
    }
  },
  mounted () {
    this.fixForRightDrawerAnimation()
  },
  created () {
    this.redrawChartDueToTriggerLeftPanels()
    this.redrawChartDueToTriggerRightPanels()
  },
  beforeDestroy () {
    this.$root.$off('redrawChartDueToLeftDrawer')
    this.$root.$off('redrawChartDueToRightDrawer')
    this.$off('getProductОptions')
  }
}
</script>

<style>
.productOptions{
  font-size: 13px;
}
.productOptions td {
  padding-right: 15px;
}
</style>
