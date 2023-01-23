import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Home/Home";
import LogInPage from "./Login/LogInPage";
import RegisterPage from "./RegisterPage/RegisterPage";
import ResetPage from "./ResetPage/ResetPage";

const PageRoutes = () => {
  const location = useLocation();
  return (
    <Routes key={location}>
      <Route path="/" element={<LogInPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/reset" element={<ResetPage />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};
export default PageRoutes;
