
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Book, PlayCircle, FileText, Lock } from "lucide-react";

interface CourseCardProps {
  title: string;
  description: string;
  type: "pdf" | "video" | "presentation";
  progress: number;
  category: string;
  isLocked?: boolean;
  onStart: () => void;
  onContinue?: () => void;
}

const CourseCard = ({
  title,
  description,
  type,
  progress,
  category,
  isLocked = false,
  onStart,
  onContinue,
}: CourseCardProps) => {
  const getIcon = () => {
    switch (type) {
      case "pdf":
        return <FileText className="w-4 h-4" />;
      case "video":
        return <PlayCircle className="w-4 h-4" />;
      case "presentation":
        return <Book className="w-4 h-4" />;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {isLocked && <Lock className="w-4 h-4 text-gray-400" />}
        </div>
        <Badge variant="secondary" className="w-fit">
          {category}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          {getIcon()}
          <span className="capitalize">{type}</span>
        </div>
        {progress > 0 && (
          <div className="space-y-1">
            <Progress value={progress} />
            <p className="text-xs text-gray-500 text-right">{progress}% complete</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {progress > 0 ? (
          <Button
            variant="outline"
            className="w-full"
            onClick={onContinue}
            disabled={isLocked}
          >
            Continue Learning
          </Button>
        ) : (
          <Button
            variant="default"
            className="w-full"
            onClick={onStart}
            disabled={isLocked}
          >
            Start Course
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
