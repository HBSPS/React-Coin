import { useQuery } from "@tanstack/react-query";
import { Routes, Route, useLocation, useParams, Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from 'react-helmet';
import { AiOutlineHome } from "react-icons/ai";
import { BsMoonStars, BsSun } from "react-icons/bs";

import Chart from "./Chart";
import Price from "./Price";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 8vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
    font-weight: bold;
    transition: color .2s ease-in-out;
`;

const GoHome = styled.div`
    display: block;
    background-color: ${(props) => props.theme.cardBgColor};
    border-radius: 10px;
    transition: background-color .2s ease-in-out;
    transition: color .2s ease-in-out;
    a {
        display: block;
        padding: 10px 20px;
    }
    &:hover {
        color: ${(props) => props.theme.accentColor};
        transition: color .2s ease-in-out;
    }
`;

const Loader = styled.div`
    text-align: center;
    display: block;
    padding-top: 50px;
    font-size: 50px;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 10px 20px;
  border-radius: 10px;
  transition: background-color .2s ease-in-out;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
  transition: color .2s ease-in-out;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 7px 0px;
  border-radius: 10px;
  transition: color .2s ease-in-out;
  font-weight: ${(props) =>
    props.isActive ? "bold" : "light"};
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
  &:hover {
    color: ${(props) => props.theme.accentColor};
    transition: color .2s ease-in-out;
  }
`;

const DarkToggle = styled.button`
    display: block;
    background-color: ${(props) => props.theme.cardBgColor};
    border-radius: 10px;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    color: ${(props) => props.theme.textColor};
    transition: background-color .2s ease-in-out;
    transition: color .2s ease-in-out;
    &:hover {
        color: ${(props) => props.theme.accentColor};
        transition: color .2s ease-in-out;
    }
`;

const Tool = styled.div`
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
    align-items: center;
`;

type RouteParams = {
    coinId: string;
};

interface RouteState {
    state: {
        name: string;
    }
};

interface InfoData {
    id: string ;
    name: string ;
    symbol: string ;
    rank: number ;
    is_new: boolean ;
    is_active: boolean ;
    type: string ;
    description: string ;
    message: string ;
    open_source: boolean ;
    started_at: string ;
    development_status: string ;
    hardware_wallet: boolean ;
    proof_type: string ;
    org_structure: string ;
    hash_algorithm: string ;
    first_data_at: string ;
    last_data_at: string ;
};

interface PriceData {
    id: string ;
    name: string ;
    symbol: string ;
    rank: number ;
    circulating_supply: number ;
    total_supply: number ;
    max_supply: number ;
    beta_value: number ;
    first_data_at: string ;
    last_updated: string ;
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
        }
    } ;
};

interface ICoinProps {
    isDark: boolean;
    toggleDark: () => void;
}

function Coin({isDark, toggleDark}: ICoinProps) {
    const { coinId } = useParams() as RouteParams;
    const { state } = useLocation() as RouteState;
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");
    const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId));
    const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(["tickers", coinId], () => fetchCoinTickers(coinId), { refetchInterval: 5000 });
    /* 
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState<InfoData>();
    const [priceInfo, setPriceInfo] = useState<PriceData>();
    useEffect(() => {
        (async () => {
            const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
            const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
            setInfo(infoData);
            setPriceInfo(priceData);
            setLoading(false);
        })();
    }, [coinId]); 
    */
    const loading = infoLoading || tickersLoading;
    return (
        <Container>
            <Helmet>
                <title>
                    {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
                </title>
            </Helmet>
            <Tool>
                <GoHome>
                    <Link to={"/"}><AiOutlineHome /></Link>
                </GoHome>
                <DarkToggle onClick={toggleDark}>{isDark ? <BsSun /> : <BsMoonStars />}</DarkToggle>
            </Tool>
            <Header>
                <Title>
                    {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
                </Title>
            </Header>
            {loading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank</span>
                            <span>{infoData?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol</span>
                            <span>${infoData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Price</span>
                            <span>${tickersData?.quotes?.USD?.price?.toFixed(3)}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{infoData?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Suply</span>
                            <span>{tickersData?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply</span>
                            <span>{tickersData?.max_supply}</span>
                        </OverviewItem>
                    </Overview>
                        
                    <Tabs>
                        <Tab isActive={chartMatch !== null}>
                            <Link to={`/${coinId}/chart`}>Chart</Link>
                        </Tab>
                        <Tab isActive={priceMatch !== null}>
                            <Link to={`/${coinId}/price`}>Price</Link>
                        </Tab>
                    </Tabs>

                    <Routes>
                        <Route path="chart" element={<Chart isDark={isDark} coinId={ coinId } />} />
                        <Route path="price" element={<Price coinId={ coinId } />} />
                    </Routes>
                </>
            )}
        </Container>
    );
};

export default Coin;