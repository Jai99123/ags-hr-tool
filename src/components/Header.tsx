
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { SignInForm } from "./SignInForm";

const Header = () => {
  const isSignedIn = false; // This would be connected to your auth state
  const location = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-4 px-6 backdrop-blur-sm bg-white/50 fixed top-0 left-0 right-0 z-50 flex justify-between items-center"
    >
      <div className="flex items-center gap-6">
        <Link to="/">
          <h1 className="text-xl font-semibold">HR Dashboard</h1>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Link to="/hr">
            <Button 
              variant={location.pathname === "/hr" ? "default" : "ghost"}
              size="sm"
            >
              HR
            </Button>
          </Link>
        </nav>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            {isSignedIn ? "Sign Out" : "Sign In"}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <SignInForm onClose={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </motion.header>
  );
};

export default Header;
