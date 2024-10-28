import { render } from "@testing-library/react";
import { Button } from "./button";

describe("primary button", () => {
  it("should match snapshot", () => {
    const { container } = render(<Button>Primary</Button>);
    expect(container).toMatchSnapshot();
  });
});
