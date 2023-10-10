import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { EChartOption } from 'echarts';

interface DataPoint {
  date: Date;
  value: number;
}

interface LineChartProps {
  data: {
    [key: string]: {
      [date: string]: number;
    };
  };
}

export const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const resizeChart = () => {
      chart.resize();
    };

    window.addEventListener('resize', resizeChart);

    const series: EChartOption.SeriesLine[] = Object.keys(data).map((key) => ({
      name: key,
      type: 'line',
      data: Object.entries(data[key]).map(([date, value]) => ({
        value,
        name: date,
      })),
    }));

    const option: EChartOption = {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: Object.keys(data),
      },
      xAxis: {
        type: 'category',
      },
      yAxis: {
        type: 'value',
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '10%',
        containLabel: true,
      },
      series,
      color: ['#a78bfa', '#f87171', '#4ade80'],
    };

    chart.setOption(option);

    return () => {
      window.removeEventListener('resize', resizeChart);
    };
  }, [data]);

  return (
    <div
      ref={chartRef}
      style={{
        width: '100%',
        height: '100%',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    />
  );
};
