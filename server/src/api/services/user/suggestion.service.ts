import { supabase } from '../../../config/supabase.js';
import { ApiError } from '../../utils/ApiError.js';
import httpStatus from 'http-status';

interface SuggestionData {
  user_id: string;
  pet_id: string;
  title: string;
  content: any; // JSON object with the AI suggestions
  is_favorite?: boolean;
}

const createSuggestion = async (data: SuggestionData) => {
  const { data: suggestion, error } = await supabase
    .from('ai_suggestions')
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error('Error creating suggestion:', error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to save suggestion');
  }

  return suggestion;
};

const getUserSuggestions = async (userId: string, petId?: string) => {
  let query = supabase
    .from('ai_suggestions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (petId) {
    query = query.eq('pet_id', petId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching suggestions:', error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to fetch suggestions');
  }

  return data;
};

const updateSuggestion = async (id: string, updates: Partial<SuggestionData>) => {
  const { data, error } = await supabase
    .from('ai_suggestions')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating suggestion:', error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to update suggestion');
  }

  return data;
};

const deleteSuggestion = async (id: string) => {
  const { error } = await supabase
    .from('ai_suggestions')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting suggestion:', error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to delete suggestion');
  }

  return { success: true };
};

export default {
  createSuggestion,
  getUserSuggestions,
  updateSuggestion,
  deleteSuggestion,
};
