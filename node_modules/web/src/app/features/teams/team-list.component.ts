import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-team-list',
  standalone: true,
  template: `
    <section class="teams">
      <h1>Teams</h1>
      <p>Team list placeholder.</p>
    </section>
  `,
  styles: [
    `
      .teams { padding: 1rem; }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamListComponent {}


