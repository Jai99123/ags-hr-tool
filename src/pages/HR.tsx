import { motion } from "framer-motion";
import { Users, FileText, ClipboardCheck, Edit, UserPlus, Upload, Download, Calendar, Phone, Mail } from "lucide-react";
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
  email: string;
  department: string;
  assignedPositions: string[];
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  status: "pending" | "active" | "completed" | "rejected";
  joiningDate: string;
  documents: {
    id: string;
    name: string;
    type: string;
    url: string;
  }[];
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
      email: "michael.scott@company.com",
      department: "Technology",
      assignedPositions: ["Senior Developer"],
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      department: "Design",
      assignedPositions: ["UX Designer"],
    },
  ]);

  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+1 234 567 8901",
      position: "Senior Developer",
      status: "pending",
      joiningDate: "2024-03-01",
      documents: [
        {
          id: "doc1",
          name: "Resume",
          type: "pdf",
          url: "#"
        }
      ]
    }
  ]);

  const [editingManager, setEditingManager] = useState<string | null>(null);
  const [newManagerName, setNewManagerName] = useState("");
  const [newManagerEmail, setNewManagerEmail] = useState("");

  const [editingCandidate, setEditingCandidate] = useState<string | null>(null);
  const [newCandidateData, setNewCandidateData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    joiningDate: ""
  });

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
      setNewManagerEmail(manager.email);
    }
  };

  const saveManagerEdit = (managerId: string) => {
    if (newManagerName.trim() && newManagerEmail.trim()) {
      setManagers(managers.map(manager =>
        manager.id === managerId 
          ? { ...manager, name: newManagerName, email: newManagerEmail } 
          : manager
      ));
      setEditingManager(null);
      setNewManagerName("");
      setNewManagerEmail("");
      toast.success("Manager information updated successfully");
    } else {
      toast.error("Please fill in both name and email");
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

  const handleCandidateEdit = (candidateId: string) => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (candidate) {
      setEditingCandidate(candidateId);
      setNewCandidateData({
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        position: candidate.position,
        joiningDate: candidate.joiningDate
      });
    }
  };

  const saveCandidateEdit = (candidateId: string) => {
    if (newCandidateData.name && newCandidateData.email) {
      setCandidates(candidates.map(candidate =>
        candidate.id === candidateId
          ? {
              ...candidate,
              ...newCandidateData
            }
          : candidate
      ));
      setEditingCandidate(null);
      toast.success("Candidate information updated successfully");
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  const handleDocumentUpload = (candidateId: string) => {
    toast.success("Document upload functionality will be implemented here");
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
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
              title="New Hires"
              value="5"
              icon={<UserPlus className="w-6 h-6 text-primary" />}
            />
            <MetricCard
              title="Total Employees"
              value="248"
              icon={<Users className="w-6 h-6 text-primary" />}
            />
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Candidate Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact Info</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joining Date</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {candidates.map((candidate) => (
                      <TableRow key={candidate.id}>
                        <TableCell>
                          {editingCandidate === candidate.id ? (
                            <Input
                              value={newCandidateData.name}
                              onChange={(e) => setNewCandidateData({
                                ...newCandidateData,
                                name: e.target.value
                              })}
                              className="max-w-[200px]"
                              placeholder="Candidate name"
                            />
                          ) : (
                            candidate.name
                          )}
                        </TableCell>
                        <TableCell>
                          {editingCandidate === candidate.id ? (
                            <div className="space-y-2">
                              <Input
                                value={newCandidateData.email}
                                onChange={(e) => setNewCandidateData({
                                  ...newCandidateData,
                                  email: e.target.value
                                })}
                                className="max-w-[200px]"
                                placeholder="Email"
                                type="email"
                              />
                              <Input
                                value={newCandidateData.phone}
                                onChange={(e) => setNewCandidateData({
                                  ...newCandidateData,
                                  phone: e.target.value
                                })}
                                className="max-w-[200px]"
                                placeholder="Phone"
                                type="tel"
                              />
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <span className="text-sm">{candidate.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                <span className="text-sm">{candidate.phone}</span>
                              </div>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingCandidate === candidate.id ? (
                            <Input
                              value={newCandidateData.position}
                              onChange={(e) => setNewCandidateData({
                                ...newCandidateData,
                                position: e.target.value
                              })}
                              className="max-w-[200px]"
                              placeholder="Position"
                            />
                          ) : (
                            candidate.position
                          )}
                        </TableCell>
                        <TableCell>
                          <Select
                            defaultValue={candidate.status}
                            onValueChange={(value) => handleStatusChange(candidate.id, value as Candidate['status'])}
                          >
                            <SelectTrigger className="w-[150px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          {editingCandidate === candidate.id ? (
                            <Input
                              value={newCandidateData.joiningDate}
                              onChange={(e) => setNewCandidateData({
                                ...newCandidateData,
                                joiningDate: e.target.value
                              })}
                              className="max-w-[200px]"
                              type="date"
                            />
                          ) : (
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{candidate.joiningDate}</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDocumentUpload(candidate.id)}
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              Upload
                            </Button>
                            {candidate.documents.map((doc) => (
                              <Badge key={doc.id} variant="secondary" className="flex items-center gap-2">
                                <FileText className="w-3 h-3" />
                                {doc.name}
                                <Download className="w-3 h-3 cursor-pointer" />
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          {editingCandidate === candidate.id ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => saveCandidateEdit(candidate.id)}
                            >
                              Save
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCandidateEdit(candidate.id)}
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
              <CardTitle>Manager Assignment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Manager Name</TableHead>
                      <TableHead>Email Address</TableHead>
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
                              placeholder="Manager name"
                            />
                          ) : (
                            manager.name
                          )}
                        </TableCell>
                        <TableCell>
                          {editingManager === manager.id ? (
                            <Input
                              value={newManagerEmail}
                              onChange={(e) => setNewManagerEmail(e.target.value)}
                              className="max-w-[200px]"
                              placeholder="Email address"
                              type="email"
                            />
                          ) : (
                            <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                              {manager.email}
                            </span>
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
        </motion.div>
      </main>
    </div>
  );
};

export default HR;
