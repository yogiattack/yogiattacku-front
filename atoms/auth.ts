import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const accessTokenAtom = atomWithStorage<string | null>('accessToken', null);

// Simple boolean atom for UI state, persisted in localStorage for persistence across reloads (optimistic)
// Real source of truth is the cookie/server
export const isAuthenticatedAtom = atomWithStorage<boolean>('isAuthenticated', false);
