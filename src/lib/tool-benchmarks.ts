// AI TOOL BENCHMARKS & CAPABILITIES
// Auto-updating based on API performance and user feedback

export interface AITool {
  id: string;
  name: string;
  provider: string;
  icon: string;
  website: string;
  apiEndpoint?: string;
  pricing: {
    free: boolean;
    freeTier: string;
    paid: string;
  };
  capabilities: {
    codeGeneration: number; // 1-10
    reasoning: number;
    creativity: number;
    contextWindow: number; // in tokens
    speed: number; // 1-10
    accuracy: number;
    multimodal: boolean;
    functionCalling: boolean;
    streaming: boolean;
  };
  bestFor: string[];
  avoidFor: string[];
  models: {
    name: string;
    contextWindow: number;
    costPer1k: number;
    bestFor: string[];
  }[];
  benchmarks: {
    humanEval: number; // Code benchmark
    mmlu: number; // Reasoning
    gsm8k: number; // Math
    mtbench: number; // Multi-turn
  };
  lastUpdated: string;
  status: "active" | "beta" | "deprecated";
}

// PREMIUM AI TOOLS DATABASE
export const aiTools: AITool[] = [
  {
    id: "claude",
    name: "Claude",
    provider: "Anthropic",
    icon: "🟣",
    website: "https://claude.ai",
    apiEndpoint: "https://api.anthropic.com/v1/messages",
    pricing: {
      free: true,
      freeTier: "Claude 3.5 Sonnet",
      paid: "$20/month Pro"
    },
    capabilities: {
      codeGeneration: 9.5,
      reasoning: 9.8,
      creativity: 9.0,
      contextWindow: 200000,
      speed: 8.5,
      accuracy: 9.7,
      multimodal: true,
      functionCalling: true,
      streaming: true
    },
    bestFor: [
      "Complex code generation",
      "Large context projects",
      "System architecture",
      "Security analysis",
      "Long-form content",
      "Vibe coding",
      "Technical documentation"
    ],
    avoidFor: [
      "Real-time chat",
      "Very short queries",
      "Image generation"
    ],
    models: [
      {
        name: "claude-3-5-sonnet-20241022",
        contextWindow: 200000,
        costPer1k: 0.003,
        bestFor: ["General purpose", "Coding", "Analysis"]
      },
      {
        name: "claude-3-opus-20240229",
        contextWindow: 200000,
        costPer1k: 0.015,
        bestFor: ["Complex reasoning", "Creative writing", "Research"]
      },
      {
        name: "claude-3-haiku-20240307",
        contextWindow: 200000,
        costPer1k: 0.00025,
        bestFor: ["Quick tasks", "Classification", "Simple coding"]
      }
    ],
    benchmarks: {
      humanEval: 92,
      mmlu: 88.7,
      gsm8k: 95.0,
      mtbench: 9.1
    },
    lastUpdated: "2025-02-28",
    status: "active"
  },

  {
    id: "gpt4",
    name: "GPT-4o",
    provider: "OpenAI",
    icon: "🟢",
    website: "https://chat.openai.com",
    apiEndpoint: "https://api.openai.com/v1/chat/completions",
    pricing: {
      free: false,
      freeTier: "GPT-4o mini",
      paid: "$20/month Plus"
    },
    capabilities: {
      codeGeneration: 9.0,
      reasoning: 9.3,
      creativity: 9.2,
      contextWindow: 128000,
      speed: 9.5,
      accuracy: 9.4,
      multimodal: true,
      functionCalling: true,
      streaming: true
    },
    bestFor: [
      "Fast responses",
      "Multimodal tasks",
      "General coding",
      "Chat interfaces",
      "API integrations",
      "Content generation"
    ],
    avoidFor: [
      "Very long contexts (>128k)",
      "Complex security analysis",
      "Deep reasoning chains"
    ],
    models: [
      {
        name: "gpt-4o",
        contextWindow: 128000,
        costPer1k: 0.005,
        bestFor: ["General purpose", "Fast coding", "Multimodal"]
      },
      {
        name: "gpt-4o-mini",
        contextWindow: 128000,
        costPer1k: 0.00015,
        bestFor: ["Cost-effective", "Simple tasks", "Batch processing"]
      },
      {
        name: "o1-preview",
        contextWindow: 128000,
        costPer1k: 0.015,
        bestFor: ["Complex reasoning", "Math", "Research"]
      }
    ],
    benchmarks: {
      humanEval: 90,
      mmlu: 87.2,
      gsm8k: 97.6,
      mtbench: 9.4
    },
    lastUpdated: "2025-02-28",
    status: "active"
  },

  {
    id: "gemini",
    name: "Gemini Pro",
    provider: "Google",
    icon: "🔵",
    website: "https://gemini.google.com",
    apiEndpoint: "https://generativelanguage.googleapis.com/v1beta/models",
    pricing: {
      free: true,
      freeTier: "Gemini 1.5 Flash",
      paid: "Pay-per-use"
    },
    capabilities: {
      codeGeneration: 8.5,
      reasoning: 8.8,
      creativity: 8.7,
      contextWindow: 1000000,
      speed: 9.0,
      accuracy: 8.9,
      multimodal: true,
      functionCalling: true,
      streaming: true
    },
    bestFor: [
      "Massive context (1M tokens)",
      "Google ecosystem",
      "Document analysis",
      "Video understanding",
      "Research synthesis"
    ],
    avoidFor: [
      "Code requiring precision",
      "Security-critical code",
      "Production apps"
    ],
    models: [
      {
        name: "gemini-1.5-pro",
        contextWindow: 2000000,
        costPer1k: 0.00125,
        bestFor: ["Large documents", "Research", "Analysis"]
      },
      {
        name: "gemini-1.5-flash",
        contextWindow: 1000000,
        costPer1k: 0.000075,
        bestFor: ["Fast responses", "Cost-effective", "General tasks"]
      }
    ],
    benchmarks: {
      humanEval: 82,
      mmlu: 85.9,
      gsm8k: 94.4,
      mtbench: 8.6
    },
    lastUpdated: "2025-02-28",
    status: "active"
  },

  {
    id: "deepseek",
    name: "DeepSeek Coder",
    provider: "DeepSeek",
    icon: "🟠",
    website: "https://deepseek.com",
    apiEndpoint: "https://api.deepseek.com/v1/chat/completions",
    pricing: {
      free: false,
      freeTier: "Limited",
      paid: "Very cheap"
    },
    capabilities: {
      codeGeneration: 9.2,
      reasoning: 8.5,
      creativity: 8.0,
      contextWindow: 64000,
      speed: 8.5,
      accuracy: 8.8,
      multimodal: false,
      functionCalling: true,
      streaming: true
    },
    bestFor: [
      "Budget coding",
      "Chinese language",
      "Code completion",
      "Batch processing"
    ],
    avoidFor: [
      "Creative writing",
      "Complex reasoning",
      "Multimodal tasks"
    ],
    models: [
      {
        name: "deepseek-coder",
        contextWindow: 64000,
        costPer1k: 0.00014,
        bestFor: ["Code generation", "Debugging", "Refactoring"]
      },
      {
        name: "deepseek-chat",
        contextWindow: 64000,
        costPer1k: 0.00014,
        bestFor: ["General chat", "Q&A"]
      }
    ],
    benchmarks: {
      humanEval: 87,
      mmlu: 75,
      gsm8k: 84,
      mtbench: 8.0
    },
    lastUpdated: "2025-02-28",
    status: "active"
  },

  {
    id: "kimi",
    name: "Kimi K1.5",
    provider: "Moonshot AI",
    icon: "🟡",
    website: "https://kimi.moonshot.cn",
    apiEndpoint: "https://api.moonshot.cn/v1/chat/completions",
    pricing: {
      free: true,
      freeTier: "Generous",
      paid: "Pay-per-use"
    },
    capabilities: {
      codeGeneration: 8.8,
      reasoning: 8.9,
      creativity: 8.5,
      contextWindow: 200000,
      speed: 8.0,
      accuracy: 8.7,
      multimodal: true,
      functionCalling: true,
      streaming: true
    },
    bestFor: [
      "Chinese content",
      "Long context",
      "Document analysis",
      "Asian market"
    ],
    avoidFor: [
      "English-first projects",
      "Production code"
    ],
    models: [
      {
        name: "kimi-k1.5",
        contextWindow: 200000,
        costPer1k: 0.001,
        bestFor: ["Long documents", "Chinese tasks"]
      }
    ],
    benchmarks: {
      humanEval: 85,
      mmlu: 82,
      gsm8k: 89,
      mtbench: 8.3
    },
    lastUpdated: "2025-02-28",
    status: "active"
  }
];

