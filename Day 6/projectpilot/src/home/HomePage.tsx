import { useState } from 'react';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import '../App.css';
 
interface HomePageProps {
  onAuthChange: () => void;
}
 
const HomePage = ({ onAuthChange }: HomePageProps) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | null>(null);
 
  return (
    <div className="home-container">
      <div className="button-group">
        <button
          onClick={() => setActiveTab('signin')}
          className={`tab-button ${activeTab === 'signin' ? 'active' : ''}`}
        >
          Sign In
        </button>
        <button
          onClick={() => setActiveTab('signup')}
          className={`tab-button ${activeTab === 'signup' ? 'active' : ''}`}
        >
          Sign Up
        </button>
      </div>
 
      {activeTab === 'signin' && (
        <SignInForm onClose={() => setActiveTab(null)} onAuthSuccess={onAuthChange} />
      )}
      {activeTab === 'signup' && <SignUpForm onClose={() => setActiveTab(null)} />}
    </div>
  );
};
 
export default HomePage;