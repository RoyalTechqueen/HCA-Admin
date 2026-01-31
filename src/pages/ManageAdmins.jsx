import { useState } from 'react';
import { Search, UserPlus, Mail, Phone, Shield, Trash2, Edit2, MoreVertical, CheckCircle, XCircle } from 'lucide-react';

const ManageAdmins = () => {
  const [admins, setAdmins] = useState([
    { id: 1, name: 'Admin User', email: 'admin@example.com', phone: '+1-555-1001', role: 'Super Admin', addedDate: '2023-01-01', status: 'Active' },
    { id: 2, name: 'John Doe', email: 'john@example.com', phone: '+1-555-1002', role: 'Admin', addedDate: '2023-02-15', status: 'Active' },
    { id: 3, name: 'Jane Smith', email: 'jane@example.com', phone: '+1-555-1003', role: 'Admin', addedDate: '2023-03-20', status: 'Active' },
    { id: 4, name: 'Bob Wilson', email: 'bob@example.com', phone: '+1-555-1004', role: 'Viewer', addedDate: '2023-04-10', status: 'Inactive' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Admin',
  });

  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAdmin = () => {
    if (newAdmin.name && newAdmin.email) {
      const admin = {
        id: admins.length + 1,
        ...newAdmin,
        addedDate: new Date().toISOString().split('T')[0],
        status: 'Active',
      };
      setAdmins([...admins, admin]);
      setNewAdmin({ name: '', email: '', phone: '', role: 'Admin' });
      setShowAddForm(false);
    }
  };

  const handleDeleteAdmin = (id) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      setAdmins(admins.filter(admin => admin.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setAdmins(admins.map(admin => 
      admin.id === id 
        ? { ...admin, status: admin.status === 'Active' ? 'Inactive' : 'Active' }
        : admin
    ));
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Super Admin': return 'bg-purple-100 text-purple-800';
      case 'Admin': return 'bg-blue-100 text-blue-800';
      case 'Viewer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 lg:p-8 pt-20 lg:pt-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Manage Admins</h1>
            <p className="text-gray-600 mt-1">Add and manage admin users</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2.5 bg-[#00853b] text-white rounded-lg hover:bg-green-700 font-medium transition-colors duration-200 inline-flex items-center justify-center"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Add New Admin
          </button>
        </div>
      </div>

      {/* Add Admin Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Add New Admin</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-[#00853b] focus:ring-1 focus:ring-[#00853b]"
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-[#00853b] focus:ring-1 focus:ring-[#00853b]"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-[#00853b] focus:ring-1 focus:ring-[#00853b]"
                  value={newAdmin.phone}
                  onChange={(e) => setNewAdmin({ ...newAdmin, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-[#00853b] focus:ring-1 focus:ring-[#00853b]"
                  value={newAdmin.role}
                  onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                >
                  <option value="Admin">Admin</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-8">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAdmin}
                className="px-4 py-2.5 bg-[#00853b] text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Add Admin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search admins by name or email..."
            className="pl-10 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-[#00853b] focus:ring-1 focus:ring-[#00853b]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Admins Grid/Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added Date</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#00853b]/10 flex items-center justify-center">
                        <span className="font-bold text-[#00853b] text-sm">
                          {admin.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">{admin.name}</p>
                        <p className="text-xs text-gray-500">ID: #{admin.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {admin.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {admin.phone}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${getRoleColor(admin.role)}`}>
                      <Shield className="w-3 h-3 mr-1" />
                      {admin.role}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500">{admin.addedDate}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleStatus(admin.id)}
                      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 ${
                        admin.status === 'Active' 
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {admin.status === 'Active' ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <XCircle className="w-3 h-3 mr-1" />
                      )}
                      {admin.status}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {admin.role !== 'Super Admin' && (
                        <button
                          onClick={() => handleDeleteAdmin(admin.id)}
                          className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
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
              Showing <span className="font-medium">{filteredAdmins.length}</span> of{' '}
              <span className="font-medium">{admins.length}</span> admins
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

      {/* Empty State */}
      {filteredAdmins.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No admins found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
          <button 
            onClick={() => setSearchTerm('')}
            className="px-4 py-2 text-sm font-medium text-[#00853b] hover:text-green-700"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageAdmins;