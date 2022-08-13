import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from 'react-apexcharts';

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
    const { isLoading, data } = useQuery<IHistoryData[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
    return (
        <div>
            {isLoading ? "Loading..." :
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
                xaxis: { labels: { show: false }, axisTicks: { show: false }, axisBorder: { show: false } }
            }} />}
        </div>
    )
};

export default Chart;