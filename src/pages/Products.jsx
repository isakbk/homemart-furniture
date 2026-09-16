import { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import ProductFilters from "../components/ProductFilters";

export default function Products() {
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "all",
    material: "all",
    color: "all",
    maxPrice: 1500,
  });

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.categoryName.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        filters.category === "all" ||
        product.category === filters.category;

      const matchesMaterial =
        filters.material === "all" ||
        product.material === filters.material;

      const matchesColor =
        filters.color === "all" || product.color === filters.color;

      const matchesPrice = product.price <= filters.maxPrice;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMaterial &&
        matchesColor &&
        matchesPrice
      );
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [filters, search, sort]);

  const clearFilters = () => {
    setFilters({
      category: "all",
      material: "all",
      color: "all",
      maxPrice: 1500,
    });
    setSearch("");
    setSort("featured");
  };

  return (
    <main>
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">OUR COLLECTION</span>
          <h1>Shop Furniture & Decor</h1>
          <p>
            Discover pieces designed to make your everyday moments beautiful.
          </p>
        </div>
      </section>

      <section className="section products-section">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link> / Shop
          </div>

          <div className="products-toolbar">
            <div className="search-box">
              <Search size={19} />
              <input
                type="search"
                placeholder="Search furniture..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button onClick={() => setSearch("")}>
                  <X size={17} />
                </button>
              )}
            </div>

            <div className="toolbar-right">
              <span>{filteredProducts.length} Products</span>

              <button
                className="filter-mobile-btn"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={18} /> Filters
              </button>

              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="featured">Sort: Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          <div className="products-layout">
            <div className={showFilters ? "filters-wrapper open" : "filters-wrapper"}>
              <ProductFilters
                filters={filters}
                setFilters={setFilters}
                clearFilters={clearFilters}
              />
            </div>

            <div className="products-results">
              {filteredProducts.length > 0 ? (
                <div className="product-grid">
                  {filteredProducts.map((product) => (
                    <ProductCard product={product} key={product.id} />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <h3>No furniture found</h3>
                  <p>Try adjusting your search or filters.</p>
                  <button className="btn btn-primary" onClick={clearFilters}>
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}