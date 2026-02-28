// User-specific features that create stickiness

export interface SavedPrompt {
  id: string;
  workflowId: string;
  workflowName: string;
  stepNumber: number;
  stepTitle: string;
  prompt: string;
  createdAt: string;
  tags: string[];
  rating?: number; // 1-5 stars
  notes?: string;
}

export interface AIOutputValidation {
  id: string;
  promptId: string;
  output: string;
  feedback: string;
  score: number; // 0-100
  improvements: string[];
  createdAt: string;
}

export interface CommunityTip {
  id: string;
  workflowId: string;
  stepNumber: number;
  tip: string;
  author: string;
  upvotes: number;
  createdAt: string;
}

// Feature: Smart Prompt Saving with metadata
export const createSmartSave = (
  workflowId: string,
  workflowName: string,
  stepNumber: number,
  stepTitle: string,
  prompt: string,
  userAnswers: Record<string, string>
): SavedPrompt => {
  // Auto-generate tags from user answers
  const tags = Object.values(userAnswers)
    .flatMap(v => v.split(' '))
    .filter(word => word.length > 4)
    .slice(0, 5);
  
  return {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    workflowId,
    workflowName,
    stepNumber,
    stepTitle,
    prompt,
    createdAt: new Date().toISOString(),
    tags: [...new Set(tags)], // unique tags
  };
};

// Feature: AI Output Validator
export const validateAIOutput = (output: string, stepContext: string): AIOutputValidation => {
  const checks = [
    { test: output.length > 500, score: 20, msg: "Sufficient detail" },
    { test: output.includes('```') || output.includes('Step'), score: 20, msg: "Structured format" },
    { test: !output.includes("I cannot"), score: 20, msg: "No refusals" },
    { test: output.split('\n').length > 10, score: 20, msg: "Good formatting" },
    { test: output.length < 15000, score: 20, msg: "Concise enough" },
  ];
  
  const passed = checks.filter(c => c.test);
  const totalScore = passed.reduce((sum, c) => sum + c.score, 0);
  
  const improvements: string[] = [];
  if (totalScore < 60) improvements.push("Add more specific details to your prompt");
  if (!output.includes('test') && !output.includes('check')) improvements.push("Ask AI to include a test checklist");
  if (output.length > 10000) improvements.push("Consider breaking into smaller chunks");
  
  return {
    id: Date.now().toString(),
    promptId: '',
    output: output.substring(0, 500) + '...',
    feedback: passed.map(p => `✅ ${p.msg}`).join('\n'),
    score: totalScore,
    improvements,
    createdAt: new Date().toISOString(),
  };
};

// Feature: Daily Streak Tracking
export interface UserStreak {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  totalWorkflowsCompleted: number;
  totalPromptsGenerated: number;
}

export const updateStreak = (current: UserStreak): UserStreak => {
  const today = new Date().toDateString();
  const lastDate = new Date(current.lastActiveDate).toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  
  let newStreak = current.currentStreak;
  
  if (lastDate === today) {
    // Already active today, no change
  } else if (lastDate === yesterday) {
    newStreak += 1; // Continue streak
  } else {
    newStreak = 1; // Reset streak
  }
  
  return {
    ...current,
    currentStreak: newStreak,
    longestStreak: Math.max(newStreak, current.longestStreak),
    lastActiveDate: new Date().toISOString(),
  };
};

// Feature: Pro Tips based on workflow type
export const getProTips = (workflowId: string, stepNumber: number): string[] => {
  const tips: Record<string, Record<number, string[]>> = {
    "saas-builder": {
      1: ["Be VERY specific about what your SaaS does - vagueness wastes credits", 
          "Mention your top 3 competitors so AI can differentiate"],
      2: ["Color palette should match your target audience's psychology",
          "Save the design system - you'll reference it 20+ times"],
      3: ["Use exact versions - 'latest' breaks things",
          "Test each step before moving to next"],
    },
    "uc-seo-content": {
      1: ["Double-check your keyword spelling - one typo ruins everything",
          "Choose a keyword with 1000-10000 monthly searches for best ROI"],
      2: ["Look for entities your competitors missed",
          "Check Google's "People Also Ask" for question ideas"],
    },
    "micro-niche": {
      1: ["Niche down until uncomfortable - 'best keyboards' is too broad",
          "Check if niche has affiliate potential before starting"],
    },
  };
  
  return tips[workflowId]?.[stepNumber] || [
    "Take your time with answers - quality in = quality out",
    "Keep a notebook of AI responses - you'll need to reference them"
  ];
};
