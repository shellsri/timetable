import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Plus, Upload, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useData } from '@/contexts/DataContext';
import { toast } from '@/components/ui/use-toast';

const DataEntry = () => {
  const { 
    departments, setDepartments,
    faculties, setFaculties,
    rooms, setRooms,
    batches, setBatches,
    subjects, setSubjects
  } = useData();

  const [newDepartment, setNewDepartment] = useState({ name: '' });
  const [newFaculty, setNewFaculty] = useState({ 
    name: '', 
    email: '', 
    dept_id: '', 
    max_load_per_day: 6, 
    max_load_per_week: 20 
  });
  const [newRoom, setNewRoom] = useState({ 
    name: '', 
    capacity: '', 
    type: 'classroom', 
    features: [] 
  });

  const addDepartment = () => {
    if (!newDepartment.name.trim()) {
      toast({
        title: "Error",
        description: "Department name is required",
        variant: "destructive"
      });
      return;
    }

    const department = {
      id: Date.now(),
      name: newDepartment.name
    };

    setDepartments([...departments, department]);
    setNewDepartment({ name: '' });
    toast({
      title: "Success!",
      description: "Department added successfully"
    });
  };

  const addFaculty = () => {
    if (!newFaculty.name.trim() || !newFaculty.email.trim()) {
      toast({
        title: "Error",
        description: "Name and email are required",
        variant: "destructive"
      });
      return;
    }

    const faculty = {
      id: Date.now(),
      ...newFaculty,
      dept_id: parseInt(newFaculty.dept_id) || 1,
      max_load_per_day: parseInt(newFaculty.max_load_per_day),
      max_load_per_week: parseInt(newFaculty.max_load_per_week)
    };

    setFaculties([...faculties, faculty]);
    setNewFaculty({ 
      name: '', 
      email: '', 
      dept_id: '', 
      max_load_per_day: 6, 
      max_load_per_week: 20 
    });
    toast({
      title: "Success!",
      description: "Faculty member added successfully"
    });
  };

  const addRoom = () => {
    if (!newRoom.name.trim() || !newRoom.capacity) {
      toast({
        title: "Error",
        description: "Room name and capacity are required",
        variant: "destructive"
      });
      return;
    }

    const room = {
      id: Date.now(),
      ...newRoom,
      capacity: parseInt(newRoom.capacity)
    };

    setRooms([...rooms, room]);
    setNewRoom({ 
      name: '', 
      capacity: '', 
      type: 'classroom', 
      features: [] 
    });
    toast({
      title: "Success!",
      description: "Room added successfully"
    });
  };

  const handleCSVImport = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <>
      <Helmet>
        <title>Data Entry - Timetable Management System</title>
        <meta name="description" content="Manage departments, faculty, rooms, and other data for your timetable system" />
      </Helmet>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">Data Management</h1>
          <p className="text-gray-300">Manage your institutional data efficiently</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-black/20 backdrop-blur-lg rounded-xl border border-white/10"
        >
          <Tabs defaultValue="departments" className="p-6">
            <TabsList className="grid w-full grid-cols-5 bg-white/5">
              <TabsTrigger value="departments">Departments</TabsTrigger>
              <TabsTrigger value="faculty">Faculty</TabsTrigger>
              <TabsTrigger value="rooms">Rooms</TabsTrigger>
              <TabsTrigger value="batches">Batches</TabsTrigger>
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
            </TabsList>

            <TabsContent value="departments" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Departments</h2>
                <Button onClick={handleCSVImport} variant="outline" className="border-white/20 text-white">
                  <Upload className="h-4 w-4 mr-2" />
                  Import CSV
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Add New Department</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="dept-name" className="text-white">Department Name</Label>
                      <Input
                        id="dept-name"
                        value={newDepartment.name}
                        onChange={(e) => setNewDepartment({ name: e.target.value })}
                        className="bg-white/5 border-white/20 text-white"
                        placeholder="e.g., Computer Science"
                      />
                    </div>
                    <Button onClick={addDepartment} className="w-full bg-gradient-to-r from-purple-500 to-pink-500">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Department
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Existing Departments</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {departments.map((dept) => (
                      <div key={dept.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <span className="text-white">{dept.name}</span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost" onClick={handleCSVImport}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={handleCSVImport}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="faculty" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Faculty Members</h2>
                <Button onClick={handleCSVImport} variant="outline" className="border-white/20 text-white">
                  <Upload className="h-4 w-4 mr-2" />
                  Import CSV
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Add New Faculty</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="faculty-name" className="text-white">Name</Label>
                      <Input
                        id="faculty-name"
                        value={newFaculty.name}
                        onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                        className="bg-white/5 border-white/20 text-white"
                        placeholder="Dr. John Smith"
                      />
                    </div>
                    <div>
                      <Label htmlFor="faculty-email" className="text-white">Email</Label>
                      <Input
                        id="faculty-email"
                        type="email"
                        value={newFaculty.email}
                        onChange={(e) => setNewFaculty({ ...newFaculty, email: e.target.value })}
                        className="bg-white/5 border-white/20 text-white"
                        placeholder="john.smith@college.edu"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="max-daily" className="text-white">Max Daily Load</Label>
                        <Input
                          id="max-daily"
                          type="number"
                          value={newFaculty.max_load_per_day}
                          onChange={(e) => setNewFaculty({ ...newFaculty, max_load_per_day: e.target.value })}
                          className="bg-white/5 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="max-weekly" className="text-white">Max Weekly Load</Label>
                        <Input
                          id="max-weekly"
                          type="number"
                          value={newFaculty.max_load_per_week}
                          onChange={(e) => setNewFaculty({ ...newFaculty, max_load_per_week: e.target.value })}
                          className="bg-white/5 border-white/20 text-white"
                        />
                      </div>
                    </div>
                    <Button onClick={addFaculty} className="w-full bg-gradient-to-r from-green-500 to-green-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Faculty
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Existing Faculty</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {faculties.map((faculty) => (
                      <div key={faculty.id} className="p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-white font-medium">{faculty.name}</span>
                            <p className="text-gray-300 text-sm">{faculty.email}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" onClick={handleCSVImport}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={handleCSVImport}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="rooms" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Rooms</h2>
                <Button onClick={handleCSVImport} variant="outline" className="border-white/20 text-white">
                  <Upload className="h-4 w-4 mr-2" />
                  Import CSV
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Add New Room</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="room-name" className="text-white">Room Name</Label>
                      <Input
                        id="room-name"
                        value={newRoom.name}
                        onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                        className="bg-white/5 border-white/20 text-white"
                        placeholder="Room 101"
                      />
                    </div>
                    <div>
                      <Label htmlFor="room-capacity" className="text-white">Capacity</Label>
                      <Input
                        id="room-capacity"
                        type="number"
                        value={newRoom.capacity}
                        onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
                        className="bg-white/5 border-white/20 text-white"
                        placeholder="60"
                      />
                    </div>
                    <Button onClick={addRoom} className="w-full bg-gradient-to-r from-blue-500 to-blue-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Room
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Existing Rooms</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {rooms.map((room) => (
                      <div key={room.id} className="p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-white font-medium">{room.name}</span>
                            <p className="text-gray-300 text-sm">
                              Capacity: {room.capacity} | Type: {room.type}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" onClick={handleCSVImport}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={handleCSVImport}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="batches" className="space-y-6">
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-white mb-4">Batch Management</h3>
                <p className="text-gray-300 mb-6">Manage student batches and their schedules</p>
                <Button onClick={handleCSVImport} className="bg-gradient-to-r from-purple-500 to-pink-500">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Batch
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="subjects" className="space-y-6">
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-white mb-4">Subject Management</h3>
                <p className="text-gray-300 mb-6">Manage subjects and their requirements</p>
                <Button onClick={handleCSVImport} className="bg-gradient-to-r from-purple-500 to-pink-500">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Subject
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </>
  );
};

export default DataEntry;
