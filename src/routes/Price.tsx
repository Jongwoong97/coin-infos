import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinHistory, fetchCoinTickers } from "../api";
import { Loader } from "./Coins";

interface IPrice {
  coinId: string;
}

const SummaryBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
`;

const Summary = styled.h1`
  text-transform: uppercase;
  margin-left: 10px;
  font-size: 22px;
  font-weight: 600;
`;

const Contents = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
`;

const ContentName = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
  color: #ffdd59;
`;

const ContentValue = styled.h1<{ sign?: boolean }>`
  display: block;
  color: ${(props) =>
    props.sign ? "blue" : props.sign === false ? "red" : props.theme.textColor};
`;

const Content = styled.li`
  width: 60vw;
  box-sizing: border-box;
  text-transform: uppercase;
  margin-left: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin: 10px 0px;
  gap: 5px;
`;

const Tab = styled.span<{ isData: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: ${(props) => (props.isData ? 400 : 600)};
  padding: 10px 0px;
  border-radius: 7px;
  color: ${(props) =>
    props.isData ? props.theme.textColor : props.theme.bgColor};
  background-color: ${(props) =>
    props.isData ? props.theme.bgColor : props.theme.textColor};
`;

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
interface ITicker {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Price({ coinId }: IPrice) {
  const { isLoading: isLoadingHistory, data: dataHistory } = useQuery<
    IHistory[]
  >(["Prices", coinId], () => fetchCoinHistory(coinId));
  const { isLoading: isLoadingTicker, data: dataTicker } = useQuery<ITicker>(
    ["Tickers", coinId],
    () => fetchCoinTickers(coinId)
  );
  return (
    <div>
      {isLoadingHistory ? (
        <Loader>"Loading price..."</Loader>
      ) : (
        <>
          <SummaryBox>
            <FontAwesomeIcon icon={faKey} size="2x" />
            <Summary>Summary</Summary>
          </SummaryBox>
          <Contents>
            <Content>
              <ContentName>Ath price</ContentName>
              <ContentValue>
                {dataTicker?.quotes.USD.ath_price.toFixed(2) + " USD"}
              </ContentValue>
            </Content>
            <Content>
              <ContentName>Ath date</ContentName>
              <ContentValue>
                {new Date(
                  dataTicker?.quotes.USD.ath_date as string
                ).toLocaleDateString()}
              </ContentValue>
            </Content>
            <Content>
              <ContentName>Price change</ContentName>
              <ContentValue
                sign={(dataTicker?.quotes.USD.percent_change_24h as number) > 0}
              >
                {dataTicker?.quotes.USD.percent_change_24h.toString() + "%"}
              </ContentValue>
            </Content>
            <Content>
              <ContentName>Volume change</ContentName>
              <ContentValue
                sign={
                  (dataTicker?.quotes.USD.volume_24h_change_24h as number) > 0
                }
              >
                {dataTicker?.quotes.USD.volume_24h_change_24h.toString() + "%"}
              </ContentValue>
            </Content>
            <Content>
              <ContentName>Market cap change</ContentName>
              <ContentValue
                sign={
                  (dataTicker?.quotes.USD.market_cap_change_24h as number) > 0
                }
              >
                {dataTicker?.quotes.USD.market_cap_change_24h.toString() + "%"}
              </ContentValue>
            </Content>
          </Contents>
          <Tabs>
            <Tab isData={false}>date</Tab>
            <Tab isData={false}>open</Tab>
            <Tab isData={false}>high</Tab>
            <Tab isData={false}>low</Tab>
            <Tab isData={false}>close</Tab>
            <Tab isData={false}>volumn($M)</Tab>
          </Tabs>
          {dataHistory?.map((v) => (
            <Tabs>
              <Tab isData={true}>
                {new Date(v.time_close).toLocaleDateString()}
              </Tab>
              <Tab isData={true}>{v.open.toFixed(2)}</Tab>
              <Tab isData={true}>{v.high.toFixed(2)}</Tab>
              <Tab isData={true}>{v.low.toFixed(2)}</Tab>
              <Tab isData={true}>{v.close.toFixed(2)}</Tab>
              <Tab isData={true}>{(v.volume / 10 ** 6).toFixed(0)}</Tab>
            </Tabs>
          ))}
        </>
      )}
    </div>
  );
}

export default Price;
