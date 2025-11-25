import React from "react";

const SearchBar: React.FC = () => {
  return (
    <form className="d-flex input-group w-auto">
      <input
        type="search"
        className="form-control"
        placeholder="Buscar..."
        aria-label="Search"
      />
      <button className="btn btn-outline-light" type="submit">
        <i className="fas fa-search"></i>
      </button>
    </form>
  );
};

export default SearchBar;