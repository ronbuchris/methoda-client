import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";

const App = () => {
  return (
    <>
      <div className="app-container">
        <BrowserRouter>
          <main>
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.element />}
                />
              ))}
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
