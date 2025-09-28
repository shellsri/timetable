import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "See you next time!",
    });
  };

  return (
    <motion.header 
      className="bg-black/20 backdrop-blur-lg border-b border-white/10 px-6 py-4"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Welcome back!</h2>
          <p className="text-gray-300">Manage your timetables efficiently</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-white">
            <User className="h-5 w-5" />
            <span className="font-medium">{user?.name}</span>
            <span className="text-sm text-gray-300">({user?.role})</span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
