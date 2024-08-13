import React from 'react';

function CompanyTable({ companies, setSortField, setSortOrder, sortField, sortOrder, setFilters }) {
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const headers = [
    { label: 'ID', field: 'id' },
    { label: 'Entity', field: 'entity' },
    { label: 'Sector', field: 'sector' },
    { label: 'Email', field: 'email' },
    { label: 'Incorporation', field: 'incorporation' },
    { label: 'Address', field: 'address' },
    { label: 'Revenue (M)', field: 'revenue' },
    { label: 'Website', field: 'website' },
    { label: 'Verified', field: 'is_verified' },
  ];

  return (
    <table className="w-full bg-white border rounded shadow">
      <thead>
        <tr>
          {headers.map((header) => (
            <th
              key={header.field}
              className="px-4 py-2 border-b cursor-pointer"
              onClick={() => handleSort(header.field)}
            >
              <div className="flex items-center">
                {header.label}
                {sortField === header.field && (
                  <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                )}
              </div>
              <input
                type="text"
                placeholder="Filter..."
                className="w-full px-2 py-1 mt-1 border rounded"
                onChange={(e) => handleFilterChange(header.field, e.target.value)}
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {companies.map((company) => (
          <tr key={company._id} className="hover:bg-gray-100">
            <td className="px-4 py-2 border-b">{company.id}</td>
            <td className="px-4 py-2 border-b">{company.entity}</td>
            <td className="px-4 py-2 border-b">{company.sector}</td>
            <td className="px-4 py-2 border-b">{company.email}</td>
            <td className="px-4 py-2 border-b">
              {new Date(company.incorporation).toLocaleDateString()}
            </td>
            <td className="px-4 py-2 border-b">{company.address}</td>
            <td className="px-4 py-2 border-b">{company.revenue}</td>
            <td className="px-4 py-2 border-b">
              <a href={company.website} className="text-blue-500 underline" target="_blank" rel="noreferrer">
                {company.website}
              </a>
            </td>
            <td className="px-4 py-2 border-b">{company.is_verified ? 'Yes' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CompanyTable;
