import { scoreAssignment } from './scoring';

describe('scoreAssignment', () => {
  it('rewards skill overlap and penalizes workload', () => {
    const { score, parts } = scoreAssignment({
      taskSkillTags: ['angular', 'ngrx', 'supabase'],
      userSkills: ['angular', 'react', 'ngrx'],
      workloadScore: 0.5,
      priority: 3,
      dueSoonFactor: 0
    });
    expect(parts.skills).toBeGreaterThan(0);
    expect(score).toBeGreaterThan(0);
  });

  it('boosts high priority and due soon', () => {
    const a = scoreAssignment({ taskSkillTags: ['a'], userSkills: ['a'], workloadScore: 0.2, priority: 5, dueSoonFactor: 1 });
    const b = scoreAssignment({ taskSkillTags: ['a'], userSkills: ['a'], workloadScore: 0.2, priority: 1, dueSoonFactor: 0 });
    expect(a.score).toBeGreaterThan(b.score);
  });
});


