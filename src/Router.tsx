import { BrowserRouter, Route, Routes } from "react-router-dom";
import JyPlayer from "./pages/jyPlayer";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/jyPlayer" element={<JyPlayer />} />
      </Routes>
    </BrowserRouter>
  );
}
