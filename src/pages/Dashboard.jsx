import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom'; // Import Link
import { 
  Users, 
  Calendar, 
  BookOpen, 
  MapPin,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { toast } from '@/components/ui/use-toast'; // Import toast

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`bg-gradient-to-br ${color} rounded-xl p-6 text-white shadow-lg`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-white/80 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
        {trend && (
          <div className="flex items-center mt-2 text-sm">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>{trend}</span>
          </div>
        )}
      </div>
      <div className="bg-white/20 p-3 rounded-lg">
        <Icon className="h-6 w-6" />
      </div>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const { departments, faculties, rooms, timetables, batches } = useData();

  const stats = [
    {
      title: 'Total Departments',
      value: departments.length,
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      trend: '+2 this month'
    },
    {
      title: 'Faculty Members',
      value: faculties.length,
      icon: Users,
      color: 'from-green-500 to-green-600',
      trend: '+5 this month'
    },
    {
      title: 'Available Rooms',
      value: rooms.length,
      icon: MapPin,
      color: 'from-purple-500 to-purple-600',
      trend: '100% utilized'
    },
    {
      title: 'Active Timetables',
      value: timetables.length,
      icon: Calendar,
      color: 'from-orange-500 to-orange-600',
      trend: '3 pending approval'
    }
  ];

  const recentActivity = [
    { id: 1, action: 'New timetable generated', time: '2 hours ago', status: 'success' },
    { id: 2, action: 'Faculty schedule updated', time: '4 hours ago', status: 'info' },
    { id: 3, action: 'Room conflict detected', time: '6 hours ago', status: 'warning' },
    { id: 4, action: 'Timetable approved', time: '1 day ago', status: 'success' }
  ];

  const handleExportReports = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - Timetable Management System</title>
        <meta name="description" content="Overview of your college timetable management system with key metrics and recent activity" />
      </Helmet>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
          <p className="text-gray-300">Monitor your timetable management system at a glance</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-white text-sm">{activity.action}</p>
                    <p className="text-gray-400 text-xs">{activity.time}</p>
                  </div>
                  {activity.status === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
                  {activity.status === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/generate" className="block">
                <button className="w-full text-left p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30 text-white hover:from-purple-500/30 hover:to-pink-500/30 transition-all">
                  Generate New Timetable
                </button>
              </Link>
              <Link to="/data-entry" className="block">
                <button className="w-full text-left p-3 bg-white/5 rounded-lg border border-white/10 text-white hover:bg-white/10 transition-all">
                  Import Faculty Data
                </button>
              </Link>
              <Link to="/approval" className="block">
                <button className="w-full text-left p-3 bg-white/5 rounded-lg border border-white/10 text-white hover:bg-white/10 transition-all">
                  View Pending Approvals
                </button>
              </Link>
              <button onClick={handleExportReports} className="w-full text-left p-3 bg-white/5 rounded-lg border border-white/10 text-white hover:bg-white/10 transition-all">
                Export Reports
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
