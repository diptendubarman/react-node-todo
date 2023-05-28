import LoginPage from "./components/LoginPage";
import TodoPage from "./components/TodoPage";
import { Routes, Route } from "react-router-dom";
import AuthenticatedRoute from "./AuthenticatedRoute";
import GeustRoute from "./GeustRoute";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <GeustRoute>
            <LoginPage />
          </GeustRoute>
        }
      />
      <Route
        path="/todo"
        element={
          <AuthenticatedRoute>
            <TodoPage />
          </AuthenticatedRoute>
        }
      />
    </Routes>
  );
}

export default App;
