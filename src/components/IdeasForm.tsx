
import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

const IdeasForm = () => {
  const [idea, setIdea] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      toast.success("Thank you for sharing your idea!");
      setIdea("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Card className="p-6 backdrop-blur-sm bg-card/90">
        <h3 className="text-xl font-semibold mb-4">Share Your Thoughts</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Share your ideas and suggestions..."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className="min-h-[120px] resize-none"
          />
          <Button type="submit" className="w-full">
            Submit Idea
          </Button>
        </form>
      </Card>
    </motion.div>
  );
};

export default IdeasForm;
