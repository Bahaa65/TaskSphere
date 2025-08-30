import { createReducer, on } from '@ngrx/store';

export interface AuthState {
  userId: string | null;
  email: string | null;
  isAuthenticated: boolean;
}

export const initialAuthState: AuthState = {
  userId: null,
  email: null,
  isAuthenticated: false
};

export const authReducer = createReducer(
  initialAuthState
);


