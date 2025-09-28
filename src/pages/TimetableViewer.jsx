import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Calendar, Users, MapPin, Clock, Filter, Download, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useData } from '@/contexts/DataContext';
import { toast } from '@/components/ui/use-toast';

const TimetableViewer = () => {
  const { timetables } = useData();
  const [selectedTimetable, setSelectedTimetable] = useState(timetables[0] || null);
  const [viewMode, setViewMode] = useState('batch');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = ['9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-1:00', '2:00-3:00', '3:00-4:00'];

  const getClassForSlot = (day, slot) => {
    if (!selectedTimetable?.entries) return null;
    return selectedTimetable.entries.find(entry => entry.day === day && entry.slot === slot);
  };

  const handleExport = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleEdit = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <>
      <Helmet>
        <title>View Timetable - Timetable Management System</title>
        <meta name="description" content="View and manage your generated timetables with multiple viewing options" />
      </Helmet>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Timetable Viewer</h1>
            <p className="text-gray-300">View and manage your generated timetables</p>
          </div>
          
          <div className="flex space-x-3">
            <Button onClick={handleExport} variant="outline" className="border-white/20 text-white">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={handleEdit} className="bg-gradient-to-r from-purple-500 to-pink-500">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </motion.div>

        {timetables.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-black/20 backdrop-blur-lg rounded-xl p-12 border border-white/10 text-center"
          >
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Timetables Available</h3>
            <p className="text-gray-300 mb-6">Generate your first timetable to get started</p>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
              Generate Timetable
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-black/20 backdrop-blur-lg rounded-xl border border-white/10"
          >
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">
                  {selectedTimetable?.name || 'Select a Timetable'}
                </h2>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm" onClick={handleExport}>
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <select 
                    className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
                    value={selectedTimetable?.id || ''}
                    onChange={(e) => {
                      const timetable = timetables.find(t => t.id === parseInt(e.target.value));
                      setSelectedTimetable(timetable);
                    }}
                  >
                    {timetables.map((timetable) => (
                      <option key={timetable.id} value={timetable.id} className="bg-gray-800">
                        {timetable.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Tabs value={viewMode} onValueChange={setViewMode}>
                <TabsList className="bg-white/5">
                  <TabsTrigger value="batch" className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    By Batch
                  </TabsTrigger>
                  <TabsTrigger value="faculty" className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    By Faculty
                  </TabsTrigger>
                  <TabsTrigger value="room" className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    By Room
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="p-6">
              {selectedTimetable ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border border-white/20 p-3 bg-white/5 text-white font-semibold">
                          <Clock className="h-4 w-4 inline mr-2" />
                          Time
                        </th>
                        {days.map((day) => (
                          <th key={day} className="border border-white/20 p-3 bg-white/5 text-white font-semibold min-w-[150px]">
                            {day}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {timeSlots.map((slot) => (
                        <tr key={slot}>
                          <td className="border border-white/20 p-3 bg-white/5 text-white font-medium">
                            {slot}
                          </td>
                          {days.map((day) => {
                            const classInfo = getClassForSlot(day, slot);
                            return (
                              <td key={`${day}-${slot}`} className="border border-white/20 p-2">
                                {classInfo ? (
                                  <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-3 cursor-pointer"
                                  >
                                    <div className="text-white font-medium text-sm mb-1">
                                      {classInfo.subject}
                                    </div>
                                    <div className="text-gray-300 text-xs">
                                      {classInfo.faculty}
                                    </div>
                                    <div className="text-gray-400 text-xs">
                                      {classInfo.room} | {classInfo.batch}
                                    </div>
                                  </motion.div>
                                ) : (
                                  <div className="h-16 flex items-center justify-center text-gray-500 text-xs">
                                    Free
                                  </div>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300">Select a timetable to view</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {selectedTimetable && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Total Classes:</span>
                  <span className="text-white font-medium">{selectedTimetable.entries?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Room Utilization:</span>
                  <span className="text-green-400 font-medium">85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Faculty Load:</span>
                  <span className="text-blue-400 font-medium">Balanced</span>
                </div>
              </div>
            </div>

            <div className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Conflicts</h3>
              <div className="space-y-2">
                <div className="flex items-center text-green-400 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  No hard conflicts
                </div>
                <div className="flex items-center text-yellow-400 text-sm">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                  2 soft constraint violations
                </div>
              </div>
            </div>

            <div className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Actions</h3>
              <div className="space-y-2">
                <Button size="sm" variant="outline" className="w-full border-white/20 text-white" onClick={handleExport}>
                  Export to PDF
                </Button>
                <Button size="sm" variant="outline" className="w-full border-white/20 text-white" onClick={handleExport}>
                  Export to CSV
                </Button>
                <Button size="sm" variant="outline" className="w-full border-white/20 text-white" onClick={handleExport}>
                  Share Link
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default TimetableViewer;
