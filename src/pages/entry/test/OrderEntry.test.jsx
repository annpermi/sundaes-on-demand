import { render, screen, waitFor } from "@testing-library/react";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";

test.only("handles errors for scoop and toppings routes", async () => {
  //Override Mock Service Worker response for individual tests
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);

  await waitFor(async () => {
    const alert = await screen.findAllByRole(
      "alert" /* {
    name: "An unexpected error occur. Please try again later.",
  } */
    );
    expect(alert).toHaveLength(2);
  });
});