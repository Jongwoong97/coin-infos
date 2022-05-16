import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { ToggleButton } from "../components/ToggleButton";

export const Container = styled.div`
  padding: 0px 20px;
`;
export const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoinList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Coin = styled.li`
  background-color: ${(props) => props.theme.tileColor};
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 15px;
  width: 375px;

  a {
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
  position: relative;
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export const Loader = styled.span`
  text-align: center;
  font-size: 24px;
  display: block;
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

function Coins() {
  // const [coins, setCoins] = useState([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   async function CallAPI() {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   }
  //   CallAPI();
  // }, []);
  const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins);
  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>
          Coins <ToggleButton rightPosition="-130px" />
        </Title>
      </Header>
      {isLoading ? (
        <Loader>"Loading..."</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin: CoinInterface) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name, id: "2" }}>
                <Img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                />
                {coin.name}&rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
