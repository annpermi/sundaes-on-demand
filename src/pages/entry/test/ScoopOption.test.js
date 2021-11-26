import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ScoopOptions from "../ScoopOption";

test("Red Input Box for Invalid Scoop Count", async () => {
  //give a mock function updateItemCount={jest.fn()}, test will fail if this is not here
  render(<ScoopOptions name="" imagePath="" updateItemCount={jest.fn()} />);

  //don't need an await and name for input, because it's getting populating from the props, not from server
  //expect input to be negative
  const vanillaInput = screen.getByRole("spinbutton");
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "-1");
  //box turns red
  expect(vanillaInput).toHaveClass("is-invalid");

  //pass
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "3");
  expect(vanillaInput).not.toHaveClass("is-invalid");
});
