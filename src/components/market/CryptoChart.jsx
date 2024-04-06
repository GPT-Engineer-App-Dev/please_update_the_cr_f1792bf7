import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

const CryptoChart = ({ data }) => {
  const chartContainerRef = useRef();
  const [chartCreated, setChartCreated] = useState(false);

  useEffect(() => {
    if (!data || data.length === 0 || chartCreated) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });

    const candleSeries = chart.addCandlestickSeries();

    candleSeries.setData(
      data.map((item) => ({
        time: item.time / 1000,
        open: parseFloat(item.open),
        high: parseFloat(item.high),
        low: parseFloat(item.low),
        close: parseFloat(item.close),
      })),
    );

    setChartCreated(true);

    return () => {
      chart.remove();
      setChartCreated(false);
    };
  }, [data, chartCreated]);

  return <div ref={chartContainerRef} />;
};

export default CryptoChart;
