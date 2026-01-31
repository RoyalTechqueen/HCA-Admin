import { useState, useEffect } from 'react';
import { TrendingUp, Users, Clock, CheckCircle, Award, Package, FileText, RefreshCw, AlertCircle } from 'lucide-react';
import { useAll } from '../hooks/useAll';

// Stat Card Component
const StatCard = ({ stat, isLoading }) => {
  const Icon = stat.icon;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
          <p className="text-2xl font-bold text-gray-900">
            {isLoading ? (
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              stat.value
            )}
          </p>
          <div className="flex items-center mt-2">
            <TrendingUp 
              className={`w-4 h-4 mr-1 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} 
            />
            <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change}
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
  const getStatusConfig = (status) => {
    const statusLower = status?.toLowerCase();
    
    const configs = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      issued: { bg: 'bg-green-100', text: 'text-green-800' },
      expired: { bg: 'bg-red-100', text: 'text-red-800' },
      renewed: { bg: 'bg-blue-100', text: 'text-blue-800' },
      active: { bg: 'bg-green-100', text: 'text-green-800' },
      approved: { bg: 'bg-green-100', text: 'text-green-800' },
      rejected: { bg: 'bg-red-100', text: 'text-red-800' },
    };

    return configs[statusLower] || { bg: 'bg-gray-100', text: 'text-gray-800' };
  };

  const config = getStatusConfig(status);

  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}>
      {status?.charAt(0).toUpperCase() + status?.slice(1) || 'Unknown'}
    </span>
  );
};

// Type Badge
const TypeBadge = ({ type }) => {
  const getTypeConfig = (type) => {
    const typeLower = type?.toLowerCase();
    
    const configs = {
      new: { bg: 'bg-blue-100', text: 'text-blue-800' },
      renewal: { bg: 'bg-purple-100', text: 'text-purple-800' },
      product: { bg: 'bg-green-100', text: 'text-green-800' },
      service: { bg: 'bg-orange-100', text: 'text-orange-800' },
    };

    return configs[typeLower] || { bg: 'bg-gray-100', text: 'text-gray-800' };
  };

  const config = getTypeConfig(type);

  return (
    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}>
      {type?.charAt(0).toUpperCase() + type?.slice(1) || 'Unknown'}
    </span>
  );
};

// Progress Bar Component
const ProgressBar = ({ approved, pending, rejected, isLoading }) => {
  const total = approved + pending + rejected;
  
  if (isLoading) {
    return (
      <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden animate-pulse"></div>
    );
  }
  
  return (
    <div className="flex h-2.5 bg-gray-200 rounded-full overflow-hidden">
      <div 
        className="bg-green-500 transition-all duration-300" 
        style={{ width: total > 0 ? `${(approved / total) * 100}%` : '0%' }}
        title={`Approved: ${approved}`}
      />
      <div 
        className="bg-yellow-500 transition-all duration-300" 
        style={{ width: total > 0 ? `${(pending / total) * 100}%` : '0%' }}
        title={`Pending: ${pending}`}
      />
      <div 
        className="bg-red-500 transition-all duration-300" 
        style={{ width: total > 0 ? `${(rejected / total) * 100}%` : '0%' }}
        title={`Rejected: ${rejected}`}
      />
    </div>
  );
};

const Dashboard = () => {
  const { 
    products, 
    certificates, 
    isLoading,
    errors,
    fetchProducts,
    fetchCertificates,
  } = useAll();

  useEffect(()=> {
    fetchProducts()
    fetchCertificates()
  }, [])

  const [dashboardStats, setDashboardStats] = useState({
    totalProducts: 0,
    totalCertificates: 0,
    activeCertificates: 0,
    pendingCertificates: 0,
    expiredCertificates: 0,
    recentApplications: [],
    productCategories: [],
    lastUpdated: null
  });

  const [localLoading, setLocalLoading] = useState(false);

  // Calculate dashboard statistics
  // Updated dashboard statistics calculation in useEffect
    useEffect(() => {
        const calculateStats = () => {
            if (!products || !certificates || !applications) return;

            // Count certificates by status
            const certificateStats = certificates.reduce((acc, cert) => {
            const status = cert.status?.toLowerCase();
            if (status === 'issued' || status === 'active') acc.active++;
            else if (status === 'pending') acc.pending++;
            else if (status === 'expired') acc.expired++;
            return acc;
            }, { active: 0, pending: 0, expired: 0 });

            // Count applications by status
            const applicationStats = applications.reduce((acc, app) => {
            const status = app.status?.toLowerCase();
            if (status === 'approved') acc.approved++;
            else if (status === 'pending') acc.pending++;
            else if (status === 'rejected') acc.rejected++;
            else if (status === 'draft') acc.draft++;
            return acc;
            }, { approved: 0, pending: 0, rejected: 0, draft: 0 });

            // Get recent applications
            const recentApps = applications
            .sort((a, b) => new Date(b.createdAt || b.date || 0) - new Date(a.createdAt || a.date || 0))
            .slice(0, 4)
            .map(app => ({
                id: app.id || app._id,
                company: app.companyName || app.company || app.applicantName || 'Unknown',
                type: app.applicationType || 'New',
                status: app.status || 'pending',
                date: app.createdAt || app.submissionDate || app.date || new Date().toISOString().split('T')[0],
                product: app.productName || app.product || 'N/A'
            }));

            setDashboardStats({
            totalProducts: products.length,
            totalCertificates: certificates.length,
            totalApplications: applications.length,
            activeCertificates: certificateStats.active,
            pendingCertificates: certificateStats.pending,
            pendingApplications: applicationStats.pending,
            approvedApplications: applicationStats.approved,
            recentApplications: recentApps,
            lastUpdated: new Date()
            });
        };

        calculateStats();
    }, [products, certificates, applications]);

  // Stats data with real values
  const stats = [
    { 
      title: 'Total Products', 
      value: dashboardStats.totalProducts.toLocaleString(), 
      change: '+12%', 
      icon: Package, 
      color: 'bg-blue-500',
      trend: 'up'
    },
    { 
      title: 'Pending Applications', 
      value: dashboardStats.pendingCertificates.toString(), 
      change: dashboardStats.pendingCertificates > 0 ? '+3%' : '0%', 
      icon: Clock, 
      color: 'bg-yellow-500',
      trend: dashboardStats.pendingCertificates > 0 ? 'up' : 'neutral'
    },
    { 
      title: 'Active Certificates', 
      value: dashboardStats.activeCertificates.toString(), 
      change: '+8%', 
      icon: CheckCircle, 
      color: 'bg-green-500',
      trend: 'up'
    },
    { 
      title: 'Total Certificates', 
      value: dashboardStats.totalCertificates.toString(), 
      change: '+5%', 
      icon: FileText, 
      color: 'bg-[#00853b]',
      trend: 'up'
    },
  ];

  // Handle data refresh
  const handleRefreshData = async () => {
    setLocalLoading(true);
    try {
      await Promise.all([fetchProducts(), fetchCertificates()]);
    } catch (error) {
      console.error('Failed to refresh data:', error);
    } finally {
      setLocalLoading(false);
    }
  };

  // Format date for display
  const formatLastUpdated = (date) => {
    if (!date) return 'Never';
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8 pt-20 lg:pt-8">
      {/* Header */}
      <header className="mb-6 lg:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <div className="flex items-center gap-2 mt-2">
              <p className="text-gray-600 text-sm lg:text-base">
                Real-time overview of your products and certificates
              </p>
              {dashboardStats.lastUpdated && (
                <span className="text-xs text-gray-400">
                  Last updated: {formatLastUpdated(dashboardStats.lastUpdated)}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {errors && (
              <div className="flex items-center gap-1 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{errors}</span>
              </div>
            )}
            <button
              onClick={handleRefreshData}
              disabled={isLoading || localLoading}
              className="flex items-center gap-2 px-4 py-2 bg-[#00853b] text-white rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              <RefreshCw className={`w-4 h-4 ${(isLoading || localLoading) ? 'animate-spin' : ''}`} />
              {isLoading || localLoading ? 'Refreshing...' : 'Refresh Data'}
            </button>
          </div>
        </div>
      </header>

      {/* Error Alert */}
      {errors && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Error Loading Data</h3>
              <p className="text-sm text-red-600 mt-1">{errors}</p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} isLoading={isLoading} />
        ))}
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Recent Applications Card */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
              <span className="text-sm text-gray-500">
                {dashboardStats.recentApplications.length} total
              </span>
            </div>
          </div>
          
          {isLoading ? (
            <div className="p-8 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : dashboardStats.recentApplications.length > 0 ? (
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
                  {dashboardStats.recentApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="p-4">
                        <div className="font-medium text-gray-900 truncate max-w-[150px]" title={app.company}>
                          {app.company}
                        </div>
                        {app.productName && (
                          <div className="text-xs text-gray-500 truncate max-w-[150px]" title={app.productName}>
                            {app.productName}
                          </div>
                        )}
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
          ) : (
            <div className="p-8 text-center text-gray-500">
              <FileText className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p>No recent applications found</p>
              <button
                onClick={handleRefreshData}
                className="mt-2 text-sm text-[#00853b] hover:text-green-700 font-medium"
              >
                Load Certificates
              </button>
            </div>
          )}
        </section>

        {/* Product Statistics Card */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Product Statistics</h2>
                <p className="text-sm text-gray-600 mt-1">Approval status by category</p>
              </div>
              <span className="text-sm text-gray-500">
                {dashboardStats.productCategories.length} categories
              </span>
            </div>
          </div>
          
          <div className="p-4 lg:p-6">
            {isLoading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-3">
                    <div className="animate-pulse h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="animate-pulse h-2.5 bg-gray-200 rounded-full"></div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="animate-pulse h-3 bg-gray-200 rounded"></div>
                      <div className="animate-pulse h-3 bg-gray-200 rounded"></div>
                      <div className="animate-pulse h-3 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : dashboardStats.productCategories.length > 0 ? (
              <div className="space-y-6">
                {dashboardStats.productCategories.map((stat, index) => {
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
                        isLoading={false}
                      />
                      
                      <div className="grid grid-cols-3 gap-2">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-green-500 mr-2 flex-shrink-0"></div>
                          <span className="text-xs text-gray-600 truncate" title={`Approved: ${stat.approved}`}>
                            Approved: {stat.approved}
                          </span>
                        </div>
                        <div className="flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2 flex-shrink-0"></div>
                          <span className="text-xs text-gray-600 truncate" title={`Pending: ${stat.pending}`}>
                            Pending: {stat.pending}
                          </span>
                        </div>
                        <div className="flex items-center justify-end">
                          <div className="w-3 h-3 rounded-full bg-red-500 mr-2 flex-shrink-0"></div>
                          <span className="text-xs text-gray-600 truncate" title={`Rejected: ${stat.rejected}`}>
                            Rejected: {stat.rejected}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Package className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p>No product categories found</p>
                <p className="text-sm text-gray-400 mt-1">Add products to see category statistics</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Summary Footer */}
      <div className="mt-8 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-gray-900">{dashboardStats.totalProducts}</div>
            <div className="text-sm text-gray-600">Total Products</div>
          </div>
          <div className="text-center p-4 border-l border-r border-gray-200">
            <div className="text-2xl font-bold text-gray-900">{dashboardStats.totalCertificates}</div>
            <div className="text-sm text-gray-600">Total Certificates</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-gray-900">{dashboardStats.activeCertificates}</div>
            <div className="text-sm text-gray-600">Active Certificates</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;