
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Download } from "lucide-react";
import CourseCard from "./CourseCard";
import CourseUpload from "./CourseUpload";

// Mock data - replace with actual data from your backend
const mockCourses = [
  {
    id: 1,
    title: "Introduction to AGS Technologies",
    description: "Learn about our core technologies and development practices.",
    type: "presentation" as const,
    progress: 0,
    category: "Technical",
    isLocked: false,
  },
  {
    id: 2,
    title: "Effective Communication",
    description: "Master the art of professional communication in the workplace.",
    type: "video" as const,
    progress: 45,
    category: "Soft Skills",
    isLocked: false,
  },
  {
    id: 3,
    title: "Leadership Fundamentals",
    description: "Essential leadership skills for emerging managers.",
    type: "pdf" as const,
    progress: 0,
    category: "Leadership",
    isLocked: true,
  },
];

const LearningDashboard = () => {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const handleDownloadReport = () => {
    // Implement report download functionality
    console.log("Downloading progress report...");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Learning Dashboard</h2>
        <div className="flex gap-2">
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Upload Course
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Upload New Course</DialogTitle>
              </DialogHeader>
              <CourseUpload onClose={() => setIsUploadDialogOpen(false)} />
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={handleDownloadReport}>
            <Download className="w-4 h-4 mr-2" />
            Progress Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="soft-skills">Soft Skills</TabsTrigger>
          <TabsTrigger value="leadership">Leadership</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockCourses.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                description={course.description}
                type={course.type}
                progress={course.progress}
                category={course.category}
                isLocked={course.isLocked}
                onStart={() => console.log(`Starting course: ${course.title}`)}
                onContinue={() => console.log(`Continuing course: ${course.title}`)}
              />
            ))}
          </div>
        </TabsContent>

        {["technical", "soft-skills", "leadership", "compliance"].map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockCourses
                .filter((course) => course.category.toLowerCase() === category)
                .map((course) => (
                  <CourseCard
                    key={course.id}
                    title={course.title}
                    description={course.description}
                    type={course.type}
                    progress={course.progress}
                    category={course.category}
                    isLocked={course.isLocked}
                    onStart={() => console.log(`Starting course: ${course.title}`)}
                    onContinue={() => console.log(`Continuing course: ${course.title}`)}
                  />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default LearningDashboard;
