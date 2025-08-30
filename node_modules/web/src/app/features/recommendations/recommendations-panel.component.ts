import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-recommendations-panel',
  standalone: true,
  template: `
    <section class="reco">
      <h1>Recommendations</h1>
      <p>Assignment suggestions placeholder.</p>
    </section>
  `,
  styles: [
    `
      .reco { padding: 1rem; }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecommendationsPanelComponent {}


