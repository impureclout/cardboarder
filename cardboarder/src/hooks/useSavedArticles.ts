import { useState, useEffect, useCallback } from 'react';
import type { NewsArticle } from '../utils/mockData'; // Assuming IDs are strings

const SAVED_ARTICLES_KEY = 'savedArticles';

// Helper to get saved articles from localStorage
const getSavedArticlesFromStorage = (): string[] => {
  const saved = localStorage.getItem(SAVED_ARTICLES_KEY);
  return saved ? JSON.parse(saved) : [];
};

// Helper to save articles to localStorage
const saveArticlesToStorage = (articleIds: string[]): void => {
  localStorage.setItem(SAVED_ARTICLES_KEY, JSON.stringify(articleIds));
};

export const useSavedArticles = () => {
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(getSavedArticlesFromStorage());

  // Effect to update localStorage when savedArticleIds change
  useEffect(() => {
    saveArticlesToStorage(savedArticleIds);
  }, [savedArticleIds]);

  const isArticleSaved = useCallback((articleId: string): boolean => {
    return savedArticleIds.includes(articleId);
  }, [savedArticleIds]);

  const toggleSaveArticle = useCallback((articleId: string): void => {
    setSavedArticleIds(prevIds => {
      if (prevIds.includes(articleId)) {
        return prevIds.filter(id => id !== articleId);
      } else {
        return [...prevIds, articleId];
      }
    });
  }, []);

  const getFullSavedArticles = useCallback((allArticles: NewsArticle[]): NewsArticle[] => {
    return allArticles.filter(article => savedArticleIds.includes(article.id));
  }, [savedArticleIds]);


  return { savedArticleIds, isArticleSaved, toggleSaveArticle, getFullSavedArticles };
}; 