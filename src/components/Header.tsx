
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const Header = () => {
  const isSignedIn = false; // This would be connected to your auth state

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-4 px-6 backdrop-blur-sm bg-white/50 fixed top-0 left-0 right-0 z-50 flex justify-between items-center"
    >
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold">HR Dashboard</h1>
      </div>
      <Button variant="outline">
        {isSignedIn ? "Sign Out" : "Sign In"}
      </Button>
    </motion.header>
  );
};

export default Header;
