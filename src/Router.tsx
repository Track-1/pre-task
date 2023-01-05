import { BrowserRouter, Route, Routes } from "react-router-dom";
import JsPlayer from './pages/jsPlayer';
import JyPlayer from "./pages/jyPlayer";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/jsPlayer" element={<JsPlayer/>}></Route>
        <Route path="/jyPlayer" element={<JyPlayer />} />
      </Routes>
    </BrowserRouter>
  );
}
