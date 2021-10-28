import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

/*  
Write tests to ensure that
○ Checkbox is unchecked by default
○ Checking checkbox enables button
○ Unchecking checkbox again disables button
*/

test("Checkbox is unchecked by default", () => {
  render(<SummaryForm />);

  //find element
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  //expect checkbox unchecked by default
  expect(checkbox).not.toBeChecked();
  //find element
  const button = screen.getByRole("button", { name: "Confirm order" });
  expect(button).toBeDisabled();
});

test("Checking checkbox enables button on first click and disable on second click", () => {
  render(<SummaryForm />);

  //find elements
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  const button = screen.getByRole("button", { name: "Confirm order" });
  //check checkbox
  fireEvent.click(checkbox);
  //expect checkbox enables button
  expect(button).toBeEnabled();

  fireEvent.click(checkbox);
  //expect checkbox enables button
  expect(button).toBeDisabled();
});
