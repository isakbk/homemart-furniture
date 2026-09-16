export default function ProductFilters({
  filters,
  setFilters,
  clearFilters,
}) {
  const update = (key, value) => {
    setFilters((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  return (
    <aside className="filters">
      <div className="filter-header">
        <h3>Filters</h3>
        <button onClick={clearFilters}>Clear All</button>
      </div>

      <div className="filter-group">
        <label>Category</label>

        <select
          value={filters.category}
          onChange={(e) => update("category", e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="living-room">Living Room</option>
          <option value="bedroom">Bedroom</option>
          <option value="dining">Dining & Kitchen</option>
          <option value="office">Office & Decor</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Material</label>

        <select
          value={filters.material}
          onChange={(e) => update("material", e.target.value)}
        >
          <option value="all">All Materials</option>
          <option value="Wood">Wood</option>
          <option value="Fabric">Fabric</option>
          <option value="Velvet">Velvet</option>
          <option value="Mesh">Mesh</option>
          <option value="Metal">Metal</option>
          <option value="Cotton">Cotton</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Color</label>

        <select
          value={filters.color}
          onChange={(e) => update("color", e.target.value)}
        >
          <option value="all">All Colors</option>
          <option value="Beige">Beige</option>
          <option value="Brown">Brown</option>
          <option value="Green">Green</option>
          <option value="Natural">Natural</option>
          <option value="White">White</option>
          <option value="Gray">Gray</option>
          <option value="Cream">Cream</option>
          <option value="Black">Black</option>
          <option value="Gold">Gold</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Maximum Price</label>

        <input
          type="range"
          min="100"
          max="1500"
          step="50"
          value={filters.maxPrice}
          onChange={(e) => update("maxPrice", Number(e.target.value))}
        />

        <div className="price-range">
          <span>$100</span>
          <strong>${filters.maxPrice}</strong>
        </div>
      </div>
    </aside>
  );
}