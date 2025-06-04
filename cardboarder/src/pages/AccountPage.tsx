import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { useSavedArticles } from '../hooks/useSavedArticles';
import { mockNewsData } from '../utils/mockData'; // To get full article details from IDs

interface UserProfile {
  displayName: string;
  email: string;
}

const USER_PROFILE_KEY = 'userProfile';

const AccountPage: React.FC = () => {
  const { isLoggedIn, login, logout } = useAuth();
  const { getFullSavedArticles } = useSavedArticles();

  const [profile, setProfile] = useState<UserProfile>(() => {
    const storedProfile = localStorage.getItem(USER_PROFILE_KEY);
    return storedProfile ? JSON.parse(storedProfile) : { displayName: 'TCG Fan', email: 'user@example.com' };
  });
  const [editMode, setEditMode] = useState(false);
  const [tempProfile, setTempProfile] = useState<UserProfile>(profile);

  useEffect(() => {
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
    setTempProfile(profile); // Sync tempProfile when profile changes
  }, [profile]);

  // Get the full article objects for the saved IDs
  const savedArticlesFull = getFullSavedArticles(mockNewsData);

  // Placeholder actions that might involve backend in future
  const handleMockSignUp = () => {
    toast.success('Mock sign-up successful! Welcome!');
    setProfile({ displayName: 'New User', email: 'newuser@example.com' });
    login();
  };

  const handleChangePassword = () => toast.error('Change Password feature is a placeholder for now.', { duration: 4000 });

  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(tempProfile);
    setEditMode(false);
    toast.success('Profile updated successfully!');
  };

  // Shared button styles for consistency
  const baseButtonStyles = "w-full sm:w-auto text-cb-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg focus:outline-none transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 focus:ring-2 focus:ring-opacity-75";
  const primaryBtn = `${baseButtonStyles} bg-cb-blue hover:bg-cb-blue/80 focus:ring-cb-blue`;
  const secondaryBtn = `${baseButtonStyles} bg-cb-orange hover:bg-cb-orange/80 focus:ring-cb-orange`;
  const dangerBtn = `${baseButtonStyles} bg-cb-red hover:bg-cb-red/80 focus:ring-cb-red`;

  // Card styles for sections
  const sectionCardStyles = "p-6 md:p-8 bg-white rounded-xl shadow-xl border border-cb-grey/20";
  const inputStyles = "mt-1 block w-full px-3 py-2 bg-white border border-cb-grey/70 rounded-md shadow-sm focus:outline-none focus:ring-cb-blue focus:border-cb-blue sm:text-sm text-cb-black";

  return (
    <div className="container mx-auto p-4 pt-24 md:pt-28 min-h-screen">
      <h1 className="text-4xl lg:text-5xl font-bold text-cb-purple mb-12 text-center text-shadow-sm">Your Account</h1>

      {isLoggedIn ? (
        <div className="space-y-10 max-w-2xl mx-auto">
          <section className="text-center">
            <h2 className="text-3xl font-semibold text-cb-blue mb-2 text-shadow-xs">Welcome Back, {profile.displayName}!</h2>
            <p className="text-cb-black/80">Manage your profile and saved articles below.</p>
          </section>

          <section className={sectionCardStyles}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-cb-purple">Profile Information</h2>
              {!editMode && (
                <button onClick={() => { setEditMode(true); setTempProfile(profile); }} className={`${secondaryBtn} py-2 px-4 text-sm`}>
                  Edit Profile
                </button>
              )}
            </div>
            {editMode ? (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label htmlFor="displayName" className="block text-sm font-medium text-cb-black">Display Name</label>
                  <input type="text" name="displayName" id="displayName" value={tempProfile.displayName} onChange={handleProfileInputChange} className={inputStyles} />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-cb-black">Email Address</label>
                  <input type="email" name="email" id="email" value={tempProfile.email} onChange={handleProfileInputChange} className={inputStyles} />
                </div>
                <div className="flex gap-4 justify-end pt-2">
                  <button type="button" onClick={() => setEditMode(false)} className={`${dangerBtn} py-2 px-4 text-sm bg-cb-grey hover:bg-cb-grey/80 focus:ring-cb-grey text-cb-black`}>
                    Cancel
                  </button>
                  <button type="submit" className={`${primaryBtn} py-2 px-4 text-sm`}>
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-3">
                <p><strong>Display Name:</strong> {profile.displayName}</p>
                <p><strong>Email:</strong> {profile.email}</p>
              </div>
            )}
          </section>

          <section className={sectionCardStyles}>
            <h2 className="text-2xl font-semibold text-cb-purple mb-6">Saved Articles</h2>
            {savedArticlesFull.length > 0 ? (
              <ul className="space-y-4">
                {savedArticlesFull.map(article => (
                  <li key={article.id} className="p-4 border border-cb-grey/50 rounded-lg hover:bg-cb-grey/20 transition-colors duration-200">
                    <Link to={`/news/${article.id}`} className="font-semibold text-cb-blue hover:text-cb-orange">
                      {article.title}
                    </Link>
                    <p className="text-xs text-cb-black/60 mt-1">Saved on: {new Date(mockNewsData.find(a => a.id === article.id)?.date || Date.now()).toLocaleDateString()} - <span className="italic">Source: {article.source}</span></p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-cb-black/70 py-10">
                <svg className="mx-auto h-12 w-12 text-cb-blue opacity-50 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.5 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>
                <p className="text-lg">You haven't saved any articles yet.</p>
                <p className="text-sm">Browse the <Link to="/news" className="text-cb-blue hover:text-cb-orange underline font-medium">News Page</Link> to find articles to save.</p>
              </div>
            )}
          </section>

          <section className={sectionCardStyles}>
            <h2 className="text-2xl font-semibold text-cb-purple mb-6">Security</h2>
            <div className="flex justify-center">
              <button onClick={handleChangePassword} className={secondaryBtn}>Change Password</button>
            </div>
          </section>

          <section className="text-center mt-8">
            <button onClick={logout} className={dangerBtn}>Log Out</button>
          </section>
        </div>
      ) : (
        <div className={`${sectionCardStyles} max-w-md mx-auto text-center`}>
          <svg className="mx-auto h-16 w-16 text-cb-purple opacity-80 mb-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          <h2 className="text-3xl font-semibold text-cb-purple mb-4">Access Your Account</h2>
          <p className="text-cb-black/80 mb-8 leading-relaxed">
            Log in or sign up to save articles, manage your preferences, and get the full Cardboarder experience!
          </p>
          <div className="space-y-4">
            <button onClick={login} className={primaryBtn}>Log In</button>
            <button onClick={handleMockSignUp} className={secondaryBtn}>Sign Up</button>
          </div>
          <p className="mt-8 text-xs text-cb-black/60">
            By signing up, you agree to our (future) Terms of Service and Privacy Policy.
          </p>
        </div>
      )}
    </div>
  );
};

export default AccountPage; 