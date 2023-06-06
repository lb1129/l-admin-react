import React, { useEffect, createRef } from 'react'
import PositionMap from '@/components/PositionMap'
import * as echarts from 'echarts/core'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
// echarts 按需加载使用
echarts.use([GridComponent, TooltipComponent, BarChart, CanvasRenderer])

const Home: React.FC = () => {
  const container = createRef<HTMLDivElement>()

  useEffect(() => {
    const node = container.current
    if (node) {
      const myChart = echarts.init(node)
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      })
    }
  }, [container])

  return (
    <div
      style={{
        display: 'flex',
        height: '100%'
      }}
    >
      <div style={{ flex: 1 }} ref={container}></div>
      <div style={{ flex: 1 }}>
        <PositionMap onChange={(record) => {}} />
      </div>
    </div>
  )
}

export default Home
