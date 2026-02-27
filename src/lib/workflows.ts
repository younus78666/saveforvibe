export type QuestionType = "text" | "select" | "textarea";

export interface Question {
  id: string;
  label: string;
  type: QuestionType;
  options?: string[];
  placeholder?: string;
}

export interface WorkflowDefinition {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "Development" | "SEO" | "Security" | "Marketing";
  totalSteps: number;
  questions: Question[];
}

export const workflows: WorkflowDefinition[] = [
  {
    id: "saas-builder",
    title: "SaaS Web App",
    description: "Build a full-stack SaaS from scratch with auth, payments and dashboard",
    icon: "🚀",
    category: "Development",
    totalSteps: 9,
    questions: [
      {
        id: "what_does_your_saas_do",
        label: "What does your SaaS do?",
        type: "textarea",
        placeholder: "e.g. A project management tool for freelancers",
      },
      {
        id: "target_user",
        label: "Who is your target user?",
        type: "text",
        placeholder: "e.g. Freelance designers aged 25-40",
      },
      {
        id: "competitor_urls",
        label: "List 3 competitor URLs",
        type: "textarea",
        placeholder: "One URL per line",
      },
      {
        id: "emotional_tone",
        label: "What is your emotional tone?",
        type: "select",
        options: ["Professional", "Playful", "Bold", "Minimal", "Trustworthy"],
      },
      {
        id: "target_country",
        label: "Target country?",
        type: "select",
        options: ["US", "UK", "Canada", "Australia", "Pakistan", "Global"],
      },
    ],
  },
  {
    id: "local-seo",
    title: "Local SEO Website",
    description: "Build and rank a local business website with technical SEO",
    icon: "📍",
    category: "SEO",
    totalSteps: 9,
    questions: [
      {
        id: "business_name",
        label: "Business name and type?",
        type: "text",
        placeholder: "e.g. Ahmed Plumbing Services",
      },
      {
        id: "target_city",
        label: "Target city and area?",
        type: "text",
        placeholder: "e.g. Karachi, Defence area",
      },
      {
        id: "main_services",
        label: "Main services offered?",
        type: "textarea",
        placeholder: "One service per line",
      },
      {
        id: "competitor_urls",
        label: "3 competitor URLs?",
        type: "textarea",
        placeholder: "One URL per line",
      },
      {
        id: "target_country",
        label: "Target country?",
        type: "select",
        options: ["US", "UK", "Canada", "Australia", "Pakistan", "Global"],
      },
    ],
  },
  {
    id: "micro-niche",
    title: "Micro Niche Site",
    description: "Build a topical authority niche site using UC v6.1 framework",
    icon: "🎯",
    category: "SEO",
    totalSteps: 9,
    questions: [
      {
        id: "main_topic",
        label: "What is your main topic/niche?",
        type: "text",
        placeholder: "e.g. Budget mechanical keyboards",
      },
      {
        id: "monetization_method",
        label: "Monetization method?",
        type: "select",
        options: ["Affiliate Marketing", "Display Ads", "Digital Products", "Mixed"],
      },
      {
        id: "target_keyword",
        label: "Target keyword?",
        type: "text",
        placeholder: "e.g. best budget mechanical keyboard",
      },
      {
        id: "competitor_urls",
        label: "3 competitor URLs?",
        type: "textarea",
        placeholder: "One URL per line",
      },
      {
        id: "target_country",
        label: "Target country?",
        type: "select",
        options: ["US", "UK", "Canada", "Australia", "Pakistan", "Global"],
      },
    ],
  },
  {
    id: "ecommerce",
    title: "eCommerce Store",
    description: "Build a full eCommerce store with Stripe payments and product management",
    icon: "🛍️",
    category: "Development",
    totalSteps: 9,
    questions: [
      {
        id: "products",
        label: "What products will you sell?",
        type: "textarea",
        placeholder: "e.g. Handmade leather wallets",
      },
      {
        id: "target_customer",
        label: "Who is your target customer?",
        type: "text",
        placeholder: "e.g. Men aged 25-45 who value quality",
      },
      {
        id: "average_order_value",
        label: "Average order value?",
        type: "select",
        options: ["Under $50", "$50-$100", "$100-$500", "Over $500"],
      },
      {
        id: "competitor_urls",
        label: "3 competitor URLs?",
        type: "textarea",
        placeholder: "One URL per line",
      },
      {
        id: "target_country",
        label: "Target country?",
        type: "select",
        options: ["US", "UK", "Canada", "Australia", "Pakistan", "Global"],
      },
    ],
  },
  {
    id: "security-hardening",
    title: "Security Hardening",
    description: "Audit and harden your web app against OWASP Top 10 vulnerabilities",
    icon: "🔒",
    category: "Security",
    totalSteps: 7,
    questions: [
      {
        id: "tech_stack",
        label: "What is your app built with?",
        type: "text",
        placeholder: "e.g. Next.js + Supabase + Vercel",
      },
      {
        id: "sensitive_data",
        label: "What sensitive data does it handle?",
        type: "select",
        options: ["User Auth Only", "Payments", "Health Data", "Personal/PII", "None"],
      },
      {
        id: "current_stage",
        label: "Current stage?",
        type: "select",
        options: ["MVP/Development", "Pre-Launch", "Live/Production"],
      },
      {
        id: "file_uploads",
        label: "Do you have file uploads?",
        type: "select",
        options: ["Yes", "No"],
      },
      {
        id: "compliance",
        label: "Compliance needed?",
        type: "select",
        options: ["None", "GDPR", "HIPAA", "PCI-DSS", "SOC2"],
      },
    ],
  },
  {
    id: "chrome-extension",
    title: "Chrome Extension",
    description: "Build and publish a Chrome extension with Manifest v3",
    icon: "🧩",
    category: "Development",
    totalSteps: 7,
    questions: [
      {
        id: "extension_description",
        label: "What does your extension do?",
        type: "textarea",
        placeholder: "e.g. Saves highlighted text to Notion automatically",
      },
      {
        id: "target_users",
        label: "Who will use it?",
        type: "text",
        placeholder: "e.g. Researchers and students",
      },
      {
        id: "read_page_content",
        label: "Does it need to read page content?",
        type: "select",
        options: ["Yes", "No"],
      },
      {
        id: "monetization",
        label: "Monetization?",
        type: "select",
        options: ["Free", "One-time Purchase", "Subscription", "Freemium"],
      },
      {
        id: "target_browser",
        label: "Target browser?",
        type: "select",
        options: ["Chrome Only", "Chrome + Edge", "All Chromium Browsers"],
      },
    ],
  },
  {
    id: "landing-page",
    title: "Landing Page",
    description: "Build a conversion-optimized landing page for leads or sales",
    icon: "📣",
    category: "Marketing",
    totalSteps: 7,
    questions: [
      {
        id: "promoting",
        label: "What are you promoting?",
        type: "textarea",
        placeholder: "e.g. A online course about Facebook ads",
      },
      {
        id: "main_goal",
        label: "Main goal of the page?",
        type: "select",
        options: ["Collect Emails", "Book a Call", "Direct Sale", "App Download"],
      },
      {
        id: "traffic_source",
        label: "Traffic source?",
        type: "select",
        options: ["Paid Ads", "Organic SEO", "Social Media", "Email", "Mixed"],
      },
      {
        id: "competitor_urls",
        label: "3 competitor URLs?",
        type: "textarea",
        placeholder: "One URL per line",
      },
      {
        id: "target_country",
        label: "Target country?",
        type: "select",
        options: ["US", "UK", "Canada", "Australia", "Pakistan", "Global"],
      },
    ],
  },
  {
    id: "uc-seo-content",
    title: "UC SEO Content (v6.1)",
    description: "Generate a full UC v6.1 content brief with entities, NLP, schema and 90-day plan",
    icon: "✍️",
    category: "SEO",
    totalSteps: 9,
    questions: [
      {
        id: "target_keyword",
        label: "Target keyword?",
        type: "text",
        placeholder: "e.g. best divorce lawyer in London",
      },
      {
        id: "website_niche",
        label: "Website niche?",
        type: "text",
        placeholder: "e.g. Family Law Services",
      },
      {
        id: "content_type",
        label: "Content type?",
        type: "select",
        options: ["Blog Post", "Service Page", "Product Page", "Landing Page", "Category Page"],
      },
      {
        id: "competitor_urls",
        label: "3 competitor URLs?",
        type: "textarea",
        placeholder: "One URL per line",
      },
      {
        id: "target_country",
        label: "Target country?",
        type: "select",
        options: ["US", "UK", "Canada", "Australia", "Pakistan", "Global"],
      },
    ],
  },
];

export const getWorkflowById = (id: string): WorkflowDefinition | undefined => {
  return workflows.find((w) => w.id === id);
};

export const getWorkflowsByCategory = (category: string): WorkflowDefinition[] => {
  if (category === "All") return workflows;
  return workflows.filter((w) => w.category === category);
};
