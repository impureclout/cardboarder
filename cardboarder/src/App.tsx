import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import HistoryPage from './pages/HistoryPage';
import AccountPage from './pages/AccountPage';
// Removed import './App.css' as Tailwind will be used for styling

function App() {
  return (
    <>
      <Toaster 
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1F2937', // cb-black
            color: '#FFFFFF',    // cb-white
            borderRadius: '8px',
            padding: '12px',
          },
          success: {
            iconTheme: {
              primary: '#A78BFA', // cb-purple
              secondary: '#FFFFFF', // cb-white
            },
          },
          error: {
            iconTheme: {
              primary: '#FCA5A5', // cb-red
              secondary: '#FFFFFF', // cb-white
            },
          },
        }}
      />
      <NavigationBar />
      <main className="pt-20 md:pt-24"> {/* Adjusted padding based on current navbar height and scroll behavior */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<ArticleDetailPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
