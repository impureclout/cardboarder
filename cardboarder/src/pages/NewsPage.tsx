import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom'; // For linking to article detail page
import { mockNewsData, TCG_CATEGORIES } from '../utils/mockData';
import type { NewsArticle } from '../utils/mockData';

type DateSortOption = 'newest' | 'oldest' | 'thisWeek';

const NewsPage: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [dateSortOrder, setDateSortOrder] = useState<DateSortOption>('newest');
  const [selectedTcgFilters, setSelectedTcgFilters] = useState<string[]>([]);

  // Simulate fetching data and initial sort
  useEffect(() => {
    let processedArticles = [...mockNewsData];

    if (dateSortOrder === 'thisWeek') {
      const today = new Date();
      const dayOfWeek = today.getDay(); // Sunday = 0, Saturday = 6
      
      const startDateOfWeek = new Date(today);
      startDateOfWeek.setDate(today.getDate() - dayOfWeek);
      startDateOfWeek.setHours(0, 0, 0, 0); // Start of Sunday

      const endDateOfWeek = new Date(startDateOfWeek);
      endDateOfWeek.setDate(startDateOfWeek.getDate() + 6);
      endDateOfWeek.setHours(23, 59, 59, 999); // End of Saturday

      processedArticles = processedArticles.filter(article => {
        const articleDate = new Date(article.date);
        return articleDate >= startDateOfWeek && articleDate <= endDateOfWeek;
      });
      // Then sort this week's articles by newest
      processedArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (dateSortOrder === 'newest') {
      processedArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else { // 'oldest'
      processedArticles.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    setArticles(processedArticles);
  }, [dateSortOrder]); // Re-sort when dateSortOrder changes

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      if (selectedTcgFilters.length === 0) return true; // No TCG filter applied
      return selectedTcgFilters.some(filterTcg => article.tcg.includes(filterTcg));
    });
  }, [articles, selectedTcgFilters]);

  const handleTcgFilterChange = (tcg: string) => {
    setSelectedTcgFilters(prevFilters => 
      prevFilters.includes(tcg) 
        ? prevFilters.filter(f => f !== tcg) 
        : [...prevFilters, tcg]
    );
  };

  const clearAllFilters = () => {
    setSelectedTcgFilters([]);
    setDateSortOrder('newest'); // Reset sort order too
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="container mx-auto p-4 pt-24 md:pt-28 min-h-screen"> {/* Adjusted top padding for fixed navbar */}
      <h1 className="text-4xl lg:text-5xl font-bold text-cb-purple mb-10 text-center text-shadow-sm">Latest TCG News</h1>

      {/* Filtering Section */}
      <aside className="mb-10 p-6 bg-cb-grey/50 backdrop-blur-sm rounded-xl shadow-lg border border-cb-grey/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {/* Date Sort */}
          <div>
            <label htmlFor="dateSort" className="block text-sm font-medium text-cb-black mb-1">Sort/Filter by Date:</label>
            <select 
              id="dateSort" 
              value={dateSortOrder}
              onChange={(e) => setDateSortOrder(e.target.value as DateSortOption)}
              className="w-full p-3 border border-cb-black/30 rounded-lg shadow-sm focus:ring-2 focus:ring-cb-blue focus:border-cb-blue bg-white transition-all duration-300 ease-in-out"
            >
              <option value="newest">Newest to Oldest</option>
              <option value="oldest">Oldest to Newest</option>
              <option value="thisWeek">This Week</option>
            </select>
          </div>

          {/* TCG Filter */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-cb-black mb-2">Filter by TCG:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-3">
              {TCG_CATEGORIES.map(tcg => (
                <label key={tcg} className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-cb-blue/20 transition-colors duration-200 group">
                  <input 
                    type="checkbox" 
                    checked={selectedTcgFilters.includes(tcg)}
                    onChange={() => handleTcgFilterChange(tcg)}
                    className="h-5 w-5 rounded border-cb-black/40 text-cb-blue focus:ring-2 focus:ring-cb-blue focus:ring-offset-1 focus:ring-offset-cb-grey/50 transition-all duration-300 ease-in-out transform group-hover:scale-110"
                  />
                  <span className="text-sm text-cb-black group-hover:text-cb-purple transition-colors duration-200">{tcg}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 text-right">
          <button 
            onClick={clearAllFilters}
            className="py-2 px-5 bg-cb-red text-cb-white rounded-lg hover:bg-cb-red/80 focus:outline-none focus:ring-2 focus:ring-cb-red focus:ring-opacity-75 transition-all duration-300 ease-in-out transform hover:scale-105 text-sm font-medium shadow-md hover:shadow-lg"
          >
            Clear All Filters
          </button>
        </div>
      </aside>

      {/* News Feed Display */}
      {filteredArticles.length > 0 ? (
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredArticles.map(article => (
            <article 
              key={article.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 ease-in-out border border-cb-grey/30 hover:border-cb-purple/50"
            >
              <Link to={`/news/${article.id}`} className="block overflow-hidden">
                <img src={article.imageUrl} alt={article.title} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
              </Link>
              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-lg font-bold text-cb-purple mb-2 group-hover:text-cb-orange transition-colors duration-300">
                  <Link to={`/news/${article.id}`}>{article.title}</Link>
                </h2>
                <p className="text-cb-black/80 text-sm mb-4 flex-grow leading-relaxed">{article.summary}</p>
                <div className="text-xs text-cb-black/60 mt-auto pt-3 border-t border-cb-grey/50">
                  <p><strong>Source:</strong> {article.source}</p>
                  <p><strong>Date:</strong> {formatDate(article.date)}</p>
                  <p className="mt-1"><strong>TCGs:</strong> {article.tcg.join(', ')}</p>
                </div>
              </div>
            </article>
          ))}
        </main>
      ) : (
        <div className="text-center py-12">
            <svg className="mx-auto h-16 w-16 text-cb-blue opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
            <h3 className="mt-2 text-xl font-semibold text-cb-black">No Articles Found</h3>
            <p className="mt-1 text-sm text-cb-black/70">No news articles match your current filters. Try adjusting your selection or clearing the filters.</p>
        </div>
      )}
    </div>
  );
};

export default NewsPage; 