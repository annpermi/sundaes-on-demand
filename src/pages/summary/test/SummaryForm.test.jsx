import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  userEvent.click(checkbox);
  //expect checkbox enables button
  expect(button).toBeEnabled();

  userEvent.click(checkbox);
  //expect checkbox enables button
  expect(button).toBeDisabled();
});

//async update going on
test("popover responds to hover", async () => {
  render(<SummaryForm />);

  //popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  ); //case sensetive
  expect(nullPopover).not.toBeInTheDocument();

  //popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument(); //makes code readable

  //popover disappears when we mouse out
  userEvent.unhover(termsAndConditions);

  //Resolve error React state updates should be wrapped into act(...): - add async and await
  // const nullPopoverAgain = screen.queryByText(
  //   /no ice cream will actually be delivered/i
  // );
  // expect(nullPopoverAgain).not.toBeInTheDocument();
  await waitForElementToBeRemoved(
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
