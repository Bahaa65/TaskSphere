import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer } from '@ngrx/store';

export interface TaskEntity {
  id: string;
  team_id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'review' | 'done' | 'blocked';
}

export interface TasksState extends EntityState<TaskEntity> {
  loadedTeamId: string | null;
}

export const tasksAdapter = createEntityAdapter<TaskEntity>({ selectId: (t) => t.id });

export const initialTasksState: TasksState = tasksAdapter.getInitialState({ loadedTeamId: null });

export const tasksReducer = createReducer(initialTasksState);


