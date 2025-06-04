import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { mockNewsData } from '../utils/mockData';
// import type { NewsArticle } from '../utils/mockData'; // Removed unused import
import { useAuth } from '../contexts/AuthContext';
import { useSavedArticles } from '../hooks/useSavedArticles';

const ArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = mockNewsData.find(article => article.id === id);
  const { isLoggedIn } = useAuth();
  const { isArticleSaved, toggleSaveArticle } = useSavedArticles();
  const navigate = useNavigate();

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24 md:pt-28 text-center min-h-screen">
        <h1 className="text-4xl font-bold text-cb-red mb-6">Article Not Found</h1>
        <p className="text-xl text-cb-black/80 mb-8">Sorry, we couldn't find the article you're looking for.</p>
        <Link 
          to="/news" 
          className="inline-block bg-cb-blue hover:bg-cb-blue/80 text-cb-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
        >
          &larr; Back to News
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  };

  const handleSaveToggle = () => {
    if (!isLoggedIn) {
      toast.error('Please log in to save articles.');
      navigate('/account');
      return;
    }
    if (id) {
      const currentlySaved = isArticleSaved(id);
      toggleSaveArticle(id);
      if (currentlySaved) {
        toast.success('Article unsaved!');
      } else {
        toast.success('Article saved to your account!');
      }
    }
  };

  const isCurrentlySaved = id ? isArticleSaved(id) : false;

  const saveButtonBaseStyle = "font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-opacity-75 text-cb-white w-full sm:w-auto text-center";
  const saveButtonStyle = isCurrentlySaved 
    ? `${saveButtonBaseStyle} bg-cb-red hover:bg-cb-red/80 focus:ring-cb-red` 
    : `${saveButtonBaseStyle} bg-cb-blue hover:bg-cb-blue/80 focus:ring-cb-blue`;

  return (
    <div className="container mx-auto px-4 py-8 pt-24 md:pt-28 min-h-screen">
      <article className="bg-white shadow-2xl rounded-xl overflow-hidden border border-cb-grey/20">
        {article.imageUrl && (
            <img src={article.imageUrl} alt={article.title} className="w-full h-72 md:h-[500px] object-cover" />
        )}
        <div className="p-6 md:p-10 lg:p-12">
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cb-purple mb-3 text-shadow-sm">{article.title}</h1>
            <div className="text-sm text-cb-black/70 space-x-2">
              <span><strong>Source:</strong> {article.source}</span>
              <span>|</span>
              <span><strong>Date:</strong> {formatDate(article.date)}</span>
            </div>
            {article.tcg.length > 0 && (
                <p className="mt-2 text-xs text-cb-black/60">
                    <strong>TCGs:</strong> {article.tcg.join(', ')}
                </p>
            )}
          </header>
          
          <div 
            className="prose prose-lg lg:prose-xl max-w-none text-cb-black 
                       prose-headings:font-heading prose-headings:text-cb-blue 
                       prose-a:text-cb-orange hover:prose-a:text-cb-red prose-strong:text-cb-black
                       prose-img:rounded-lg prose-img:shadow-md"
            dangerouslySetInnerHTML={{ __html: article.fullContent || article.summary }} 
          />
          
          <footer className="mt-10 pt-8 border-t border-cb-grey/30 flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link to="/news" className="text-cb-blue hover:text-cb-orange font-semibold py-2 px-4 rounded-md transition-colors duration-300 hover:underline">
              &larr; Back to All News
            </Link>
            {isLoggedIn && (
              <button 
                className={saveButtonStyle}
                onClick={handleSaveToggle}
                disabled={!id} // Disable if id is somehow undefined
              >
                {isCurrentlySaved ? 'Unsave Article' : 'Save to Account'}
              </button>
            )}
          </footer>
        </div>
      </article>
    </div>
  );
};

export default ArticleDetailPage; 