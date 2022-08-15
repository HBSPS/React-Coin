import { useQuery } from "@tanstack/react-query";
import ApexChart from 'react-apexcharts';
import { fetchCoinHistory } from "../api";

interface IHistoryData {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}

interface ChartProps {
    coinId: string;
};

function Chart({ coinId }: ChartProps) {
    const { isLoading, data } = useQuery<IHistoryData[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId), { refetchInterval: 10000 });
    return (
        <>
            {isLoading ? "Loading..." :
                <>
                    <ApexChart type="line" series={[
                            {
                                name: "Price",
                                data: data?.map((price) => parseFloat(price.close)) ?? []
                            }
                        ]} options={{
                            theme: { mode: "dark" },
                            chart: { height: 500, width: 500, toolbar: {show: false}, background: "transparent" },
                            stroke: { curve: "smooth", width: 5 },
                            grid: { show: false },
                            yaxis: { show: false },
                            xaxis: {
                                labels: { show: false, datetimeFormatter: {month: "mmm"} },
                                type: "datetime",
                                axisTicks: { show: false },
                                axisBorder: { show: false },
                                categories: data?.map(price => (price.time_close * 1000))
                            },
                            fill: { type: "gradient", gradient: { gradientToColors: ["#ffeaa7"], stops: [0, 100] } },
                            colors: ["#4ECDC4"],
                            tooltip: { y: { formatter: (value) => `$${value.toFixed(2)}` } },
                        }}
                    />
                    <ApexChart type="candlestick" series={[
                            {
                                data: data?.map((price) => {return {x: new Date(price.time_close * 1000), y: [parseFloat(price.open).toFixed(2), parseFloat(price.high).toFixed(2), parseFloat(price.low).toFixed(2), parseFloat(price.close).toFixed(2)]}}) ?? []
                            }
                        ]} options={{
                            theme: { mode: "dark" },
                            chart: { height: 500, width: 500, toolbar: {show: false}, background: "transparent" },
                            plotOptions: { candlestick: { colors: { upward: "#4ECDC4", downward: "#ffeaa7" } } },
                            grid: { show: true },
                            yaxis: { show: false },
                            xaxis: {
                                labels: { show: false, datetimeFormatter: {month: "mmm"} },
                                type: "datetime",
                                axisTicks: { show: false },
                                axisBorder: { show: false },
                            },
                        }}
                    />
                </>
            }
        </>
    )
};

export default Chart;