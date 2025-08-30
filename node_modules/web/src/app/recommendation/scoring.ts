export interface ScoringInput {
  taskSkillTags: string[];
  userSkills: string[];
  workloadScore: number; // higher means more loaded
  priority: number; // 1..5
  dueSoonFactor: number; // 0..1
}

export interface ScoringBreakdown {
  score: number;
  parts: { [k: string]: number };
}

export function scoreAssignment(input: ScoringInput): ScoringBreakdown {
  const task = new Set(input.taskSkillTags.map((s) => s.toLowerCase()));
  const user = new Set(input.userSkills.map((s) => s.toLowerCase()))
  let intersection = 0;
  task.forEach((t) => { if (user.has(t)) intersection++; });
  const union = new Set([...task, ...user]).size || 1;
  const jaccard = intersection / union; // 0..1

  const workloadPenalty = Math.min(1, input.workloadScore);
  const priorityBoost = (input.priority - 3) / 10; // -0.2..+0.2
  const dueBoost = input.dueSoonFactor * 0.2; // 0..0.2

  const score = Math.max(0, Math.min(1, jaccard * 0.8 - workloadPenalty * 0.3 + priorityBoost + dueBoost));

  return {
    score,
    parts: {
      skills: jaccard,
      workloadPenalty: -workloadPenalty,
      priorityBoost,
      dueBoost
    }
  };
}


