import { BrowserRouter, Route, Routes } from "react-router-dom";
import JsPlayer from './pages/jsPlayer';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/jsPlayer" element={<JsPlayer/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
