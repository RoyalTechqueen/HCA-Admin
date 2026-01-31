import { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, Clock } from 'lucide-react';

const Products = () => {
  const [filter, setFilter] = useState({
    name: '',
    company: '',
    dateFrom: '',
    dateTo: '',
    status: '',
  });

  const [products] = useState([
    { id: 1, name: 'Smart Device v2', company: 'TechCorp Inc.', category: 'Electronics', submittedDate: '2024-01-15', status: 'Pending' },
    { id: 2, name: 'Solar Panel X', company: 'Green Solutions', category: 'Renewable Energy', submittedDate: '2024-01-14', status: 'Approved' },
    { id: 3, name: 'Medical Scanner', company: 'BioMed Labs', category: 'Medical Devices', submittedDate: '2024-01-13', status: 'Rejected' },
    { id: 4, name: 'Organic Snacks', company: 'FoodSafe Inc.', category: 'Food & Beverage', submittedDate: '2024-01-12', status: 'Approved' },
    { id: 5, name: 'IoT Gateway', company: 'TechCorp Inc.', category: 'Electronics', submittedDate: '2024-01-11', status: 'Pending' },
    { id: 6, name: 'Solar Inverter', company: 'Solar Energy Ltd', category: 'Renewable Energy', submittedDate: '2024-01-10', status: 'Approved' },
  ]);

  const handleApprove = (productId) => {
    console.log('Approve product:', productId);
    alert(`Product #${productId} approved!`);
  };

  const handleReject = (productId) => {
    console.log('Reject product:', productId);
    alert(`Product #${productId} rejected!`);
  };

  const filteredProducts = products.filter(product => {
    if (filter.name && !product.name.toLowerCase().includes(filter.name.toLowerCase())) return false;
    if (filter.company && !product.company.toLowerCase().includes(filter.company.toLowerCase())) return false;
    if (filter.dateFrom && product.submittedDate < filter.dateFrom) return false;
    if (filter.dateTo && product.submittedDate > filter.dateTo) return false;
    if (filter.status && product.status !== filter.status) return false;
    return true;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <p className="text-gray-600 mt-2">Review and approve product submissions</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search product..."
                className="pl-10 w-full rounded-lg border border-gray-300 px-3 py-2"
                value={filter.name}
                onChange={(e) => setFilter({ ...filter, name: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search company..."
                className="pl-10 w-full rounded-lg border border-gray-300 px-3 py-2"
                value={filter.company}
                onChange={(e) => setFilter({ ...filter, company: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date From</label>
            <input
              type="date"
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              value={filter.dateFrom}
              onChange={(e) => setFilter({ ...filter, dateFrom: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date To</label>
            <input
              type="date"
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              value={filter.dateTo}
              onChange={(e) => setFilter({ ...filter, dateTo: e.target.value })}
            />
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <button 
            onClick={() => setFilter({ name: '', company: '', dateFrom: '', dateTo: '', status: '' })}
            className="flex items-center text-[#00853b] hover:text-green-700"
          >
            <Filter className="w-4 h-4 mr-2" />
            Clear Filters
          </button>
          <select
            className="rounded-lg border border-gray-300 px-3 py-2"
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4">#{product.id}</td>
                  <td className="px-6 py-4 font-medium">{product.name}</td>
                  <td className="px-6 py-4">{product.company}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{product.submittedDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full flex items-center w-fit ${
                      product.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      product.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.status === 'Pending' && <Clock className="w-3 h-3 mr-1" />}
                      {product.status === 'Approved' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {product.status === 'Rejected' && <XCircle className="w-3 h-3 mr-1" />}
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      {product.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(product.id)}
                            className="px-3 py-1 bg-[#00853b] text-white text-sm rounded-lg hover:bg-green-700"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(product.id)}
                            className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button className="px-3 py-1 border border-gray-300 text-sm rounded-lg hover:bg-gray-50">
                        View Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;