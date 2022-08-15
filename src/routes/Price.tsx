import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";

interface ChartProps {
    coinId: string;
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

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 4fr);
    margin: 25px 0px;
    gap: 10px;
    max-width: 480px;
`;

const Content = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    background-color: ${(props) => props.theme.cardBgColor};
    transition: background-color .2s ease-in-out;
    span {
        text-align: center;
        display: block;
        padding: 10px;
        transition: color .2s ease-in-out;
    }
    span:last-child {
        color: ${(props) => props.theme.accentColor};
        font-weight: bold;
        transition: color .2s ease-in-out;
    }
`;

function Price({ coinId }: ChartProps) {
    const { isLoading, data } = useQuery<PriceData>(["price", coinId], () => fetchCoinTickers(coinId));
    return (
        <>
            {isLoading ? "Loading..." :
                <>
                    <Container>
                        <Content>
                            <span>24시간 거래량: </span>
                            <span>{data?.quotes.USD.volume_24h.toFixed(0)}</span>
                        </Content>
                        <Content>
                            <span>24시간 거래량 변화: </span>
                            <span>{data?.quotes.USD.volume_24h_change_24h}%</span>
                        </Content>
                        <Content>
                            <span>1시간 변화율: </span>
                            <span>{data?.quotes.USD.percent_change_1h}%</span>
                        </Content>
                        <Content>
                            <span>6시간 변화율: </span>
                            <span>{data?.quotes.USD.percent_change_6h}%</span>
                        </Content>
                        <Content>
                            <span>12시간 변화율: </span>
                            <span>{data?.quotes.USD.percent_change_12h}%</span>
                        </Content>
                        <Content>
                            <span>24시간 변화율: </span>
                            <span>{data?.quotes.USD.percent_change_24h}%</span>
                        </Content>
                    </Container>
                </>
            }
        </>
    )
};

export default Price;