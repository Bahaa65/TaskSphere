import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-integrations-settings',
  standalone: true,
  template: `
    <section class="integrations">
      <h1>Integrations</h1>
      <p>Configure webhooks and email settings.</p>
    </section>
  `,
  styles: [
    `
      .integrations { padding: 1rem; }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntegrationsSettingsComponent {}


