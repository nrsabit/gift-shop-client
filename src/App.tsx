import "./App.css";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./layouts/ProtectedRoute";

function App() {
  return (
    <ProtectedRoute>
      <MainLayout></MainLayout>
    </ProtectedRoute>
  );
}

export default App;
