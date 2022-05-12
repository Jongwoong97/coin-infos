import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coin from "./Coin";
import Coins from "./Coins";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Coins />}></Route>
        <Route path="/:coinId/*" element={<Coin />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
