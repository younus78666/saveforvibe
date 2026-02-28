// ADVANCED VIBE CODING WORKFLOWS
// Long-form prompts, 15-25 steps, professional grade

export interface SmartQuestion {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "multiselect" | "skip-if-unknown";
  options?: string[];
  placeholder?: string;
  hint?: string;
  allowSkip?: boolean;
  skipLabel?: string;
  followUp?: {
    condition: string;
    questions: SmartQuestion[];
  };
}

export interface AdvancedWorkflow {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  estimatedDays: number;
  totalSteps: number;
  languages: string[];
  questions: SmartQuestion[];
}

// MEGA VIBE CODER WORKFLOW - 20 Steps
export const vibeCoderWorkflow: AdvancedWorkflow = {
  id: "mega-vibe-coder",
  title: "Mega Vibe Coder - Full Stack SaaS",
  description: "Build production-ready SaaS from scratch with AI pair programming. 20 comprehensive steps covering everything from idea to deployment.",
  icon: "🚀",
  category: "Development",
  difficulty: "Advanced",
  estimatedDays: 14,
  totalSteps: 20,
  languages: ["English", "Urdu", "Hindi", "Spanish", "Arabic", "French"],
  questions: [
    {
      id: "app_idea",
      label: "What's your app idea?",
      type: "textarea",
      placeholder: "e.g., A project management tool for freelance designers...",
      hint: "Be specific. The more detail, the better AI can help."
    },
    {
      id: "target_users",
      label: "Who are your target users?",
      type: "textarea",
      placeholder: "e.g., Freelance designers aged 25-40, earning $50k-$100k...",
      hint: "Demographics, pain points, and goals."
    },
    {
      id: "competitors",
      label: "List your top 3 competitors (URLs or names)",
      type: "textarea",
      placeholder: "Notion, Trello, Asana...",
      allowSkip: true,
      skipLabel: "I don't know my competitors yet",
      hint: "This helps AI differentiate your app."
    },
    {
      id: "tech_preference",
      label: "Any tech stack preference?",
      type: "select",
      options: ["Next.js + Supabase (Recommended)", "React + Node + MongoDB", "Vue + Firebase", "Svelte + PostgreSQL", "Let AI decide"],
      hint: "If unsure, select 'Let AI decide'"
    },
    {
      id: "budget_scale",
      label: "What's your budget/scale?",
      type: "select",
      options: ["Free tier only - $0", "Hobby project - Under $50/month", "Startup - $100-500/month", "Scale-ready - $500+/month"],
      hint: "This affects hosting and service recommendations."
    },
    {
      id: "key_features",
      label: "List 3 must-have features",
      type: "textarea",
      placeholder: "1. User authentication\n2. Project boards\n3. Team collaboration",
      hint: "Focus on core functionality."
    },
    {
      id: "design_style",
      label: "Design style preference?",
      type: "select",
      options: ["Clean & Minimal", "Bold & Colorful", "Professional & Corporate", "Playful & Fun", "Dark Mode First"],
    },
    {
      id: "language_preference",
      label: "Prompt language preference?",
      type: "select",
      options: ["English", "اردو (Urdu)", "हिंदी (Hindi)", "Español", "العربية", "Français"],
      hint: "AI will generate prompts in this language"
    }
  ]
};

// IMAGE GENERATION WORKFLOW
export const imageGenWorkflow: AdvancedWorkflow = {
  id: "image-generation-master",
  title: "Image Generation Master - Midjourney/DALL-E/Stable Diffusion",
  description: "Create stunning AI images with professional prompt engineering. Learn advanced techniques for logos, illustrations, marketing materials.",
  icon: "🎨",
  category: "Design",
  difficulty: "Intermediate",
  estimatedDays: 5,
  totalSteps: 15,
  languages: ["English"],
  questions: [
    {
      id: "image_type",
      label: "What type of images you want to create?",
      type: "multiselect",
      options: ["Logo", "Product Photos", "Marketing Banners", "Social Media Graphics", "Illustrations", "Character Design", "UI Mockups", "3D Renders"]
    },
    {
      id: "brand_style",
      label: "Describe your brand style",
      type: "textarea",
      placeholder: "Modern, minimalist, eco-friendly, premium, playful..."
    },
    {
      id: "color_palette",
      label: "Color palette (optional)",
      type: "text",
      placeholder: "#FF6B6B, #4ECDC4, #45B7D1",
      allowSkip: true,
      skipLabel: "I'll decide later"
    },
    {
      id: "target_platform",
      label: "Where will these images be used?",
      type: "multiselect",
      options: ["Website", "Instagram", "Twitter/X", "LinkedIn", "Print Materials", "App Store Screenshots", "YouTube Thumbnails"]
    },
    {
      id: "ai_tool",
      label: "Which AI tool you prefer?",
      type: "select",
      options: ["Midjourney v6", "DALL-E 3", "Stable Diffusion XL", "Adobe Firefly", "Leonardo.ai"]
    }
  ]
};

