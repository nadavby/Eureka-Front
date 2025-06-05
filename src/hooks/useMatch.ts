/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useEffect } from 'react';
import matchService, { IMatch } from '../services/match-service';
import { useAuth } from './useAuth';

export const useMatch = () => {
  const [matches, setMatches] = useState<IMatch[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();

  const fetchMatches = useCallback(async () => {
    if (!currentUser?._id) return;
    
    setIsLoading(true);
    setError(null);

    const { request, abort } = matchService.getAllByUserId(currentUser._id);
    
    try {
      const response = await request;
      setMatches(response.data);
    } catch (error:any) {
      setError(error.message);
      console.error('[MATCHES] Error fetching matches:', error);
    } finally {
      setIsLoading(false);
    }

    return () => abort();
  }, [currentUser?._id]);

  const getMatch = useCallback(async (matchId: string) => {
    setIsLoading(true);
    setError(null);

    const { request, abort } = matchService.getById(matchId);
    
    try {
      const response = await request;
      return response.data;
    } catch (error: any) {
      setError(error.message);
      console.error('[MATCHES] Error fetching match:', error);
      return null;
    } finally {
      setIsLoading(false);
    }

    return () => abort();
  }, []);

  const deleteMatch = useCallback(async (matchId: string) => {
    setError(null);

    try {
      const { request } = matchService.deleteById(matchId);
      await request;
      setMatches(prev => prev.filter(match => match._id !== matchId));
      return true;
    } catch (error :any) {
      setError(error.message);
      console.error('[MATCHES] Error deleting match:', error);
      return false;
    }
  }, []);

  useEffect(() => {
    if (currentUser?._id) {
      fetchMatches();
    }
  }, [currentUser?._id, fetchMatches]);


  return {
    matches,
    error,
    isLoading,
    fetchMatches,
    getMatch,
    deleteMatch
  };
};


