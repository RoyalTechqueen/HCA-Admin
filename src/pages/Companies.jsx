import { useState } from 'react';
import { Search, Building2, Package, Users, XCircle, CheckCircle, TrendingUp } from 'lucide-react';

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const [companies] = useState([
    { id: 1, name: 'TechCorp Inc.', email: 'contact@techcorp.com', phone: '+1-555-1234', registrationDate: '2023-01-15', status: 'Active', approvedProducts: 3, totalProducts: 4 },
    { id: 2, name: 'Green Solutions', email: 'info@greensolutions.com', phone: '+1-555-5678', registrationDate: '2023-02-20', status: 'Active', approvedProducts: 2, totalProducts: 2 },
    { id: 3, name: 'BioMed Labs', email: 'support@biomedlabs.com', phone: '+1-555-9012', registrationDate: '2023-03-10', status: 'Active', approvedProducts: 1, totalProducts: 2 },
    { id: 4, name: 'FoodSafe Inc.', email: 'hello@foodsafe.com', phone: '+1-555-3456', registrationDate: '2023-04-05', status: 'Active', approvedProducts: 1, totalProducts: 1 },
    { id: 5, name: 'Solar Energy Ltd', email: 'contact@solareenergy.com', phone: '+1-555-7890', registrationDate: '2023-05-12', status: 'Active', approvedProducts: 1, totalProducts: 1 },
    { id: 6, name: 'New Startup LLC', email: 'info@newstartup.com', phone: '+1-555-2345', registrationDate: '2024-01-10', status: 'Active', approvedProducts: 0, totalProducts: 2 },
    { id: 7, name: 'Innovate Tech', email: 'contact@innovatetech.com', phone: '+1-555-6789', registrationDate: '2024-01-05', status: 'Active', approvedProducts: 0, totalProducts: 1 },
  ]);

  const filteredCompanies = companies.filter(company => {
    if (!company.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (activeTab === 'non-approved' && company.approvedProducts > 0) return false;
    if (activeTab === 'lists' && company.approvedProducts === 0) return false;
    return true;
  });

  const tabs = [
    { id: 'all', label: 'All Companies', count: companies.length },
    { id: 'non-approved', label: 'No Approved Products', count: companies.filter(c => c.approvedProducts === 0).length },
    { id: 'lists', label: 'With Approved Products', count: companies.filter(c => c.approvedProducts > 0).length },
  ];

  const getApprovalRate = (company) => {
    return Math.round((company.approvedProducts / company.totalProducts) * 100);
  };

  return (
    <div className="p-4 lg:p-8 pt-20 lg:pt-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Companies</h1>
            <p className="text-gray-600 mt-1">Manage registered companies and their products</p>
          </div>
          <button className="px-4 py-2.5 bg-[#00853b] text-white rounded-lg hover:bg-green-700 font-medium transition-colors duration-200 inline-flex items-center justify-center">
            + Add Company
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-[#00853b] text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {tab.label}
              <span className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
                activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search companies by name..."
            className="pl-10 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-[#00853b] focus:ring-1 focus:ring-[#00853b]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {filteredCompanies.map((company) => (
          <div key={company.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden group">
            <div className="p-6">
              {/* Company Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-xl bg-[#00853b]/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-[#00853b]" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-gray-900">{company.name}</h3>
                    <p className="text-sm text-gray-600 truncate">{company.email}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  company.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {company.status}
                </span>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-sm">{company.phone}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Registered: {company.registrationDate}
                </div>
              </div>

              {/* Product Stats */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Package className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">Products</span>
                  </div>
                  <div className="flex items-center">
                    {company.approvedProducts > 0 ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                        <span className="text-sm font-medium text-green-600">
                          {getApprovalRate(company)}% approved
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 mr-1 text-yellow-500" />
                        <span className="text-sm font-medium text-yellow-600">
                          No approved products
                        </span>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-[#00853b] h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${(company.approvedProducts / company.totalProducts) * 100}%` }}
                  />
                </div>
                
                {/* Stats */}
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Approved: {company.approvedProducts}</span>
                  <span>Total: {company.totalProducts}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between mt-6 pt-6 border-t border-gray-200">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                  View Details
                </button>
                <button className="px-4 py-2 bg-[#00853b] text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200">
                  Manage Products
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCompanies.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
          <button 
            onClick={() => { setSearchTerm(''); setActiveTab('all'); }}
            className="px-4 py-2 text-sm font-medium text-[#00853b] hover:text-green-700"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Companies;