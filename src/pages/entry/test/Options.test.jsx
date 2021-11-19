import { render, screen } from "../../../test-utils/testing-library-utils";

import Options from "../Options";

test("Displays image for each scoop from the server", async () => {
  render(<Options optionType="scoops" />);

  //find the images
  //$ - indicates that its at the end of the string, i - case sensitive
  //when you get async elements appearing in the DOM, you need await and find them
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  //confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("Display image for each topping from the server", async () => {
  render(<Options optionType="toppings" />);

  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  const imageTitles = toppingImages.map((el) => el.alt);
  expect(imageTitles).toEqual([
    "M&Ms topping",
    "Cherries topping",
    "Hot fudge topping",
  ]);
});
