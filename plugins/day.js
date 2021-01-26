import Vue from 'vue'
import day from 'dayjs'

Vue.filter('data', (val, format = 'YYYY-MM-DD') => {
  return day(val).format(format)
})