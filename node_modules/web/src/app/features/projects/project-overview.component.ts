import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-project-overview',
  standalone: true,
  template: `
    <section class="overview">
      <h1>TaskSphere</h1>
      <nav>
        <a routerLink="/kanban">Kanban</a> |
        <a routerLink="/dashboard">Dashboard</a>
      </nav>
    </section>
  `,
  styles: [
    `
      .overview { padding: 1rem; }
      nav a { margin-right: .5rem; }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectOverviewComponent {}


