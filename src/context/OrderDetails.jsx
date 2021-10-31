import { createContext, useContext, useState, useMemo } from "react";
import { pricePerItem } from "../constants";

const OrderDetails = createContext();

//create custom hook to check whether we're inside a provider
function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(
      "useOrderDetails must be used within an OrderDetailsProvider"
    );
  }

  return context;
}

function calculateSubtotal(optionType, optionCounts) {
  let optionCount = 0;
  for (let count of optionCounts[optionType].value()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[optionType];
}

function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const [totals, setTotals] = useState({
    scoops: 0,
    toppings: 0,
    grandTotal: 0,
  });
  //Whenever optionCounts change update totals
  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
    const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      scoops: scoopsSubtotal,
      toppings: toppingsSubtotal,
      grandTotal,
    });
  }, [optionCounts]);

  //useMemo will keep the value from being recalculated when it doesn't need to
  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      //don't mutate optionCounts
      const newOptionCounts = { ...optionCounts };

      //update option count for this item with the new value
      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionCounts);
    }

    //getter: object containing options counts for scoops and toppings, subtotal and totals
    //setter: updateOptionCount
    return [{ ...optionCounts }, updateItemCount];
  }, [optionCounts]);
  return <OrderDetails.Provider value={value} {...props} />;
}
