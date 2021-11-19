import { Container } from "react-bootstrap";
import SummaryForm from "./pages/summary/SummaryForm";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

function App() {
  return (
    <div className="App">
      <Container>
        <OrderDetailsProvider>
          <OrderEntry />
          <SummaryForm />
        </OrderDetailsProvider>
        {/* Confirmation page does not need a provider */}
      </Container>
    </div>
  );
}

export default App;
