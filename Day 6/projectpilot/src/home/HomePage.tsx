import { useState } from 'react';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
 
interface HomePageProps {
  onAuthChange: () => void;
}
 
const HomePage = ({ onAuthChange }: HomePageProps) => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
 
  return (
<div>
<div className="flex justify-end gap-4 p-4">
<button onClick={() => { setShowSignIn(true); setShowSignUp(false); }} className="px-4 py-2 bg-blue-500 text-white rounded">
          Sign In
</button>
<button onClick={() => { setShowSignUp(true); setShowSignIn(false); }} className="px-4 py-2 bg-green-500 text-white rounded">
          Sign Up
</button>
</div>
 
      {showSignIn && <SignInForm onClose={() => setShowSignIn(false)} onAuthSuccess={onAuthChange} />}
      {showSignUp && <SignUpForm onClose={() => setShowSignUp(false)} />}
</div>
  );
};
 
export default HomePage;