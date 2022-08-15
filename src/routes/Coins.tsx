import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { BsMoonStars, BsSun } from "react-icons/bs";

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

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: ${(props) => props.theme.cardBgColor};
    color: ${(props) => props.theme.textColor};
    margin-bottom: 10px;
    border-radius: 15px;
    transition: background-color .2s ease-in-out;
    a {
        display: flex;
        align-items: center;
        transition: color .2s ease-in;
        padding: 20px;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;

const Tool = styled.div`
    display: flex;
    margin-top: 20px;
    align-items: center;
    justify-content: right;
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
    font-weight: bold;
    transition: color .2s ease-in-out;
`;

const Loader = styled.div`
    text-align: center;
    display: block;
    padding-top: 50px;
    font-size: 50px;
`;

const Img = styled.img`
    height: 30px;
    width: 30px;
    margin-right: 10px;
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

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string
};

interface ICoinProps {
    toggleDark: () => void;
    isDark: boolean;
};

function Coins({toggleDark, isDark}: ICoinProps) {
    const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);
    /* 
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const response = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            setCoins(json.slice(0, 100));
            setLoading(false);
        })();
    }, []); 
    */
    return (
        <Container>
            <Helmet>
                <title>
                    Coins
                </title>
            </Helmet>
            <Tool>
                <DarkToggle onClick={toggleDark}>{isDark ? <BsSun />  : <BsMoonStars />}</DarkToggle>
            </Tool>
            <Header>
                <Title>Coins</Title>
            </Header>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <CoinsList>
                    {data?.slice(0, 100).map((coin) => (
                        <Coin key={coin.id}>
                            <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />{coin.name} &rarr;
                            </Link>
                        </Coin>
                    ))}
                </CoinsList>
            )}
        </Container>
    );
};

export default Coins;