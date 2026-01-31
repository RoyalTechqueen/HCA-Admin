import { useState } from 'react';
import { Search, Download, Eye, Calendar, Award, Filter, ChevronDown } from 'lucide-react';

const Certificates = () => {
  const [certificates] = useState([
    { id: 'CERT-001', company: 'Green Solutions', product: 'Solar Panel X', issueDate: '2024-01-01', expiryDate: '2025-01-01', status: 'Active' },
    { id: 'CERT-002', company: 'TechCorp Inc.', product: 'IoT Gateway', issueDate: '2023-12-15', expiryDate: '2024-12-15', status: 'Active' },
    { id: 'CERT-003', company: 'BioMed Labs', product: 'Medical Scanner', issueDate: '2023-11-20', expiryDate: '2024-11-20', status: 'Active' },
    { id: 'CERT-004', company: 'FoodSafe Inc.', product: 'Organic Snacks', issueDate: '2023-10-01', expiryDate: '2024-10-01', status: 'Active' },
    { id: 'CERT-005', company: 'Solar Energy Ltd', product: 'Solar Inverter', issueDate: '2023-09-15', expiryDate: '2024-09-15', status: 'Active' },
    { id: 'CERT-006', company: 'Old Tech Corp', product: 'Legacy Device', issueDate: '2022-12-01', expiryDate: '2023-12-01', status: 'Expired' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCertificates = certificates.filter(cert => {
    if (searchTerm && !cert.company.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !cert.product.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !cert.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (statusFilter !== 'all' && cert.status !== statusFilter) return false;
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Revoked': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 lg:p-8 pt-20 lg:pt-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Certificates</h1>
            <p className="text-gray-600 mt-1">Manage issued certificates</p>
          </div>
          <button className="px-4 py-2.5 bg-[#00853b] text-white rounded-lg hover:bg-green-700 font-medium transition-colors duration-200 inline-flex items-center justify-center">
            + Issue New Certificate
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search certificates by company, product, or ID..."
                className="pl-10 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-[#00853b] focus:ring-1 focus:ring-[#00853b]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <div className="relative">
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-[#00853b] focus:ring-1 focus:ring-[#00853b] appearance-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
                <option value="Revoked">Revoked</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {filteredCertificates.map((cert) => (
          <div key={cert.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden group">
            <div className="p-6">
              {/* Certificate Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-lg bg-[#00853b]/10 flex items-center justify-center">
                    <Award className="w-6 h-6 text-[#00853b]" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-gray-900">{cert.id}</h3>
                    <p className="text-sm text-gray-600">Certificate ID</p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(cert.status)}`}>
                  {cert.status}
                </span>
              </div>
              
              {/* Certificate Details */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Company</p>
                  <p className="font-medium text-gray-900">{cert.company}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Product</p>
                  <p className="font-medium text-gray-900">{cert.product}</p>
                </div>
                
                {/* Dates */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Issue Date</p>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="font-medium text-gray-900">{cert.issueDate}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Expiry Date</p>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        <span className={`font-medium ${cert.status === 'Expired' ? 'text-red-600' : 'text-gray-900'}`}>
                          {cert.expiryDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex justify-between mt-6 pt-6 border-t border-gray-200">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200 inline-flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </button>
                <button className="px-4 py-2 bg-[#00853b] text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 inline-flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCertificates.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
          <button 
            onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}
            className="px-4 py-2 text-sm font-medium text-[#00853b] hover:text-green-700"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Certificates;