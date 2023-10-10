import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface BarChartProps {
  data: { name: string; value: number }[];
  size: { width: number; height: number };
}

export const BarChart: React.FC<BarChartProps> = ({ data, size }) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (ref.current) {
      const svg = d3.select(ref.current).attr('width', size.width).attr('height', size.height);

      // clear any previous render
      svg.selectAll('*').remove();

      const xScale = d3
        .scaleBand()
        .domain(data.map((d) => d.name))
        .range([0, size.width])
        .padding(0.5);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.value)!])
        .range([size.height, 0]);

      // draw bars
      svg
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d) => xScale(d.name)!)
        .attr('y', (d) => yScale(d.value))
        .attr('width', xScale.bandwidth())
        .attr('height', (d) => size.height - yScale(d.value))
        .attr('fill', 'blue');
    }
  }, [data, size]);

  return <svg ref={ref}></svg>;
};
