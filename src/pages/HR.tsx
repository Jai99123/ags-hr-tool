
import { motion } from "framer-motion";
import { Users, FileText, ClipboardCheck, Download, Edit, UserPlus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import MetricCard from "@/components/MetricCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

interface Application {
  id: string;
  candidateName: string;
  email: string;
  position: string;
  status: "new" | "shortlisted" | "interviewing" | "rejected" | "hired";
  applicationDate: string;
  resumeUrl?: string;
  assignedManager?: string;
}

interface Manager {
  id: string;
  name: string;
  department: string;
  assignedPositions: string[];
}

const HR = () => {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "1",
      candidateName: "John Doe",
      email: "john@example.com",
      position: "Senior Developer",
      status: "new",
      applicationDate: "2024-02-11",
      resumeUrl: "#",
    },
    {
      id: "2",
      candidateName: "Jane Smith",
      email: "jane@example.com",
      position: "UX Designer",
      status: "shortlisted",
      applicationDate: "2024-02-10",
      resumeUrl: "#",
    },
  ]);

  const [managers, setManagers] = useState<Manager[]>([
    {
      id: "1",
      name: "Michael Scott",
      department: "Technology",
      assignedPositions: ["Senior Developer"],
    },
    {
      id: "2",
      name: "Sarah Johnson",
      department: "Design",
      assignedPositions: ["UX Designer"],
    },
  ]);

  const [editingManager, setEditingManager] = useState<string | null>(null);
  const [newManagerName, setNewManagerName] = useState("");

  const handleStatusChange = (applicationId: string, newStatus: Application['status']) => {
    setApplications(applications.map(app => 
      app.id === applicationId ? { ...app, status: newStatus } : app
    ));
    toast.success("Application status updated successfully");
  };

  const getStatusBadgeVariant = (status: Application['status']) => {
    switch (status) {
      case "new": return "default";
      case "shortlisted": return "secondary";
      case "interviewing": return "secondary";
      case "rejected": return "destructive";
      case "hired": return "default";
      default: return "default";
    }
  };

  const downloadResume = (application: Application) => {
    if (application.resumeUrl) {
      toast.success(`Downloading resume for ${application.candidateName}`);
    } else {
      toast.error("No resume available for this candidate");
    }
  };

  const handleManagerEdit = (managerId: string) => {
    const manager = managers.find(m => m.id === managerId);
    if (manager) {
      setEditingManager(managerId);
      setNewManagerName(manager.name);
    }
  };

  const saveManagerEdit = (managerId: string) => {
    if (newManagerName.trim()) {
      setManagers(managers.map(manager =>
        manager.id === managerId ? { ...manager, name: newManagerName } : manager
      ));
      setEditingManager(null);
      setNewManagerName("");
      toast.success("Manager information updated successfully");
    }
  };

  const assignToManager = (applicationId: string, managerId: string) => {
    const manager = managers.find(m => m.id === managerId);
    const application = applications.find(a => a.id === applicationId);
    
    if (manager && application) {
      setManagers(managers.map(m =>
        m.id === managerId
          ? { ...m, assignedPositions: [...m.assignedPositions, application.position] }
          : m
      ));
      setApplications(applications.map(app =>
        app.id === applicationId ? { ...app, assignedManager: manager.name } : app
      ));
      toast.success(`Application assigned to ${manager.name}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="container pt-24 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <MetricCard
              title="Total Applications"
              value={applications.length.toString()}
              icon={<FileText className="w-6 h-6 text-primary" />}
            />
            <MetricCard
              title="Active Positions"
              value="12"
              icon={<ClipboardCheck className="w-6 h-6 text-primary" />}
            />
            <MetricCard
              title="Total Employees"
              value="248"
              icon={<Users className="w-6 h-6 text-primary" />}
            />
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Manager Assignment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Manager Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Assigned Positions</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {managers.map((manager) => (
                      <TableRow key={manager.id}>
                        <TableCell>
                          {editingManager === manager.id ? (
                            <Input
                              value={newManagerName}
                              onChange={(e) => setNewManagerName(e.target.value)}
                              className="max-w-[200px]"
                            />
                          ) : (
                            manager.name
                          )}
                        </TableCell>
                        <TableCell>{manager.department}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-2">
                            {manager.assignedPositions.map((position, index) => (
                              <Badge key={index} variant="secondary">
                                {position}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          {editingManager === manager.id ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => saveManagerEdit(manager.id)}
                            >
                              Save
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleManagerEdit(manager.id)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Applications Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Application Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned Manager</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{application.candidateName}</div>
                            <div className="text-sm text-gray-500">{application.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{application.position}</TableCell>
                        <TableCell>{application.applicationDate}</TableCell>
                        <TableCell>
                          <Select
                            defaultValue={application.status}
                            onValueChange={(value: Application['status']) => 
                              handleStatusChange(application.id, value)
                            }
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue>
                                <Badge variant={getStatusBadgeVariant(application.status)}>
                                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                </Badge>
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="shortlisted">Shortlisted</SelectItem>
                              <SelectItem value="interviewing">Interviewing</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                              <SelectItem value="hired">Hired</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={application.assignedManager}
                            onValueChange={(value) => 
                              assignToManager(application.id, value)
                            }
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue placeholder="Assign Manager">
                                {application.assignedManager || "Assign Manager"}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {managers.map((manager) => (
                                <SelectItem key={manager.id} value={manager.id}>
                                  {manager.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => downloadResume(application)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Resume
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default HR;
