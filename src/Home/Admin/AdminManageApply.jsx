import React, { useEffect, useState } from "react";
import { 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle, 
  MessageSquare, 
  Award, 
  User, 
  Calendar, 
  GraduationCap, 
  University, 
  FileText, 
  Clock, 
  Zap,
  Download,
  Mail,
  Phone,
  MapPin,
  Star,
  TrendingUp,
  Users,
  Target,
  X,
  Send,
  AlertTriangle,
  RefreshCw
} from "lucide-react";

const AdminManageApply = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedbackApp, setFeedbackApp] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showConfirmModal, setShowConfirmModal] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/applications");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
      showNotification("Failed to load applications", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    filterAndSortApplications();
  }, [applications, searchTerm, statusFilter, sortBy]);

  const filterAndSortApplications = () => {
    let filtered = applications.filter((app) => {
      const matchesSearch = 
        (app.applicantName || app.userEmail || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (app.scholarshipName || app.scholarshipDetails?.scholarshipName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (app.degree || app.scholarshipDetails?.degree || "").toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || app.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt || b.appliedAt || Date.now()) - new Date(a.createdAt || a.appliedAt || Date.now());
        case "oldest":
          return new Date(a.createdAt || a.appliedAt || Date.now()) - new Date(b.createdAt || b.appliedAt || Date.now());
        case "name":
          return (a.applicantName || a.userEmail || "").localeCompare(b.applicantName || b.userEmail || "");
        case "scholarship":
          return (a.scholarshipName || a.scholarshipDetails?.scholarshipName || "").localeCompare(b.scholarshipName || b.scholarshipDetails?.scholarshipName || "");
        default:
          return 0;
      }
    });

    setFilteredApplications(filtered);
  };

  const handleModeratorAction = async (id, action, customPayload = {}) => {
    setActionLoading(id + action);
    
    let payload = { ...customPayload };
    if (action === "approve") payload.status = "processing";
    if (action === "complete") payload.status = "completed";
    if (action === "reject") payload.status = "rejected";
    if (action === "feedback") payload.feedback = feedbackText;

    try {
      const response = await fetch(`http://localhost:5000/applications/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      showNotification(`${action.charAt(0).toUpperCase() + action.slice(1)} action completed successfully!`, "success");
      setFeedbackApp(null);
      setFeedbackText("");
      setShowConfirmModal(null);
      fetchApplications();
    } catch (error) {
      console.error("Error updating application:", error);
      showNotification("Action failed. Please try again.", "error");
    } finally {
      setActionLoading(null);
    }
  };

  const showNotification = (message, type = "info") => {
    const notification = document.createElement('div');
    const bgColor = type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-blue-500";
    notification.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "processing": return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed": return "bg-green-100 text-green-800 border-green-200";
      case "rejected": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending": return <Clock className="w-4 h-4" />;
      case "processing": return <Zap className="w-4 h-4" />;
      case "completed": return <CheckCircle className="w-4 h-4" />;
      case "rejected": return <XCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const ActionButton = ({ onClick, loading, className, children, loadingText }) => (
    <button
      onClick={onClick}
      disabled={loading}
      className={`${className} ${loading ? 'opacity-50 cursor-not-allowed' : ''} transition-all duration-200 transform hover:scale-105 active:scale-95`}
    >
      {loading ? (
        <div className="flex items-center">
          <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
          {loadingText}
        </div>
      ) : (
        children
      )}
    </button>
  );

  const ConfirmModal = ({ show, onClose, onConfirm, title, message, confirmText, type = "warning" }) => {
    if (!show) return null;

    const iconColor = type === "danger" ? "text-red-500" : "text-yellow-500";
    const confirmColor = type === "danger" ? "bg-red-500 hover:bg-red-600" : "bg-yellow-500 hover:bg-yellow-600";

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl transform transition-all">
          <div className="flex items-center mb-4">
            <AlertTriangle className={`w-6 h-6 ${iconColor} mr-3`} />
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <p className="text-gray-600 mb-6">{message}</p>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 px-4 py-2 ${confirmColor} text-white rounded-lg transition-colors`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700 animate-pulse">Loading applications...</p>
          <p className="text-gray-500 mt-2">Fetching the latest data</p>
        </div>
      </div>
    );
  }

  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === "pending").length,
    processing: applications.filter(app => app.status === "processing").length,
    completed: applications.filter(app => app.status === "completed").length,
    rejected: applications.filter(app => app.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-3 rounded-xl shadow-lg mr-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Scholarship Applications
              </h1>
              <p className="text-gray-600 text-lg">Manage and process scholarship applications</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600 font-medium">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600 font-medium">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600 font-medium">Processing</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.processing}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600 font-medium">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center">
                <div className="bg-red-100 p-3 rounded-lg">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600 font-medium">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none transition-all"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Sort by Name</option>
              <option value="scholarship">Sort by Scholarship</option>
            </select>

            <button
              onClick={fetchApplications}
              className="px-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-all duration-200 flex items-center justify-center font-medium"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {/* Applications Grid */}
        {filteredApplications.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <div className="text-gray-400 mb-4">
              <FileText className="w-20 h-20 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Applications Found</h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== "all" 
                ? "Try adjusting your search or filter criteria" 
                : "No applications have been submitted yet"
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredApplications.map((app) => (
              <div
                key={app._id}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 truncate">
                        {app.applicantName || app.userEmail}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {app.userEmail && app.applicantName ? app.userEmail : ''}
                      </p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full border flex items-center ${getStatusColor(app.status)}`}>
                    {getStatusIcon(app.status)}
                    <span className="ml-1 text-xs font-medium capitalize">{app.status}</span>
                  </div>
                </div>

                {/* Scholarship Info */}
                <div className="mb-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Award className="w-4 h-4 mr-2 text-indigo-500" />
                    <span className="font-medium truncate">
                      {app.scholarshipName || app.scholarshipDetails?.scholarshipName || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <University className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="truncate">
                      {app.scholarshipDetails?.universityName || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <GraduationCap className="w-4 h-4 mr-2 text-green-500" />
                    <span className="truncate">
                      {app.degree || app.scholarshipDetails?.degree || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <ActionButton
                    onClick={() => setSelectedApp(app)}
                    className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center justify-center"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Details
                  </ActionButton>

                  <ActionButton
                    onClick={() => setShowConfirmModal({ app, action: 'approve' })}
                    loading={actionLoading === app._id + 'approve'}
                    loadingText="Approving..."
                    className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium flex items-center justify-center"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Approve
                  </ActionButton>

                  <ActionButton
                    onClick={() => setFeedbackApp(app)}
                    className="px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium flex items-center justify-center"
                  >
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Feedback
                  </ActionButton>

                  <ActionButton
                    onClick={() => setShowConfirmModal({ app, action: 'reject' })}
                    loading={actionLoading === app._id + 'reject'}
                    loadingText="Rejecting..."
                    className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium flex items-center justify-center"
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Reject
                  </ActionButton>
                </div>

                {app.status === 'processing' && (
                  <ActionButton
                    onClick={() => setShowConfirmModal({ app, action: 'complete' })}
                    loading={actionLoading === app._id + 'complete'}
                    loadingText="Completing..."
                    className="w-full mt-2 px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-medium flex items-center justify-center"
                  >
                    <Target className="w-4 h-4 mr-1" />
                    Mark Complete
                  </ActionButton>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Details Modal */}
        {selectedApp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <FileText className="w-6 h-6 text-indigo-600 mr-2" />
                  Application Details
                </h3>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Applicant Info */}
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <User className="w-5 h-5 text-indigo-600 mr-2" />
                    Applicant Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Name:</span>
                      <p className="text-gray-900">{selectedApp.applicantName || "N/A"}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Email:</span>
                      <p className="text-gray-900">{selectedApp.userEmail || "N/A"}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Phone:</span>
                      <p className="text-gray-900">{selectedApp.phone || "N/A"}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Address:</span>
                      <p className="text-gray-900">{selectedApp.address || "N/A"}</p>
                    </div>
                  </div>
                </div>

                {/* Scholarship Info */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Award className="w-5 h-5 text-green-600 mr-2" />
                    Scholarship Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Scholarship:</span>
                      <p className="text-gray-900">{selectedApp.scholarshipName || selectedApp.scholarshipDetails?.scholarshipName || "N/A"}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">University:</span>
                      <p className="text-gray-900">{selectedApp.scholarshipDetails?.universityName || "N/A"}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Degree:</span>
                      <p className="text-gray-900">{selectedApp.degree || selectedApp.scholarshipDetails?.degree || "N/A"}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Category:</span>
                      <p className="text-gray-900">{selectedApp.category || "N/A"}</p>
                    </div>
                  </div>
                </div>

                {/* Application Status */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
                    Application Status
                  </h4>
                  <div className="flex items-center space-x-4">
                    <div className={`px-4 py-2 rounded-full border flex items-center ${getStatusColor(selectedApp.status)}`}>
                      {getStatusIcon(selectedApp.status)}
                      <span className="ml-2 font-medium capitalize">{selectedApp.status}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Applied: {new Date(selectedApp.createdAt || selectedApp.appliedAt || Date.now()).toLocaleDateString()}
                    </div>
                  </div>
                  {selectedApp.feedback && (
                    <div className="mt-3 p-3 bg-white rounded-lg border">
                      <span className="font-medium text-gray-600">Feedback:</span>
                      <p className="text-gray-900 mt-1">{selectedApp.feedback}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Feedback Modal */}
        {feedbackApp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
              <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <MessageSquare className="w-6 h-6 text-indigo-600 mr-2" />
                  Provide Feedback
                </h3>
                <button
                  onClick={() => {
                    setFeedbackApp(null);
                    setFeedbackText("");
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-gray-600 mb-2">
                    Providing feedback for: <span className="font-medium">{feedbackApp.applicantName || feedbackApp.userEmail}</span>
                  </p>
                </div>
                
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  rows={4}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Enter your feedback for the applicant..."
                />
                
                <div className="flex space-x-3 mt-4">
                  <button
                    onClick={() => {
                      setFeedbackApp(null);
                      setFeedbackText("");
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <ActionButton
                    onClick={() => handleModeratorAction(feedbackApp._id, "feedback")}
                    loading={actionLoading === feedbackApp._id + 'feedback'}
                    loadingText="Sending..."
                    className="flex-1 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors flex items-center justify-center"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Feedback
                  </ActionButton>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modals */}
        <ConfirmModal
          show={showConfirmModal?.action === 'approve'}
          onClose={() => setShowConfirmModal(null)}
          onConfirm={() => handleModeratorAction(showConfirmModal.app._id, 'approve')}
          title="Approve Application"
          message={`Are you sure you want to approve ${showConfirmModal?.app?.applicantName || showConfirmModal?.app?.userEmail}'s application? This will move it to processing status.`}
          confirmText="Approve Application"
          type="warning"
        />

        <ConfirmModal
          show={showConfirmModal?.action === 'reject'}
          onClose={() => setShowConfirmModal(null)}
          onConfirm={() => handleModeratorAction(showConfirmModal.app._id, 'reject')}
          title="Reject Application"
          message={`Are you sure you want to reject ${showConfirmModal?.app?.applicantName || showConfirmModal?.app?.userEmail}'s application? This action cannot be undone.`}
          confirmText="Reject Application"
          type="danger"
        />

        <ConfirmModal
          show={showConfirmModal?.action === 'complete'}
          onClose={() => setShowConfirmModal(null)}
          onConfirm={() => handleModeratorAction(showConfirmModal.app._id, 'complete')}
          title="Mark as Complete"
          message={`Are you sure you want to mark ${showConfirmModal?.app?.applicantName || showConfirmModal?.app?.userEmail}'s application as completed? This indicates the scholarship has been awarded.`}
          confirmText="Mark Complete"
          type="warning"
        />
      </div>
    </div>
  );
};

export default AdminManageApply;