import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

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
  size: { width: number; height: number };
}

export const LineChart: React.FC<LineChartProps> = ({ data, size }) => {
  const ref = useRef<SVGSVGElement>(null);
  console.log(data);

  useEffect(() => {
    if (ref.current) {
      const svg = d3.select(ref.current).attr('width', size.width).attr('height', size.height);

      // clear any previous render
      svg.selectAll('*').remove();

      const parseDate = d3.timeParse('%m/%d/%y');

      // Merge all the data points into a single array
      const mergedData: DataPoint[] = [];
      Object.keys(data).forEach((key) => {
        Object.keys(data[key]).forEach((date) => {
          const parsedDate = parseDate(date);

          if (parsedDate) {
            mergedData.push({
              date: parsedDate,
              value: data[key][date],
            });
          }
        });
      });

      const xScale = d3
        .scaleTime()
        .domain(d3.extent(mergedData, (d) => d.date) as [Date, Date])
        .range([0, size.width]);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(mergedData, (d) => d.value) as number])
        .range([size.height, 0]);

      Object.keys(data).forEach((key, i) => {
        const dataset: DataPoint[] = Object.keys(data[key]).map((date) => {
          const parsedDate = parseDate(date);

          return {
            date: parsedDate ? parsedDate : new Date(),
            value: data[key][date],
          };
        });

        const line = d3
          .line<DataPoint>()
          .x((d) => xScale(d.date) as number)
          .y((d) => yScale(d.value) as number);

        svg
          .append('path')
          .datum(dataset)
          .attr('fill', 'none')
          .attr('stroke', d3.schemeCategory10[i % 10])
          .attr('stroke-width', 1.5)
          .attr('d', line);
      });
    }
  }, [data, size]);

  return <svg ref={ref}></svg>;
};
