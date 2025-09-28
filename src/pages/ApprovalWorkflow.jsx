import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  MessageSquare,
  User,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const ApprovalWorkflow = () => {
  const { timetables, setTimetables } = useData();
  const { user } = useAuth();
  const [selectedTimetable, setSelectedTimetable] = useState(null);

  const pendingTimetables = timetables.filter(t => t.status === 'draft' || t.status === 'pending');
  const approvedTimetables = timetables.filter(t => t.status === 'approved');

  const handleApprove = (timetableId) => {
    setTimetables(timetables.map(t => 
      t.id === timetableId 
        ? { ...t, status: 'approved', approved_by: user.name, approved_at: new Date().toISOString() }
        : t
    ));
    
    toast({
      title: "Timetable Approved! ✅",
      description: "The timetable has been successfully approved and is now active",
    });
  };

  const handleReject = (timetableId) => {
    setTimetables(timetables.map(t => 
      t.id === timetableId 
        ? { ...t, status: 'rejected', rejected_by: user.name, rejected_at: new Date().toISOString() }
        : t
    ));
    
    toast({
      title: "Timetable Rejected",
      description: "The timetable has been rejected and sent back for revision",
      variant: "destructive"
    });
  };

  const handleSubmitForApproval = (timetableId) => {
    setTimetables(timetables.map(t => 
      t.id === timetableId 
        ? { ...t, status: 'pending', submitted_at: new Date().toISOString() }
        : t
    ));
    
    toast({
      title: "Submitted for Approval",
      description: "The timetable has been submitted and is awaiting approval",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'draft': return 'bg-gray-500';
      case 'pending': return 'bg-yellow-500';
      case 'approved': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'draft': return Clock;
      case 'pending': return AlertCircle;
      case 'approved': return CheckCircle;
      case 'rejected': return XCircle;
      default: return Clock;
    }
  };

  return (
    <>
      <Helmet>
        <title>Approval Workflow - Timetable Management System</title>
        <meta name="description" content="Manage timetable approvals with comprehensive workflow tracking" />
      </Helmet>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">Approval Workflow</h1>
          <p className="text-gray-300">Manage timetable approvals and track workflow status</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-6 border border-yellow-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-200 text-sm font-medium">Pending Approval</p>
                <p className="text-3xl font-bold text-white mt-1">{pendingTimetables.length}</p>
              </div>
              <div className="bg-yellow-500/20 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-sm font-medium">Approved</p>
                <p className="text-3xl font-bold text-white mt-1">{approvedTimetables.length}</p>
              </div>
              <div className="bg-green-500/20 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-blue-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm font-medium">Total Timetables</p>
                <p className="text-3xl font-bold text-white mt-1">{timetables.length}</p>
              </div>
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-black/20 backdrop-blur-lg rounded-xl border border-white/10"
        >
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-semibold text-white">Timetable Approval Queue</h2>
          </div>

          <div className="p-6">
            {timetables.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Timetables Available</h3>
                <p className="text-gray-300">Generate timetables to start the approval process</p>
              </div>
            ) : (
              <div className="space-y-4">
                {timetables.map((timetable) => {
                  const StatusIcon = getStatusIcon(timetable.status);
                  return (
                    <motion.div
                      key={timetable.id}
                      whileHover={{ scale: 1.01 }}
                      className="bg-white/5 rounded-lg p-4 border border-white/10"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-lg ${getStatusColor(timetable.status)}/20`}>
                            <StatusIcon className={`h-5 w-5 text-${getStatusColor(timetable.status).split('-')[1]}-400`} />
                          </div>
                          <div>
                            <h3 className="text-white font-medium">{timetable.name}</h3>
                            <div className="flex items-center space-x-4 mt-1">
                              <p className="text-gray-300 text-sm flex items-center">
                                <User className="h-4 w-4 mr-1" />
                                Created by {timetable.created_by}
                              </p>
                              <p className="text-gray-300 text-sm flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(timetable.generated_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Badge className={`${getStatusColor(timetable.status)} text-white`}>
                            {timetable.status.charAt(0).toUpperCase() + timetable.status.slice(1)}
                          </Badge>

                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-white/20 text-white"
                              onClick={() => setSelectedTimetable(timetable)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>

                            {timetable.status === 'draft' && (
                              <Button 
                                size="sm" 
                                onClick={() => handleSubmitForApproval(timetable.id)}
                                className="bg-blue-500 hover:bg-blue-600"
                              >
                                Submit
                              </Button>
                            )}

                            {timetable.status === 'pending' && user.role === 'admin' && (
                              <>
                                <Button 
                                  size="sm" 
                                  onClick={() => handleApprove(timetable.id)}
                                  className="bg-green-500 hover:bg-green-600"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => handleReject(timetable.id)}
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </>
                            )}

                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {timetable.approved_by && (
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <p className="text-green-400 text-sm">
                            ✅ Approved by {timetable.approved_by} on {new Date(timetable.approved_at).toLocaleDateString()}
                          </p>
                        </div>
                      )}

                      {timetable.rejected_by && (
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <p className="text-red-400 text-sm">
                            ❌ Rejected by {timetable.rejected_by} on {new Date(timetable.rejected_at).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ApprovalWorkflow;
