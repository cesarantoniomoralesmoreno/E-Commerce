import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getProductsByQuery } from "../functions/fetcher";
import CategoryProduct from "./categoryProduct";

const SearchResults = () => {
    const [products, setProducts] = React.useState({
        errorMessage: "",
        data: [],
    });

    const [searchParams] = useSearchParams();
    const query = searchParams.get("s");

    useEffect(() => {
        const fetchData = async () => {
            const responseObject = await getProductsByQuery(query);
            setProducts(responseObject);
        };
        fetchData();
    }, [query]);

    // Filtrar los productos según el término de búsqueda (query)
    const filteredProducts = products.data.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
    );

    const renderProducts = () => {
        if (filteredProducts.length > 0) {
            return filteredProducts.map((p) => (
                <CategoryProduct key={p.id} {...p}>
                    {p.title}
                </CategoryProduct>
            ));
        } else {
            return <div>No results found</div>;
        }
    };

    return (
        <div>
            {products.errorMessage && <div>Error: {products.errorMessage}</div>}
            {renderProducts()}
        </div>
    );
};

export default SearchResults;
