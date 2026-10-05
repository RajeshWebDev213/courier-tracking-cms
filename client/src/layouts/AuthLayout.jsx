import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed left-5 top-5 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-black shadow-sm transition hover:bg-gray-50"
        aria-label="Go back"
      >
        <ArrowLeft size={18} />
      </button>

      {children}
    </div>
  );
};

export default AuthLayout;