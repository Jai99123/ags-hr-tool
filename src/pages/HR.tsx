
import { motion } from "framer-motion";
import { Users, FileText, ClipboardCheck, UserPlus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import MetricCard from "@/components/MetricCard";
import { useState } from "react";
import { toast } from "sonner";
import CandidateTable from "@/components/hr/CandidateTable";
import ManagerTable from "@/components/hr/ManagerTable";

interface Application {
  id: string;
  candidateName: string;
  email: string;
  position: string;
  status: "new" | "selected" | "rejected";
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

interface Document {
  id: string;
  name: "PAN CARD" | "AADHAR CARD" | "Resume";
  type: string;
  url: string;
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  status: "new" | "selected" | "rejected";
  joiningDate: string;
  notes?: string;
  documents: Document[];
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
      status: "selected",
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
      status: "new",
      joiningDate: "2024-03-01",
      notes: "",
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

  const handleStatusChange = (applicationId: string, newStatus: Application['status']) => {
    setApplications(applications.map(app => 
      app.id === applicationId ? { ...app, status: newStatus } : app
    ));
    toast.success("Application status updated successfully");
  };

  const [editingManager, setEditingManager] = useState<string | null>(null);
  const [newManagerName, setNewManagerName] = useState("");
  const [newManagerEmail, setNewManagerEmail] = useState("");

  const [editingCandidate, setEditingCandidate] = useState<string | null>(null);
  const [newCandidateData, setNewCandidateData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    joiningDate: "",
    notes: "",
    status: "new" as "new" | "selected" | "rejected"
  });

  const [isAddingManager, setIsAddingManager] = useState(false);
  const [newManager, setNewManager] = useState({
    name: "",
    email: "",
    department: "",
    position: ""
  });

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

  const handleCandidateEdit = (candidateId: string) => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (candidate) {
      setEditingCandidate(candidateId);
      setNewCandidateData({
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        position: candidate.position,
        joiningDate: candidate.joiningDate,
        notes: candidate.notes || "",
        status: candidate.status
      });
    }
  };

  const saveCandidateEdit = (candidateId: string) => {
    if (newCandidateData.name && newCandidateData.email) {
      setCandidates(candidates.map(candidate =>
        candidate.id === candidateId
          ? {
              ...candidate,
              ...newCandidateData,
              status: newCandidateData.status
            }
          : candidate
      ));
      setEditingCandidate(null);
      toast.success("Candidate information updated successfully");
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  const handleDocumentUpload = (candidateId: string, documentType: "PAN CARD" | "AADHAR CARD" | "Resume") => {
    const newDocument = {
      id: `doc${Date.now()}`,
      name: documentType,
      type: "pdf",
      url: "#"
    };

    setCandidates(candidates.map(candidate =>
      candidate.id === candidateId
        ? {
            ...candidate,
            documents: [...candidate.documents.filter(d => d.name !== documentType), newDocument]
          }
        : candidate
    ));
    
    toast.success(`${documentType} uploaded successfully`);
  };

  const downloadDocument = (document: Document) => {
    toast.success(`Downloading ${document.name}`);
  };

  const handleNewManagerChange = (field: keyof typeof newManager, value: string) => {
    setNewManager({ ...newManager, [field]: value });
  };

  const handleAddManager = () => {
    if (newManager.name && newManager.email && newManager.department && newManager.position) {
      const manager = {
        id: `${managers.length + 1}`,
        name: newManager.name,
        email: newManager.email,
        department: newManager.department,
        assignedPositions: [newManager.position]
      };

      setManagers([...managers, manager]);
      setIsAddingManager(false);
      setNewManager({ name: "", email: "", department: "", position: "" });
      toast.success("Manager added successfully");
    } else {
      toast.error("Please fill in all fields");
    }
  };

  const sendEmailToManager = (managerEmail: string) => {
    toast.success(`Email sent to ${managerEmail}`);
    console.log('Sending email to:', managerEmail);
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
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Manager Assignment</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddingManager(true)}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add Manager
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <ManagerTable
                  managers={managers}
                  editingManager={editingManager}
                  newManagerName={newManagerName}
                  newManagerEmail={newManagerEmail}
                  isAddingManager={isAddingManager}
                  newManager={newManager}
                  onEdit={handleManagerEdit}
                  onSave={saveManagerEdit}
                  onNewManagerChange={handleNewManagerChange}
                  onAddManager={handleAddManager}
                  onCancelAdd={() => {
                    setIsAddingManager(false);
                    setNewManager({ name: "", email: "", department: "", position: "" });
                  }}
                  onEmailManager={sendEmailToManager}
                  onNewManagerNameChange={setNewManagerName}
                  onNewManagerEmailChange={setNewManagerEmail}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Hiring & Onboarding</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <CandidateTable
                  candidates={candidates}
                  editingCandidate={editingCandidate}
                  newCandidateData={newCandidateData}
                  onEdit={handleCandidateEdit}
                  onSave={saveCandidateEdit}
                  onUpdateCandidateData={setNewCandidateData}
                  onDocumentUpload={handleDocumentUpload}
                  onDocumentDownload={downloadDocument}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default HR;

