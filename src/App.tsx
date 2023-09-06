import React, { ReactNode } from "react";

interface ProductRowProps {
    productName: string;
    productPrice: string;
}

const ProductRow = ({ productName, productPrice }: ProductRowProps) => {
    return (
        <tr>
            <td>{productName}</td>
            <td>{productPrice}</td>
        </tr>
    );
};

interface ProductCategoryProps {
    productCategory: string;
}

const ProductCategoryRow = ({ productCategory }: ProductCategoryProps) => {
    return (
        <tr>
            <th colSpan={2}>{productCategory}</th>
        </tr>
    );
};

interface Product {
    productCategory: string;
    productName: string;
    productPrice: string;
    stocked: boolean;
}

interface ProductTableProps {
    products: Product[];
}

const ProductTable = ({ products }: ProductTableProps) => {
    const rows: ReactNode[] = [];
    let lastCategory = "";

    products.forEach((product) => {
        if (product.productCategory !== lastCategory) {
            rows.push(
                <ProductCategoryRow
                    productCategory={product.productCategory}
                    key={product.productCategory}
                />
            );
            lastCategory = product.productCategory;
        }

        rows.push(
            <ProductRow
                productName={product.productName}
                productPrice={product.productPrice}
            />
        );
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                {rows}
            </thead>
        </table>
    );
};

const SearchBar = () => {
    return (
        <form>
            <input type="text" placeholder="Search..." />
            <label>
                <input type="checkbox" /> Only Show products in stock
            </label>
        </form>
    );
};

const FilterableProductTable = ({ products }: ProductTableProps) => {
    return (
        <div>
            <SearchBar />
            <ProductTable products={products} />
        </div>
    );
};

const products: Product[] = [
    {
        productCategory: "Fruits",
        productPrice: "$1",
        stocked: true,
        productName: "Apple",
    },
    {
        productCategory: "Fruits",
        productPrice: "$1",
        stocked: true,
        productName: "Dragonfruit",
    },
    {
        productCategory: "Fruits",
        productPrice: "$2",
        stocked: false,
        productName: "Passionfruit",
    },
    {
        productCategory: "Vegetables",
        productPrice: "$2",
        stocked: true,
        productName: "Spinach",
    },
    {
        productCategory: "Vegetables",
        productPrice: "$4",
        stocked: false,
        productName: "Pumpkin",
    },
    {
        productCategory: "Vegetables",
        productPrice: "$1",
        stocked: true,
        productName: "Peas",
    },
];

const App = () => {
    return <FilterableProductTable products={products} />;
};

export default App;