// MOBILE APP WORKFLOW
export const mobileAppWorkflow: AdvancedWorkflow = {
  id: "mobile-app-vibe",
  title: "Mobile App Vibe Coder - iOS & Android",
  description: "Build cross-platform mobile apps with React Native or Flutter. From prototype to app store submission.",
  icon: "📱",
  category: "Mobile",
  difficulty: "Advanced",
  estimatedDays: 21,
  totalSteps: 18,
  languages: ["English", "Urdu", "Hindi"],
  questions: [
    {
      id: "app_concept",
      label: "What's your mobile app concept?",
      type: "textarea",
      placeholder: "A meditation app for busy professionals..."
    },
    {
      id: "platform",
      label: "Target platform?",
      type: "select",
      options: ["iOS only", "Android only", "Both (React Native)", "Both (Flutter)", "Both (Native)"]
    },
    {
      id: "monetization",
      label: "Monetization strategy?",
      type: "select",
      options: ["Free with ads", "Freemium", "One-time purchase", "Subscription", "Not decided yet"],
      allowSkip: true,
      skipLabel: "Not decided yet"
    },
    {
      id: "offline_capability",
      label: "Does it need to work offline?",
      type: "select",
      options: ["Yes, fully offline", "Partial offline features", "No, online only"]
    },
    {
      id: "backend_needs",
      label: "Backend requirements?",
      type: "multiselect",
      options: ["User Authentication", "Database", "Push Notifications", "In-App Purchases", "Real-time sync", "File Storage"]
    }
  ]
};

// FIGMA UI/UX WORKFLOW
export const figmaWorkflow: AdvancedWorkflow = {
  id: "figma-ui-ux-pro",
  title: "Figma UI/UX Pro - Design System Master",
  description: "Create professional design systems in Figma. Learn auto-layout, components, variants, and design tokens.",
  icon: "🎭",
  category: "Design",
  difficulty: "Intermediate",
  estimatedDays: 7,
  totalSteps: 12,
  languages: ["English", "Urdu"],
  questions: [
    {
      id: "design_project",
      label: "What are you designing?",
      type: "select",
      options: ["Mobile App UI", "Web Dashboard", "E-commerce Website", "Landing Page", "Design System", "SaaS Interface"]
    },
    {
      id: "brand_assets",
      label: "Do you have brand assets?",
      type: "select",
      options: ["Yes - Logo, colors, fonts", "Partial - Just logo", "No - Need to create everything"]
    },
    {
      id: "design_inspiration",
      label: "Any design inspiration references?",
      type: "textarea",
      placeholder: "Apple, Linear, Notion, Airbnb...",
      allowSkip: true,
      skipLabel: "No inspiration yet"
    },
    {
      id: "component_library",
      label: "Need component library?",
      type: "select",
      options: ["Yes - Full design system", "Basic components only", "No - Simple one-off design"]
    }
  ]
};

// WEB APP WORKFLOW
export const webAppWorkflow: AdvancedWorkflow = {
  id: "web-app-complete",
  title: "Web App Complete - Full Stack Application",
  description: "Build complex web applications with real-time features, advanced database design, and enterprise-grade architecture.",
  icon: "🌐",
  category: "Development",
  difficulty: "Expert",
  estimatedDays: 30,
  totalSteps: 25,
  languages: ["English", "Urdu", "Hindi", "Spanish"],
  questions: [
    {
      id: "web_app_idea",
      label: "Describe your web application",
      type: "textarea",
      placeholder: "A real-time collaborative code editor like VS Code Live Share..."
    },
    {
      id: "complexity_level",
      label: "Complexity level?",
      type: "select",
      options: ["Simple CRUD app", "Medium complexity", "High complexity", "Enterprise scale"]
    },
    {
      id: "real_time_features",
      label: "Real-time features needed?",
      type: "multiselect",
      options: ["Live collaboration", "Chat/Messaging", "Notifications", "Live updates", "Video calling", "Not needed"]
    },
    {
      id: "user_types",
      label: "User types/roles?",
      type: "textarea",
      placeholder: "Admin, Manager, Editor, Viewer..."
    },
    {
      id: "scalability",
      label: "Expected scale?",
      type: "select",
      options: ["100-1000 users", "1000-10,000 users", "10,000-100,000 users", "100,000+ users"]
    },
    {
      id: "compliance",
      label: "Compliance requirements?",
      type: "multiselect",
      options: ["GDPR", "HIPAA", "SOC2", "PCI-DSS", "None", "Not sure yet"],
      allowSkip: true,
      skipLabel: "Not sure yet"
    }
  ]
};

// All advanced workflows
export const advancedWorkflows: AdvancedWorkflow[] = [
  vibeCoderWorkflow,
  imageGenWorkflow,
  mobileAppWorkflow,
  figmaWorkflow,
  webAppWorkflow,
];

// Get workflow by ID
export const getAdvancedWorkflow = (id: string): AdvancedWorkflow | undefined => {
  return advancedWorkflows.find(w => w.id === id);
};
