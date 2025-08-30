import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer } from '@ngrx/store';

export interface TeamEntity { id: string; name: string; owner_id: string; }
export interface TeamsState extends EntityState<TeamEntity> { selectedTeamId: string | null; }

export const teamsAdapter = createEntityAdapter<TeamEntity>({ selectId: (t) => t.id });
export const initialTeamsState: TeamsState = teamsAdapter.getInitialState({ selectedTeamId: null });
export const teamsReducer = createReducer(initialTeamsState);


