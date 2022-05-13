import styled from "styled-components";
import { Link, Route, Routes, useMatch } from "react-router-dom";
// import { Tab } from "./Coin";
import ChartLine from "./ChartLine";
import ChartCandle from "./ChartCandle";

interface IChart {
  coinId: string;
}

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

function Chart({ coinId }: IChart) {
  const lineMatch = useMatch("/:coinId/chart/chart-line");
  const candleMatch = useMatch("/:coinId/chart/chart-candle");

  return (
    <>
      <Tabs>
        <Tab isActive={lineMatch !== null}>
          <Link to={"./chart-line"}>line chart</Link>
        </Tab>
        <Tab isActive={candleMatch !== null}>
          <Link to={"./chart-candle"}>candle chart</Link>
        </Tab>
      </Tabs>
      <Routes>
        <Route
          path="chart-line"
          element={<ChartLine coinId={coinId!} />}
        ></Route>
        <Route
          path="chart-candle"
          element={<ChartCandle coinId={coinId!} />}
        ></Route>
      </Routes>
    </>
  );
}

export default Chart;
