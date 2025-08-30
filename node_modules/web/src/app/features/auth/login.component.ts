import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SupabaseService } from '../../core/supabase.service';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <section class="login">
      <h1>Login</h1>
      <button (click)="signInWithMagic()">Sign in with Email Magic Link</button>
    </section>
  `,
  styles: [
    `
      .login { padding: 1rem; }
      button { padding: .5rem 1rem; }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  constructor(private readonly supabase: SupabaseService) {}

  async signInWithMagic(): Promise<void> {
    const email = window.prompt('Enter your email');
    if (!email) return;
    await this.supabase.supabase.auth.signInWithOtp({ email });
    alert('Check your email for the login link.');
  }
}


