import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CompanyTable from '../components/CompanyTable';
import { getToken } from '../utils/auth';

function ViewData() {
  const [companies, setCompanies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filters, setFilters] = useState({});

  const fetchCompanies = async () => {
    const params = {
      page: currentPage,
      limit: 10,
      sortField,
      sortOrder,
      search,
      ...filters,
    };

    try {
      const res = await axios.get('https://company-search-engine-backend.onrender.com/api/companies', {
        params,
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setCompanies(res.data.companies);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCompanies();
    // eslint-disable-next-line
  }, [currentPage, sortField, sortOrder, search, filters]);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Companies</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 py-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <CompanyTable
        companies={companies}
        setSortField={setSortField}
        setSortOrder={setSortOrder}
        sortField={sortField}
        sortOrder={sortOrder}
        setFilters={setFilters}
      />
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ViewData;
