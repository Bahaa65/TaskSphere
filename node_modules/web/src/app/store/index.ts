import { ActionReducerMap } from '@ngrx/store';
import { AuthState, authReducer } from './auth/auth.reducer';
import { TasksState, tasksReducer } from './tasks/tasks.reducer';
import { TeamsState, teamsReducer } from './teams/teams.reducer';

export interface AppState {
  auth: AuthState;
  tasks: TasksState;
  teams: TeamsState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  tasks: tasksReducer,
  teams: teamsReducer
};



