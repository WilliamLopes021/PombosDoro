import { Routes, Route, BrowserRouter } from "react-router";
import Home from "../../pages/Home/index.tsx";
import NotFound from "../../pages/NotFound/index.tsx";

export function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
