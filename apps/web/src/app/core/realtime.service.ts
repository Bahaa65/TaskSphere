import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RealtimeService {
  constructor(private readonly supabase: SupabaseService) {}

  onTeamTasks(teamId: string): Observable<unknown> {
    return new Observable((subscriber) => {
      const channel = this.supabase
        .supabase
        .channel(`team:${teamId}:tasks`)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks', filter: `team_id=eq.${teamId}` }, (payload) => {
          subscriber.next(payload);
        })
        .subscribe();

      return () => {
        this.supabase.supabase.removeChannel(channel);
      };
    });
  }
}


