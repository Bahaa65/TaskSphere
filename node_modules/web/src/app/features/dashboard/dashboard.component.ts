import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <section class="dashboard">
      <h1>Dashboard</h1>
      <p>Workload and analytics placeholder.</p>
    </section>
  `,
  styles: [
    `
      .dashboard { padding: 1rem; }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {}


