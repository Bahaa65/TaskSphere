import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/projects/project-overview.component').then(m => m.ProjectOverviewComponent)
  },
  {
    path: 'kanban',
    loadComponent: () => import('./features/kanban/kanban-board.component').then(m => m.KanbanBoardComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'teams',
    loadComponent: () => import('./features/teams/team-list.component').then(m => m.TeamListComponent)
  },
  {
    path: 'recommendations',
    loadComponent: () => import('./features/recommendations/recommendations-panel.component').then(m => m.RecommendationsPanelComponent)
  },
  {
    path: 'notifications',
    loadComponent: () => import('./features/notifications/notification-center.component').then(m => m.NotificationCenterComponent)
  },
  {
    path: 'integrations',
    loadComponent: () => import('./features/integrations/integrations-settings.component').then(m => m.IntegrationsSettingsComponent)
  }
];
