export default function FilterBar({ filters, setFilters }) {
  return (
    <div className="grid gap-3 rounded-xl bg-white p-4 shadow sm:grid-cols-2 lg:grid-cols-5">
      <input
        placeholder="Search lipstick..."
        className="rounded border border-pink-200 px-3 py-2"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />
      <input
        placeholder="Color"
        className="rounded border border-pink-200 px-3 py-2"
        value={filters.color}
        onChange={(e) => setFilters({ ...filters, color: e.target.value })}
      />
      <input
        placeholder="Brand"
        className="rounded border border-pink-200 px-3 py-2"
        value={filters.brand}
        onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
      />
      <input
        type="number"
        placeholder="Min price"
        className="rounded border border-pink-200 px-3 py-2"
        value={filters.minPrice}
        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
      />
      <input
        type="number"
        placeholder="Max price"
        className="rounded border border-pink-200 px-3 py-2"
        value={filters.maxPrice}
        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
      />
    </div>
  );
}
