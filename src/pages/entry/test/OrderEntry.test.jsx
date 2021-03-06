import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import userEvent from "@testing-library/user-event";

test("handles errors for scoop and toppings routes", async () => {
  //Override Mock Service Worker response for individual tests
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);

  await waitFor(async () => {
    const alert = await screen.findAllByRole(
      "alert" /* {
    name: "An unexpected error occur. Please try again later.",
  } */
    );
    expect(alert).toHaveLength(2);
  });
});

test("Disable Order Button if No Scoops Ordered", async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />);
  let grandTotalButton = screen.getByRole("button", {
    name: /order sundae/i,
  });
  // userEvent.click(grandTotalButton)
  expect(grandTotalButton).toBeDisabled();

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(grandTotalButton).toBeEnabled();
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "0");
  expect(grandTotalButton).toBeDisabled();
});
