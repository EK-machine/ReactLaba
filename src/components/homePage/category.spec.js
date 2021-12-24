/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from "react";
import Category from "./category";

const props = {
  title: "hello",
  icon: "hi",
  path: "/products/pc",
};

describe("Category component tests:", () => {
  it("- Snapshot test", () => {
    const component = shallow(<Category {...props} />);
    expect(component).toMatchSnapshot();
  });

  describe("- Has prop title", () => {
    it("- Should render title", () => {
      const component = shallow(<Category {...props} />);
      const title = component.find(".category__title");
      expect(title.length).toBe(1);
    });

    it("- Expected output of title shall be 'hello'", () => {
      const component = shallow(<Category {...props} />);
      const title = component.find(".category__title");
      expect(title.text()).toBe("hello");
    });
  });
});
