import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Japan } from "./pages/Japan";

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Japan></Japan>}></Route>
      </Routes>
    </BrowserRouter>
  );
};
