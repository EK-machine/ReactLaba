import React, { useEffect, useState } from "react";
import "./productspage.css";
import { useParams } from "react-router-dom";
import ProductsOutput from "./productsOutput";
import { Game } from "./searchBar";

interface RouteParams {
  id: string;
}

const startFetchUrl = "http://localhost:3000/games";

const ProductsPage: React.FC = () => {
  const [categoryList, setCategoryList] = useState<Array<Game>>([]);

  const { id } = useParams<RouteParams>();

  useEffect(() => {
    async function fetchOnId() {
      const startFetch = await fetch(startFetchUrl);
      const startFetchJson: Array<Game> = await startFetch.json();
      const categoryFiltered = startFetchJson.filter(({ category }) => category.toLowerCase().includes(id));

      setCategoryList(categoryFiltered);
      console.log(categoryFiltered);
    }
    fetchOnId();
  }, [id]);

  return (
    <div className="productsPage__container">
      <p>Here are listed products on {id.toLocaleUpperCase()} category:</p>
      <ProductsOutput productList={categoryList} />
    </div>
  );
};

export default ProductsPage;
