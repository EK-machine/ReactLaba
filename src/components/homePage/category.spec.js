import React from "react";
// import { shallow } from "enzyme";
import Category from "./category";

// eslint-disable-next-line no-undef, react/jsx-filename-extension
const setUp = () => shallow(<Category title="hello" icon="hi" path="/products/pc" />);

describe("should be rendered in category component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("should contain .category-container wrapper", () => {
    const wrapper = component.find(".category__container");
    expect(wrapper.length).toBe(1);
  });

  it("should contain div tag", () => {
    const wrapper = component.find("div");
    expect(wrapper.length).toBe(3);
  });

  it("is first snapshot test", () => {
    expect(component).toMatchSnapshot();
  });
});
