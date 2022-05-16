import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { Loader } from "./Coins";
import styled from "styled-components";
import { isPropertySignature } from "typescript";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IChart {
  coinId: string;
}

interface IHistory {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function ChartCandle({ coinId }: IChart) {
  const { isLoading, data: historicalDatas } = useQuery<IHistory[]>(
    ["ohlc", coinId],
    () => fetchCoinHistory(coinId)
  );
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <div>
      {isLoading ? (
        <Loader>"Loading data..."</Loader>
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: historicalDatas?.map((historicalData) => [
                new Date(historicalData.time_close).getTime(),
                [
                  historicalData.open.toFixed(3),
                  historicalData.high.toFixed(3),
                  historicalData.low.toFixed(3),
                  historicalData.close.toFixed(3),
                ],
              ]) as unknown as [number, (number | null)[]][],
            },
          ]}
          options={{
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#4bcffa",
                  downward: "#ff5e57",
                },
              },
            },
            chart: {
              height: "auto",
              width: "100%",
              animations: {
                enabled: true,
                easing: "easeinout",
                speed: 800,
                animateGradually: {
                  enabled: true,
                  delay: 300,
                },
                dynamicAnimation: {
                  enabled: true,
                  speed: 350,
                },
              },

              toolbar: { show: true },
              background: "transparent",
            },
            theme: { mode: isDark ? "dark" : "light" },
            stroke: { curve: "smooth", width: 4 },
            yaxis: { show: false },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
              type: "datetime",
              categories: historicalDatas?.map(
                (historicalData) => historicalData.time_close
              ),
            },
            grid: {
              show: false,
              borderColor: "#474787",
            },
            colors: ["white"],
            tooltip: { y: { formatter: (value) => `$ ${value.toFixed(2)}` } },
          }}
        />
      )}
    </div>
  );
}

export default ChartCandle;
