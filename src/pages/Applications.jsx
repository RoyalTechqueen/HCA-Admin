import { useState } from 'react';
import { Search, Filter, Download, CheckCircle, XCircle, Clock, ChevronDown, Calendar } from 'lucide-react';

const Applications = () => {
  const [filter, setFilter] = useState({
    company: '',
    dateFrom: '',
    dateTo: '',
    status: '',
  });

  const [applications] = useState([
    { id: 1, company: 'TechCorp Inc.', product: 'Smart Device v2', type: 'New', status: 'Pending', date: '2024-01-15' },
    { id: 2, company: 'Green Solutions', product: 'Solar Panel X', type: 'Renewal', status: 'Issued', date: '2024-01-14', certificateId: 'CERT-001' },
    { id: 3, company: 'BioMed Labs', product: 'Medical Scanner', type: 'New', status: 'Rejected', date: '2024-01-13' },
    { id: 4, company: 'Solar Energy Ltd', product: 'Solar Inverter', type: 'Renewal', status: 'Pending', date: '2024-01-12' },
    { id: 5, company: 'FoodSafe Inc.', product: 'Organic Snacks', type: 'New', status: 'Submitted', date: '2024-01-11' },
    { id: 6, company: 'TechCorp Inc.', product: 'IoT Gateway', type: 'New', status: 'Issued', date: '2024-01-10', certificateId: 'CERT-002' },
  ]);

  const [activeTab, setActiveTab] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredApplications = applications.filter(app => {
    if (activeTab === 'pending') return app.status === 'Pending' || app.status === 'Submitted';
    if (activeTab === 'renewal') return app.type === 'Renewal';
    if (activeTab === 'issued') return app.status === 'Issued';
    if (activeTab === 'rejected') return app.status === 'Rejected';
    return true;
  }).filter(app => {
    if (filter.company && !app.company.toLowerCase().includes(filter.company.toLowerCase())) return false;
    if (filter.dateFrom && app.date < filter.dateFrom) return false;
    if (filter.dateTo && app.date > filter.dateTo) return false;
    if (filter.status && app.status !== filter.status) return false;
    return true;
  });

  const handleIssueCertificate = (appId) => {
    console.log('Issue certificate for application:', appId);
    alert(`Certificate issued for application #${appId}`);
  };

  const tabs = [
    { id: 'all', label: 'All Applications', count: applications.length },
    { id: 'pending', label: 'New', count: applications.filter(a => a.status === 'Pending' || a.status === 'Submitted').length },
    { id: 'renewal', label: 'Renewal', count: applications.filter(a => a.type === 'Renewal').length },
    { id: 'issued', label: 'Issued', count: applications.filter(a => a.status === 'Issued').length },
    { id: 'rejected', label: 'Rejected', count: applications.filter(a => a.status === 'Rejected').length },
  ];

  return (
    <div className="p-4 lg:p-8 pt-20 lg:pt-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Applications</h1>
            <p className="text-gray-600 mt-1">Manage and review certification applications</p>
          </div>
          <button className="px-4 py-2.5 bg-[#00853b] text-white rounded-lg hover:bg-green-700 font-medium transition-colors duration-200 inline-flex items-center justify-center">
            + New Application
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

      {/* Filter Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Filters</h3>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>
        
        <div className={`${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search company..."
                  className="pl-10 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-[#00853b] focus:ring-1 focus:ring-[#00853b]"
                  value={filter.company}
                  onChange={(e) => setFilter({ ...filter, company: e.target.value })}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <div className="relative">
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-[#00853b] focus:ring-1 focus:ring-[#00853b] appearance-none"
                  value={filter.status}
                  onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                >
                  <option value="">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Issued">Issued</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date From</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="date"
                  className="pl-10 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-[#00853b] focus:ring-1 focus:ring-[#00853b]"
                  value={filter.dateFrom}
                  onChange={(e) => setFilter({ ...filter, dateFrom: e.target.value })}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date To</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="date"
                  className="pl-10 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-[#00853b] focus:ring-1 focus:ring-[#00853b]"
                  value={filter.dateTo}
                  onChange={(e) => setFilter({ ...filter, dateTo: e.target.value })}
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <button 
              onClick={() => setFilter({ company: '', dateFrom: '', dateTo: '', status: '' })}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-gray-900">#{app.id}</div>
                      <div className="text-sm text-gray-600">{app.company}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-gray-900">{app.product}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                      app.type === 'New' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {app.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                      app.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      app.status === 'Submitted' ? 'bg-blue-100 text-blue-800' :
                      app.status === 'Issued' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {app.status === 'Pending' && <Clock className="w-3 h-3 mr-1" />}
                      {app.status === 'Issued' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {app.status === 'Rejected' && <XCircle className="w-3 h-3 mr-1" />}
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500">{app.date}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                        View
                      </button>
                      {app.status === 'Pending' && (
                        <button
                          onClick={() => handleIssueCertificate(app.id)}
                          className="px-3 py-1.5 bg-[#00853b] text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
                        >
                          Issue
                        </button>
                      )}
                      {app.certificateId && (
                        <button className="p-1.5 text-[#00853b] hover:bg-green-50 rounded-lg transition-colors duration-200">
                          <Download className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">{filteredApplications.length}</span> of{' '}
              <span className="font-medium">{applications.length}</span> applications
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                Previous
              </button>
              <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;