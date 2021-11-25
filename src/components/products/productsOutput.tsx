import React from "react";
import "./productsOutput.css";
import ProductItem from "./productItem";
import { Game } from "../../types/types";

interface POProps {
  productList: Array<Game>;
}

const ProductsOutput: React.FC<POProps> = ({ productList }) => (
  <div className="productsOutput__results-container">
    {productList.length === 0 ? (
      <p>no results...</p>
    ) : (
      productList.map(({ id, title, developer, date, category }) => (
        <ProductItem key={id} title={title} developer={developer} date={date} category={category} />
      ))
    )}
  </div>
);

export default ProductsOutput;
