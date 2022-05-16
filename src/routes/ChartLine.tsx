import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { Loader } from "./Coins";
import styled from "styled-components";
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

function ChartLine({ coinId }: IChart) {
  const { isLoading, data } = useQuery<IHistory[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <div>
      {isLoading ? (
        <Loader>"Loading data..."</Loader>
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price(USD)",
              data: data?.map((price) => price.close) as number[],
            },
          ]}
          options={{
            chart: {
              height: "auto",
              width: "100%",
              animations: {
                enabled: true,
                easing: "easeinout",
                speed: 800,
                animateGradually: {
                  enabled: true,
                  delay: 150,
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
            stroke: { curve: "smooth", width: 5 },
            yaxis: { show: false },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },
            grid: {
              show: false,
              borderColor: "#474787",
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#4bcffa"], stops: [0, 100] },
            },
            colors: ["#ff5e57"],
            tooltip: { y: { formatter: (value) => `$ ${value.toFixed(2)}` } },
          }}
        />
      )}
    </div>
  );
}

export default ChartLine;
