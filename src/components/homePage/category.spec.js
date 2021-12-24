import React from "react";
// import { shallow } from "enzyme";
import Category from "./category";

// eslint-disable-next-line no-undef, react/jsx-filename-extension
const setUp = () => shallow(<Category title="hello" icon="hi" path="/products/pc" />);

describe("Category component tests:", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("- Snapshot test", () => {
    expect(component).toMatchSnapshot();
  });
});
