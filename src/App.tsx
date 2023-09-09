import React, { ReactNode, useState } from "react";

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
    filterText: string;
    inStockOnly: boolean;
}

const ProductTable = ({
    products,
    filterText,
    inStockOnly,
}: ProductTableProps) => {
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

        if (!product.stocked && inStockOnly) {
            return;
        }

        if (
            filterText !== "" &&
            !product.productCategory
                .toLowerCase()
                .includes(filterText.toLowerCase()) &&
            !product.productName
                .toLowerCase()
                .includes(filterText.toLowerCase())
        ) {
            return;
        }

        rows.push(
            <ProductRow
                productName={product.productName}
                productPrice={product.productPrice}
                key={product.productName}
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

interface SearchBarProps {
    filterText: string;
    inStockOnly: boolean;
    onFilterTextChange: React.Dispatch<React.SetStateAction<string>>;
    onInStockOnlyChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar = ({
    filterText,
    inStockOnly,
    onFilterTextChange,
    onInStockOnlyChange,
}: SearchBarProps) => {
    return (
        <form>
            <input
                type="text"
                placeholder="Search..."
                value={filterText}
                onChange={(event) => onFilterTextChange(event.target.value)}
            />
            <label>
                <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(event) =>
                        onInStockOnlyChange(event.target.checked)
                    }
                />{" "}
                Only Show products in stock
            </label>
        </form>
    );
};

const FilterableProductTable = ({ products }: { products: Product[] }) => {
    const [filterText, setFilterText] = useState("");
    const [inStockOnly, setInStockOnly] = useState(false);

    return (
        <div>
            <SearchBar
                filterText={filterText}
                inStockOnly={inStockOnly}
                onFilterTextChange={setFilterText}
                onInStockOnlyChange={setInStockOnly}
            />
            <ProductTable
                products={products}
                filterText={filterText}
                inStockOnly={inStockOnly}
            />
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
