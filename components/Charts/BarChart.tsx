import React, { useEffect } from 'react';
import * as echarts from 'echarts';

interface BarChartProps {
  data: { name: string; value: number }[];
  size: { width: number; height: number };
}

export const BarChart: React.FC<BarChartProps> = ({ data, size }) => {
  const chartRef = React.useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);
      const option = {
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: data.map((item) => item.name),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: data.map((item) => item.value),
            type: 'bar',
            itemStyle: {
              color: 'blue',
            },
          },
        ],
      };
      chartInstance.setOption(option);
    }
  }, [data]);

  return <div ref={chartRef} style={{ width: size.width, height: size.height }} />;
};
