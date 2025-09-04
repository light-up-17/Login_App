import { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

import { 
  Shield, 
  Plus, 
  FileText, 
  Car, 
  Home, 
  Heart, 
  Calendar,
  Bike,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  Upload,
  X,
  LogOut
} from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('policies');
  const [showClaimForm, setShowClaimForm] = useState(false);
  const [claimForm, setClaimForm] = useState({
    policyId: '',
    incidentDate: '',
    description: '',
    amount: '',
    documents: []
  });
  const navigate = useNavigate();

  // Mock data - to be connected with backend
  const mockUserPolicies = [
    {
      id: 1,
      type: 'auto',
      name: 'Motor Insurance',
      policyNumber: 'MOT-IND-2024-001',
      status: 'active',
      premium: 15000,
      coverage: 750000,
      startDate: '2024-01-15',
      endDate: '2025-01-15',
      nextPayment: '2024-02-15'
    },
    {
      id: 2,
      type: 'home',
      name: 'Home Insurance Standard',
      policyNumber: 'HOME-IND-2024-002',
      status: 'active',
      premium: 18000,
      coverage: 18000000,
      startDate: '2024-03-01',
      endDate: '2025-03-01',
      nextPayment: '2024-03-01'
    }
  ];

  // Mock data for policies - to be connected with backend
  const mockAvailablePolicies = [
    {
      id: 3,
      type: 'health',
      name: 'Health Insurance Plus',
      description: 'Comprehensive health coverage for your entire family, including critical illness.',
      premium: 4500,
      coverage: 100000,
      features: ['Cashless Hospitalization', 'Critical Illness Cover', 'Pre/Post Hospitalization']
    },
    {
      id: 4,
      type: 'life',
      name: 'Life Insurance Basic',
      description: 'Term life insurance for peace of mind',
      premium: 850,
      coverage: 5000000,
      features: ['Accidental Death', 'Terminal Illness', '24/7 Support']
    },
    {
      id: 5,
      type: 'two-wheeler',
      name: 'Two-Wheeler Insurance Plus',
      description: 'Enhanced auto coverage with roadside assistance',
      premium: 1500,
      coverage: 75000,
      features: ['Third-Party Liability', 'Own Damage Cover', 'Roadside Assistance', 'No Claim Bonus']
    }
  ];

  useEffect(() => {
    (async () => {
      try {
        const res = await api("/auth/me");
        setUser(res.user); // ✅ using res.user
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    })();
  }, []);

  const handleLogout = async () => {
    try {
      await api("/auth/logout", { method: "POST" });
      setUser(null);
      navigate("/login"); // redirect to login page
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // Function to get color for status badge
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-emerald-600 bg-emerald-50';
      case 'pending':
        return 'text-amber-600 bg-amber-50';
      case 'expired':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  // Function to get icon for policy type
  const getTypeIcon = (type) => {
    switch (type) {
      case 'auto':
        return <Car className="w-5 h-5" />;
      case 'home':
        return <Home className="w-5 h-5" />;
      case 'health':
        return <Heart className="w-5 h-5" />;
      case 'life':
        return <Shield className="w-5 h-5" />;
      case 'two-wheeler':
        return <Bike className="w-5 h-5" />;  
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const handleClaimSubmit = (e) => {
    e.preventDefault();
    // Handle claim submission
    console.log('Claim submitted:', claimForm);
    setShowClaimForm(false);
    setClaimForm({
      policyId: '',
      incidentDate: '',
      description: '',
      amount: '',
      documents: []
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setClaimForm(prev => ({
      ...prev,
      documents: [...prev.documents, ...files]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with new brand colors */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-teal-600" />
              <h1 className="text-2xl font-bold text-gray-900">InsurAI</h1>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-sm text-gray-600">Welcome back, <strong>{user.name}</strong></span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <span className="text-sm text-gray-600">Loading user...</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-8 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('policies')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'policies'
                ? 'border-teal-500 text-teal-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            My Policies
          </button>
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'marketplace'
                ? 'border-teal-500 text-teal-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Buy Insurance
          </button>
        </div>

        {/* Quick Actions with updated colors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Active Policies</h3>
                <p className="text-2xl font-bold text-teal-600">{mockUserPolicies.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Total Coverage</h3>
                <p className="text-2xl font-bold text-emerald-600">
                  ₹{(mockUserPolicies.reduce((sum, policy) => sum + policy.coverage, 0) / 10000000).toFixed(2)} Crore
                </p>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setShowClaimForm(true)}
            className="bg-amber-500 hover:bg-amber-600 text-white p-6 rounded-xl shadow-sm transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Submit Claim</h3>
                <p className="text-amber-100 text-sm">File a new claim</p>
              </div>
            </div>
          </button>
        </div>

        {/* Policy list section */}
        {activeTab === 'policies' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Policies</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockUserPolicies.map((policy) => (
                <div key={policy.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                        {getTypeIcon(policy.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{policy.name}</h3>
                        <p className="text-sm text-gray-600">{policy.policyNumber}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(policy.status)}`}>
                      {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Coverage Amount</p>
                      <p className="font-semibold text-gray-900">₹{(policy.coverage / 100000).toFixed(1)} Lakhs</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Annual Premium</p>
                      <p className="font-semibold text-gray-900">₹{policy.premium.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Expires: {new Date(policy.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                      View Details
                    </button>
                    <button className="px-4 py-2 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                      Documents
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Marketplace section */}
        {activeTab === 'marketplace' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Insurance Policies</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockAvailablePolicies.map((policy) => (
                <div key={policy.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                      {getTypeIcon(policy.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{policy.name}</h3>
                      <p className="text-sm text-gray-600">{policy.type.charAt(0).toUpperCase() + policy.type.slice(1)} Insurance</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{policy.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Coverage</span>
                      <span className="font-semibold text-gray-900">₹{policy.coverage.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Monthly Premium</span>
                      <span className="font-semibold text-emerald-600">₹{policy.premium.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Key Features:</p>
                    <ul className="space-y-1">
                      {policy.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                          <CheckCircle className="w-3 h-3 text-emerald-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                      Get Quote
                    </button>
                    <button className="px-4 py-2 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Claim Form Modal */}
        {showClaimForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Submit New Claim</h2>
                <button
                  onClick={() => setShowClaimForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleClaimSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Policy
                  </label>
                  <select
                    value={claimForm.policyId}
                    onChange={(e) => setClaimForm(prev => ({ ...prev, policyId: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                  >
                    <option value="">Choose a policy</option>
                    {mockUserPolicies.map((policy) => (
                      <option key={policy.id} value={policy.id}>
                        {policy.name} - {policy.policyNumber}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Incident Date
                  </label>
                  <input
                    type="date"
                    value={claimForm.incidentDate}
                    onChange={(e) => setClaimForm(prev => ({ ...prev, incidentDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Claim Amount
                  </label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={claimForm.amount}
                    onChange={(e) => setClaimForm(prev => ({ ...prev, amount: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description of Incident
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Please provide details about what happened..."
                    value={claimForm.description}
                    onChange={(e) => setClaimForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Supporting Documents (e.g., FIR, Aadhar Card, Photos) 
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload photos, reports, or other evidence</p>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                      accept="image/*,.pdf,.doc,.docx"
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 cursor-pointer transition-colors"
                    >
                      Choose Files
                    </label>
                  </div>
                  {claimForm.documents.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">Selected files:</p>
                      <ul className="text-sm text-gray-800">
                        {claimForm.documents.map((file, index) => (
                          <li key={index}>• {file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowClaimForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Submit Claim
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}