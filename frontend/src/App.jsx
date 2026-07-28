import AppRoutes from "./routes/AppRoutes";
import GlobalLoader from "./components/common/GlobalLoader";

function App() {
  return (
    <>
      <GlobalLoader />
      <AppRoutes />
    </>
  );
}

export default App;