// RECOMMENDATION ENGINE
export const getBestToolForWorkflow = (
  workflowCategory: string,
  stepType: string,
  complexity: "low" | "medium" | "high",
  budget: "free" | "cheap" | "premium"
): AITool[] => {
  const ranked = aiTools
    .filter((tool) => tool.status === "active")
    .map((tool) => {
      let score = 0;

      // Score based on category match
      if (workflowCategory === "Development" && tool.bestFor.includes("Complex code generation")) {
        score += 10;
      }
      if (workflowCategory === "Content" && tool.bestFor.includes("Long-form content")) {
        score += 10;
      }
      if (workflowCategory === "Design" && tool.capabilities.multimodal) {
        score += 10;
      }

      // Score based on complexity
      if (complexity === "high" && tool.capabilities.reasoning >= 9) {
        score += 5;
      }

      // Score based on budget
      if (budget === "free" && tool.pricing.free) {
        score += 10;
      }
      if (budget === "cheap" && tool.models.some((m) => m.costPer1k < 0.001)) {
        score += 5;
      }

      return { tool, score };
    })
    .sort((a, b) => b.score - a.score);

  return ranked.slice(0, 3).map((r) => r.tool);
};

// Get specific model recommendation
export const getBestModel = (toolId: string, task: string): string => {
  const tool = aiTools.find((t) => t.id === toolId);
  if (!tool) return "";

  const model = tool.models.find((m) =>
    m.bestFor.some((bf) => task.toLowerCase().includes(bf.toLowerCase()))
  );

  return model?.name || tool.models[0]?.name || "";
};
