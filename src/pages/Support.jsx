import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { 
  FaQuestionCircle, 
  FaTicketAlt, 
  FaComments, 
  FaBook, 
  FaExclamationTriangle, 
  FaUsers,
  FaChartLine,
  FaHeadset,
  FaClipboardList,
  FaRobot,
  FaEnvelope,
  FaPhoneAlt
} from 'react-icons/fa';

const SupportCard = ({ icon, title, description, link, color }) => {
  return (
    <Link 
      to={link} 
      className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
    >
      <div className={`${color} p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm">{description}</p>
    </Link>
  );
};

const Support = () => {
  const supportFeatures = [
    {
      icon: <FaTicketAlt className="text-indigo-600 text-2xl" />,
      title: "Ticket Management",
      description: "View and manage customer support tickets, assign priorities, and track resolution status.",
      link: "/support/tickets",
      color: "bg-indigo-100"
    },
    {
      icon: <FaComments className="text-blue-600 text-2xl" />,
      title: "Live Chat Support",
      description: "Engage with customers in real-time through the live chat interface.",
      link: "/support/chat",
      color: "bg-blue-100"
    },
    {
      icon: <FaBook className="text-purple-600 text-2xl" />,
      title: "Knowledge Base",
      description: "Manage help articles and documentation for customers and support agents.",
      link: "/support/knowledge",
      color: "bg-purple-100"
    },
    {
      icon: <FaExclamationTriangle className="text-orange-600 text-2xl" />,
      title: "Dispute Resolution",
      description: "Handle customer complaints, refund requests, and service disputes.",
      link: "/support/disputes",
      color: "bg-orange-100"
    },
    {
      icon: <FaUsers className="text-green-600 text-2xl" />,
      title: "Agent Assignment",
      description: "Manage support team workload and assign tickets to appropriate agents.",
      link: "/support/assignment",
      color: "bg-green-100"
    },
    {
      icon: <FaChartLine className="text-red-600 text-2xl" />,
      title: "Support Analytics",
      description: "View performance metrics, response times, and customer satisfaction data.",
      link: "/support/analytics",
      color: "bg-red-100"
    },
    {
      icon: <FaClipboardList className="text-yellow-600 text-2xl" />,
      title: "SLA Management",
      description: "Track and manage service level agreements and response time commitments.",
      link: "/support/sla",
      color: "bg-yellow-100"
    },
    {
      icon: <FaRobot className="text-teal-600 text-2xl" />,
      title: "Automated Responses",
      description: "Configure chatbots and automated responses for common customer inquiries.",
      link: "/support/automation",
      color: "bg-teal-100"
    },
    {
      icon: <FaEnvelope className="text-pink-600 text-2xl" />,
      title: "Email Templates",
      description: "Create and manage email templates for customer support communications.",
      link: "/support/email-templates",
      color: "bg-pink-100"
    },
    {
      icon: <FaPhoneAlt className="text-gray-600 text-2xl" />,
      title: "Call Center",
      description: "Manage phone support operations and call routing for customer service.",
      link: "/support/call-center",
      color: "bg-gray-100"
    },
    {
      icon: <FaHeadset className="text-cyan-600 text-2xl" />,
      title: "Support Settings",
      description: "Configure support hours, routing rules, and notification preferences.",
      link: "/support/settings",
      color: "bg-cyan-100"
    }
  ];

  // Stats for the dashboard
  const supportStats = [
    { label: "Open Tickets", value: "24", icon: <FaTicketAlt />, color: "bg-indigo-100 text-indigo-600" },
    { label: "Avg. Response Time", value: "13m", icon: <FaHeadset />, color: "bg-green-100 text-green-600" },
    { label: "Customer Satisfaction", value: "94%", icon: <FaChartLine />, color: "bg-blue-100 text-blue-600" },
    { label: "Unresolved Disputes", value: "7", icon: <FaExclamationTriangle />, color: "bg-red-100 text-red-600" }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <FaQuestionCircle className="text-indigo-600 text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Customer Support</h1>
            <p className="text-gray-500">Manage all aspects of customer support and service</p>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {supportStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-4 border border-indigo-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Quick Access */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/support/tickets" className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
              <FaTicketAlt className="text-indigo-600" />
              <span className="font-medium text-indigo-700">Manage Tickets</span>
            </Link>
            <Link to="/support/chat" className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <FaComments className="text-blue-600" />
              <span className="font-medium text-blue-700">Live Chat</span>
            </Link>
            <Link to="/support/disputes" className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              <FaExclamationTriangle className="text-orange-600" />
              <span className="font-medium text-orange-700">Resolve Disputes</span>
            </Link>
          </div>
        </div>
        
        {/* Support Features */}
        <h2 className="text-xl font-semibold text-gray-800 mt-8">Support Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportFeatures.map((feature, index) => (
            <SupportCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              link={feature.link}
              color={feature.color}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Support;