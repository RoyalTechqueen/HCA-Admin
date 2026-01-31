import { useState } from 'react';
import { TrendingUp, Users, Clock, CheckCircle, Award } from 'lucide-react';

// Stat Card Component
const StatCard = ({ stat }) => {
  const Icon = stat.icon;
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          <div className="flex items-center mt-2">
            <TrendingUp 
              className={`w-4 h-4 mr-1 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} 
            />
            <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change} from last month
            </span>
          </div>
        </div>
        <div className={`${stat.color} p-3 rounded-xl flex-shrink-0`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

// Application Status Badge
const StatusBadge = ({ status }) => {
  const config = {
    Pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    Issued: { bg: 'bg-green-100', text: 'text-green-800' },
    Rejected: { bg: 'bg-red-100', text: 'text-red-800' }
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${config[status].bg} ${config[status].text}`}>
      {status}
    </span>
  );
};

// Type Badge
const TypeBadge = ({ type }) => {
  const config = {
    New: { bg: 'bg-blue-100', text: 'text-blue-800' },
    Renewal: { bg: 'bg-purple-100', text: 'text-purple-800' }
  };

  return (
    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${config[type].bg} ${config[type].text}`}>
      {type}
    </span>
  );
};

// Progress Bar Component
const ProgressBar = ({ approved, pending, rejected }) => {
  const total = approved + pending + rejected;
  
  return (
    <div className="flex h-2.5 bg-gray-200 rounded-full overflow-hidden">
      <div 
        className="bg-green-500 transition-all duration-300" 
        style={{ width: `${(approved / total) * 100}%` }}
        title={`Approved: ${approved}`}
      />
      <div 
        className="bg-yellow-500 transition-all duration-300" 
        style={{ width: `${(pending / total) * 100}%` }}
        title={`Pending: ${pending}`}
      />
      <div 
        className="bg-red-500 transition-all duration-300" 
        style={{ width: `${(rejected / total) * 100}%` }}
        title={`Rejected: ${rejected}`}
      />
    </div>
  );
};

const Dashboard = () => {
  const stats = [
    { 
      title: 'Total Applications', 
      value: '1,248', 
      change: '+12%', 
      icon: Users, 
      color: 'bg-blue-500',
      trend: 'up'
    },
    { 
      title: 'Pending Applications', 
      value: '46', 
      change: '+3%', 
      icon: Clock, 
      color: 'bg-yellow-500',
      trend: 'up'
    },
    { 
      title: 'Approved Products', 
      value: '892', 
      change: '+8%', 
      icon: CheckCircle, 
      color: 'bg-green-500',
      trend: 'up'
    },
    { 
      title: 'Issued Certificates', 
      value: '754', 
      change: '+5%', 
      icon: Award, 
      color: 'bg-[#00853b]',
      trend: 'up'
    },
  ];

  const [recentApplications] = useState([
    { id: 1, company: 'TechCorp Inc.', type: 'New', status: 'Pending', date: '2024-01-15' },
    { id: 2, company: 'Green Solutions', type: 'Renewal', status: 'Issued', date: '2024-01-14' },
    { id: 3, company: 'BioMed Labs', type: 'New', status: 'Rejected', date: '2024-01-13' },
    { id: 4, company: 'Solar Energy Ltd', type: 'Renewal', status: 'Pending', date: '2024-01-12' },
  ]);

  const [productStats] = useState([
    { category: 'Electronics', approved: 45, pending: 12, rejected: 3, color: 'bg-blue-500' },
    { category: 'Food & Beverage', approved: 89, pending: 23, rejected: 5, color: 'bg-green-500' },
    { category: 'Medical Devices', approved: 67, pending: 8, rejected: 2, color: 'bg-purple-500' },
    { category: 'Renewable Energy', approved: 34, pending: 15, rejected: 4, color: 'bg-yellow-500' },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8 pt-20 lg:pt-8">
      {/* Header */}
      <header className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2 text-sm lg:text-base">
          Welcome back! Here's what's happening with your applications and products.
        </p>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Recent Applications Card */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
              <button className="text-sm text-[#00853b] hover:text-green-700 font-medium transition-colors duration-200">
                View All →
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] lg:min-w-0">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{app.company}</div>
                    </td>
                    <td className="p-4">
                      <TypeBadge type={app.type} />
                    </td>
                    <td className="p-4">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="p-4 text-sm text-gray-500">
                      {new Date(app.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Product Statistics Card */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Product Statistics</h2>
              <p className="text-sm text-gray-600 mt-1">Approval status by category</p>
            </div>
          </div>
          
          <div className="p-4 lg:p-6">
            <div className="space-y-6">
              {productStats.map((stat, index) => {
                const total = stat.approved + stat.pending + stat.rejected;
                
                return (
                  <div key={index} className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-sm font-medium text-gray-900">{stat.category}</span>
                      <span className="text-sm text-gray-600">
                        Total: {total.toLocaleString()}
                      </span>
                    </div>
                    
                    <ProgressBar 
                      approved={stat.approved}
                      pending={stat.pending}
                      rejected={stat.rejected}
                    />
                    
                    <div className="grid grid-cols-3 gap-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2 flex-shrink-0"></div>
                        <span className="text-xs text-gray-600 truncate">
                          Approved: {stat.approved}
                        </span>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2 flex-shrink-0"></div>
                        <span className="text-xs text-gray-600 truncate">
                          Pending: {stat.pending}
                        </span>
                      </div>
                      <div className="flex items-center justify-end">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2 flex-shrink-0"></div>
                        <span className="text-xs text-gray-600 truncate">
                          Rejected: {stat.rejected}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;