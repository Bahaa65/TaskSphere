import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  template: `
    <section class="kanban">
      <h1>Kanban</h1>
      <p>Realtime board placeholder.</p>
    </section>
  `,
  styles: [
    `
      .kanban { padding: 1rem; }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KanbanBoardComponent {}


