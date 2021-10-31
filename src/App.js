import "./App.css";
import SummaryForm from "./pages/summary/SummaryForm";
import Options from "./pages/entry/Options";
import OrderEntry from "./pages/entry/OrderEntry";

function App() {
  return (
    <div className="App">
      <OrderEntry />
      {/* <Options /> */}
      <SummaryForm />
    </div>
  );
}

export default App;
