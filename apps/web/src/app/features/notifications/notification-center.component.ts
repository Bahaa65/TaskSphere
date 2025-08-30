import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-notification-center',
  standalone: true,
  template: `
    <section class="notifications">
      <h1>Notification Center</h1>
      <p>Realtime alerts placeholder.</p>
    </section>
  `,
  styles: [
    `
      .notifications { padding: 1rem; }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationCenterComponent {}


