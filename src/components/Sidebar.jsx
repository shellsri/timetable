import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Database, 
  Calendar, 
  Eye, 
  CheckCircle,
  GraduationCap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Data Entry', href: '/data-entry', icon: Database },
  { name: 'Generate Timetable', href: '/generate', icon: Calendar },
  { name: 'View Timetable', href: '/timetable', icon: Eye },
  { name: 'Approval Workflow', href: '/approval', icon: CheckCircle },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <motion.div 
      className="w-64 bg-black/20 backdrop-blur-lg border-r border-white/10"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Timetable</h1>
            <p className="text-sm text-gray-300">Management</p>
          </div>
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                  isActive 
                    ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30" 
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;
