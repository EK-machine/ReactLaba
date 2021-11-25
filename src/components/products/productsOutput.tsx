import React from "react";
import "./productsOutput.css";
import ProductItemLine from "./productItemline";
import { ProductItemProps } from "../../types/types";

interface POProps {
  productList: Array<ProductItemProps>;
}

const ProductsOutput: React.FC<POProps> = ({ productList }) => (
  <div className="productsOutput__results-container">
    {productList.length === 0 ? (
      <p>no results...</p>
    ) : (
      productList.map(({ id, title, developer, date, category }) => (
        <ProductItemLine key={id} title={title} developer={developer} date={date} category={category} />
      ))
    )}
  </div>
);

export default ProductsOutput;
