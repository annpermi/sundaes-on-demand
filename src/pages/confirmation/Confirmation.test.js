import { render, screen } from "../../test-utils/testing-library-utils";
import Confirmation from "./Confirmation";
import { server } from "../../mocks/server";
import { rest } from "msw";

test("Server Error when Submitting Order", async () => {
  //override default msw response from options endpoint with error response
  server.resetHandlers(
    rest.post(`http://localhost:3030/order`, (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<Confirmation setOrderPhase={jest.fn()} />);

  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent(
    "An unexpected error occur. Please try again later."
  );
});
