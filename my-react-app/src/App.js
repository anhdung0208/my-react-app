import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/main-layout/MainLayout";
import Home from "./features/home/pages/Home";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default App;
