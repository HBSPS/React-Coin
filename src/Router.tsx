import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

interface IRouterProps {
    isDark: boolean;
    toggleDark: () => void;
};

function Router({toggleDark, isDark}: IRouterProps) {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<Coins toggleDark={toggleDark} isDark={isDark} />} />
                <Route path="/:coinId/*" element={<Coin toggleDark={toggleDark} isDark={isDark} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;