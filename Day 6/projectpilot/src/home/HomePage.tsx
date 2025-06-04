import { useState } from "react";
import { Navigate } from "react-router-dom";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import "../App.css";

interface HomePageProps {
  onAuthChange: () => void;
  isAuthenticated: boolean;
}

const HomePage = ({ onAuthChange, isAuthenticated }: HomePageProps) => {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

  if (isAuthenticated) {
    return <Navigate to="/projects" />;
  }

  return (
    <div className="home-container">
      <div className="button-group">
        <button
          onClick={() => setActiveTab("signin")}
          className={`tab-button ${activeTab === "signin" ? "active" : ""}`}
        >
          Sign In
        </button>
        <button
          onClick={() => setActiveTab("signup")}
          className={`tab-button ${activeTab === "signup" ? "active" : ""}`}
        >
          Sign Up
        </button>
      </div>

      {activeTab === "signin" && (
        <SignInForm
          onClose={() => setActiveTab(null)}
          onAuthSuccess={onAuthChange}
        />
      )}
      {activeTab === "signup" && (
        <SignUpForm onClose={() => setActiveTab(null)}
        onSwitchToSignIn={() => setActiveTab('signin')} />
      )}
    </div>
  );
};

export default HomePage;
