
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, Edit } from "lucide-react";
import { toast } from "sonner";

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
  status: "new" | "shortlisted" | "interviewing" | "rejected" | "hired";
  joiningDate: string;
  notes?: string;
  documents: Document[];
}

interface CandidateTableProps {
  candidates: Candidate[];
  editingCandidate: string | null;
  newCandidateData: {
    name: string;
    email: string;
    phone: string;
    position: string;
    joiningDate: string;
    notes: string;
  };
  onEdit: (candidateId: string) => void;
  onSave: (candidateId: string) => void;
  onUpdateCandidateData: (data: typeof newCandidateData) => void;
  onDocumentUpload: (candidateId: string, documentType: "PAN CARD" | "AADHAR CARD" | "Resume") => void;
  onDocumentDownload: (document: Document) => void;
}

const CandidateTable = ({
  candidates,
  editingCandidate,
  newCandidateData,
  onEdit,
  onSave,
  onUpdateCandidateData,
  onDocumentUpload,
  onDocumentDownload
}: CandidateTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Candidate Name</TableHead>
          <TableHead>Contact Info</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Status</TableHead>
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
                  onChange={(e) => onUpdateCandidateData({ ...newCandidateData, name: e.target.value })}
                  className="max-w-[200px]"
                  placeholder="Full Name"
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
                    onChange={(e) => onUpdateCandidateData({ ...newCandidateData, email: e.target.value })}
                    className="max-w-[200px]"
                    placeholder="Email"
                    type="email"
                  />
                  <Input
                    value={newCandidateData.phone}
                    onChange={(e) => onUpdateCandidateData({ ...newCandidateData, phone: e.target.value })}
                    className="max-w-[200px]"
                    placeholder="Phone"
                    type="tel"
                  />
                </div>
              ) : (
                <div>
                  <div>{candidate.email}</div>
                  <div className="text-sm text-gray-500">{candidate.phone}</div>
                </div>
              )}
            </TableCell>
            <TableCell>
              {editingCandidate === candidate.id ? (
                <div className="space-y-2">
                  <Input
                    value={newCandidateData.position}
                    onChange={(e) => onUpdateCandidateData({ ...newCandidateData, position: e.target.value })}
                    className="max-w-[200px]"
                    placeholder="Position"
                  />
                  <Input
                    value={newCandidateData.joiningDate}
                    onChange={(e) => onUpdateCandidateData({ ...newCandidateData, joiningDate: e.target.value })}
                    className="max-w-[200px]"
                    type="date"
                  />
                </div>
              ) : (
                <div>
                  <div>{candidate.position}</div>
                  <div className="text-sm text-gray-500">Joining: {candidate.joiningDate}</div>
                </div>
              )}
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  candidate.status === "hired"
                    ? "default"
                    : candidate.status === "rejected"
                    ? "destructive"
                    : "secondary"
                }
              >
                {candidate.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex flex-col gap-2">
                {candidate.documents.map((doc) => (
                  <Button
                    key={doc.id}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => onDocumentDownload(doc)}
                  >
                    <FileText className="w-3 h-3 mr-1" />
                    {doc.name}
                  </Button>
                ))}
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => onDocumentUpload(candidate.id, "Resume")}
                  >
                    Upload Resume
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => onDocumentUpload(candidate.id, "PAN CARD")}
                  >
                    Upload PAN
                  </Button>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                {editingCandidate === candidate.id ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSave(candidate.id)}
                  >
                    Save
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(candidate.id)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const link = `${window.location.origin}/candidate/${candidate.id}`;
                        navigator.clipboard.writeText(link);
                        toast.success("Candidate link copied to clipboard");
                      }}
                    >
                      Generate Link
                    </Button>
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CandidateTable;

