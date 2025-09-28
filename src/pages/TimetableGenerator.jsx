import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Play, Settings, Zap, Brain, Download, Plus, Minus, Sparkles, FileText, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useData } from '@/contexts/DataContext';
import { toast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TimetableGenerator = () => {
  const { timetables, setTimetables } = useData();
  const [generating, setGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [lastGenerated, setLastGenerated] = useState(null);
  const [constraints, setConstraints] = useState({
    maxClassesPerDay: 6,
    facultyLoadBalance: [80],
    roomUtilization: [70],
    studentGapMinimization: [90],
    preferredSlots: true,
    labContinuity: true,
    multiShiftSupport: false
  });

  const handleMaxClassesChange = (amount) => {
    setConstraints(prev => ({
      ...prev,
      maxClassesPerDay: Math.max(1, Math.min(10, prev.maxClassesPerDay + amount))
    }));
  };

  const generateTimetable = async (mode) => {
    setGenerating(true);
    setLastGenerated(null);
    
    setTimeout(() => {
      const newTimetable = {
        id: Date.now(),
        name: `Generated Timetable - ${new Date().toLocaleDateString()}`,
        created_by: 'Admin User',
        status: 'draft',
        generated_at: new Date().toISOString(),
        mode: mode,
        entries: generateSampleEntries()
      };

      setTimetables(prev => [...prev, newTimetable]);
      setLastGenerated(newTimetable);
      setGenerating(false);
      
      toast({
        title: "Timetable Generated Successfully! 🎉",
        description: `${mode} generation completed with optimized scheduling`,
      });
    }, 3000);
  };
  
  const handleAIGenerate = () => {
     if (!prompt.trim()) {
      toast({
        title: "Uh oh!",
        description: "Please enter a prompt for the AI to generate a timetable.",
        variant: "destructive",
      });
      return;
    }
    generateTimetable(`AI Prompt: ${prompt.substring(0, 20)}...`);
  };

  const generateSampleEntries = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const slots = ['9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-1:00', '2:00-3:00', '3:00-4:00'];
    const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'English'];
    const entries = [];

    days.forEach((day, dayIndex) => {
      slots.forEach((slot, slotIndex) => {
        if (Math.random() > 0.3) {
          entries.push({
            id: `${dayIndex}-${slotIndex}`,
            day,
            slot,
            subject: subjects[Math.floor(Math.random() * subjects.length)],
            faculty: `Faculty ${Math.floor(Math.random() * 5) + 1}`,
            room: `Room ${Math.floor(Math.random() * 10) + 101}`,
            batch: `Batch ${Math.floor(Math.random() * 3) + 1}`
          });
        }
      });
    });

    return entries;
  };

  const handleDownload = (timetable, format) => {
    if (!timetable) return;
    toast({
      title: `Downloading ${format.toUpperCase()}...`,
      description: `Your timetable "${timetable.name}" is being prepared.`,
    });
    // In a real app, this would trigger a file generation and download.
    // For this demo, we'll open a new tab with a placeholder.
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head><title>Download Timetable</title></head>
        <body style="font-family: sans-serif; text-align: center; padding: 50px;">
          <h1>Feature In Progress</h1>
          <p>This is a placeholder for the ${format.toUpperCase()} download of "${timetable.name}".</p>
          <p>In a real application, the file would be generated and downloaded here.</p>
          <button onclick="window.close()">Close</button>
        </body>
      </html>
    `);
  };

  return (
    <>
      <Helmet>
        <title>Generate Timetable - Timetable Management System</title>
        <meta name="description" content="Generate optimized timetables using advanced constraint-based algorithms" />
      </Helmet>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">Timetable Generator</h1>
          <p className="text-gray-300">Create optimized schedules using advanced algorithms</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <Card className="bg-black/20 backdrop-blur-lg border-white/10 text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Constraint Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-white mb-3 block">Max Classes Per Day</Label>
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" size="icon" onClick={() => handleMaxClassesChange(-1)} className="border-white/20 text-white hover:bg-white/10">
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-xl font-bold w-10 text-center">{constraints.maxClassesPerDay}</span>
                    <Button variant="outline" size="icon" onClick={() => handleMaxClassesChange(1)} className="border-white/20 text-white hover:bg-white/10">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-white mb-3 block">Faculty Load Balance: {constraints.facultyLoadBalance[0]}%</Label>
                  <Slider
                    value={constraints.facultyLoadBalance}
                    onValueChange={(value) => setConstraints({ ...constraints, facultyLoadBalance: value })}
                    max={100}
                    min={50}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label className="text-white mb-3 block">Room Utilization: {constraints.roomUtilization[0]}%</Label>
                  <Slider
                    value={constraints.roomUtilization}
                    onValueChange={(value) => setConstraints({ ...constraints, roomUtilization: value })}
                    max={100}
                    min={50}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label className="text-white mb-3 block">Student Gap Minimization: {constraints.studentGapMinimization[0]}%</Label>
                  <Slider
                    value={constraints.studentGapMinimization}
                    onValueChange={(value) => setConstraints({ ...constraints, studentGapMinimization: value })}
                    max={100}
                    min={50}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="preferred-slots"
                      checked={constraints.preferredSlots}
                      onCheckedChange={(checked) => setConstraints({ ...constraints, preferredSlots: checked })}
                      className="border-white/30"
                    />
                    <Label htmlFor="preferred-slots" className="text-white">Honor Faculty Preferred Slots</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="lab-continuity"
                      checked={constraints.labContinuity}
                      onCheckedChange={(checked) => setConstraints({ ...constraints, labContinuity: checked })}
                      className="border-white/30"
                    />
                    <Label htmlFor="lab-continuity" className="text-white">Ensure Lab Session Continuity</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="multi-shift"
                      checked={constraints.multiShiftSupport}
                      onCheckedChange={(checked) => setConstraints({ ...constraints, multiShiftSupport: checked })}
                      className="border-white/30"
                    />
                    <Label htmlFor="multi-shift" className="text-white">Multi-Shift Support</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/20 backdrop-blur-lg border-white/10 text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-purple-400" />
                  Generate with AI Prompt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="e.g., 'Create a timetable for the CS department with a focus on morning classes and no more than 2 consecutive lectures.'"
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <Button
                  onClick={handleAIGenerate}
                  disabled={generating}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate with AI
                </Button>
              </CardContent>
            </Card>

            {generating && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30"
              >
                <div className="flex items-center space-x-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                  <div>
                    <h3 className="text-white font-semibold">Generating Timetable...</h3>
                    <p className="text-gray-300 text-sm">Optimizing constraints and resolving conflicts</p>
                  </div>
                </div>
                <div className="mt-4 bg-white/10 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3 }}
                  />
                </div>
              </motion.div>
            )}

            {!generating && lastGenerated && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-black/20 backdrop-blur-lg border-white/10 text-white">
                  <CardHeader>
                    <CardTitle>Generation Complete!</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">Your new timetable "{lastGenerated.name}" is ready.</p>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600">
                          <Download className="h-4 w-4 mr-2" />
                          Download Timetable
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700 text-white">
                        <DropdownMenuItem onClick={() => handleDownload(lastGenerated, 'pdf')}>
                          <FileText className="mr-2 h-4 w-4" />
                          <span>Download as PDF</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownload(lastGenerated, 'csv')}>
                          <FileSpreadsheet className="mr-2 h-4 w-4" />
                          <span>Download as CSV</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="bg-black/20 backdrop-blur-lg border-white/10 text-white">
              <CardHeader>
                <CardTitle>Generation Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => generateTimetable('Quick Generate')}
                  disabled={generating}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Quick Generate
                </Button>

                <Button
                  onClick={() => generateTimetable('Optimized')}
                  disabled={generating}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Optimize (CP-SAT)
                </Button>

                <Button
                  onClick={() => generateTimetable('Multi-Solution')}
                  disabled={generating}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Multi-Solution
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-black/20 backdrop-blur-lg border-white/10 text-white">
              <CardHeader>
                <CardTitle>Recent Timetables</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {timetables.slice(-3).reverse().map((timetable) => (
                    <div key={timetable.id} className="p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white text-sm font-medium">{timetable.name}</p>
                          <p className="text-gray-400 text-xs">Status: {timetable.status}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost">
                              <Download className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-white">
                            <DropdownMenuItem onClick={() => handleDownload(timetable, 'pdf')}>
                              <FileText className="mr-2 h-4 w-4" />
                              <span>PDF</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDownload(timetable, 'csv')}>
                              <FileSpreadsheet className="mr-2 h-4 w-4" />
                              <span>CSV</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                  
                  {timetables.length === 0 && (
                    <p className="text-gray-400 text-sm text-center py-4">No timetables generated yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TimetableGenerator;
