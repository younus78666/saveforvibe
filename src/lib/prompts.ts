export interface WorkflowStep {
  stepNumber: number;
  title: string;
  description: string;
  aiTool: "Claude" | "Kimi" | "Gemini" | "Any";
  prompt: string;
  testChecklist: string[];
  estimatedTime: string;
  contextNote: string;
}

export interface PromptsLibrary {
  [workflowId: string]: WorkflowStep[];
}

// Helper to replace placeholders in prompt templates
export const replacePlaceholders = (
  prompt: string,
  answers: Record<string, string>
): string => {
  let result = prompt;

  // Replace all {{KEY}} with answer values
  Object.entries(answers).forEach(([key, value]) => {
    const placeholder = new RegExp(`{{${key.toUpperCase().replace(/-/g, "_")}}}`, "g");
    result = result.replace(placeholder, value || "");
  });

  // Replace generic placeholders
  result = result.replace(/{{PROJECT_NAME}}/g, answers.what_does_your_saas_do?.split(" ").slice(0, 3).join(" ") || "My Project");
  result = result.replace(/{{SLUG}}/g, answers.what_does_your_saas_do?.toLowerCase().replace(/[^a-z0-9]+/g, "-").substring(0, 20) || "my-project");
  result = result.replace(/{{WHAT_IT_DOES}}/g, answers.what_does_your_saas_do || "");
  result = result.replace(/{{TARGET_USER}}/g, answers.target_user || "");
  result = result.replace(/{{COMPETITORS}}/g, answers.competitor_urls || "");
  result = result.replace(/{{TONE}}/g, answers.emotional_tone || "");
  result = result.replace(/{{COUNTRY}}/g, answers.target_country || "");
  result = result.replace(/{{INDUSTRY}}/g, answers.what_does_your_saas_do?.split(" ").pop() || "SaaS");
  
  // UC SEO Content placeholders
  result = result.replace(/{{TARGET_KEYWORD}}/g, answers.target_keyword || "");
  result = result.replace(/{{NICHE}}/g, answers.website_niche || "");
  result = result.replace(/{{CONTENT_TYPE}}/g, answers.content_type || "");

  return result;
};

// Get step for a specific workflow
export const getWorkflowStep = (
  workflowId: string,
  stepNumber: number
): WorkflowStep | undefined => {
  const steps = promptsLibrary[workflowId];
  if (!steps) return undefined;
  return steps.find((s) => s.stepNumber === stepNumber);
};

// Get total steps for workflow
export const getTotalSteps = (workflowId: string): number => {
  return promptsLibrary[workflowId]?.length || 0;
};

// Prompts Library
export const promptsLibrary: PromptsLibrary = {
  "saas-builder": [
    {
      stepNumber: 1,
      title: "Master Setup & Context Lock",
      description: "Send this first to lock your AI into your project context",
      aiTool: "Any",
      prompt: `You are my expert AI development partner for building a SaaS web app called "{{PROJECT_NAME}}".

STRICT RULES — Follow these throughout entire project:
❌ Never suggest a different tech stack
❌ Never install packages I haven't approved
❌ Never modify existing files unless I specifically say so
❌ Never skip TypeScript types
❌ Never use <form> tags — always use onClick handlers
❌ Never write code without a test checklist at the end
✅ Always write production-ready code
✅ Always tell me exactly which files to create or modify
✅ Always wait for my test confirmation before giving next task
✅ One task at a time only

PROJECT DETAILS:
- App Name: {{PROJECT_NAME}}
- What it does: {{WHAT_IT_DOES}}
- Target user: {{TARGET_USER}}
- Competitors: {{COMPETITORS}}
- Emotional tone: {{TONE}}
- Stack: Next.js 14, TypeScript, Tailwind CSS, App Router, Supabase, Vercel
- Target Country: {{COUNTRY}}

Confirm you understood everything. Say "{{PROJECT_NAME}} Ready" and wait for Task 1.`,
      testChecklist: [
        "AI replied with project name + Ready confirmation",
        "AI did NOT start writing code yet",
        "AI is waiting for Task 1",
        "Re-read your project details — are they correct?",
      ],
      estimatedTime: "2 minutes",
      contextNote: "This locks the AI into your context — never skip this step",
    },
    {
      stepNumber: 2,
      title: "Brand Identity System",
      description: "Generate your complete visual design system before writing any code",
      aiTool: "Any",
      prompt: `TASK 1 — Brand Identity System

You are a Senior Brand Designer at Pentagram.

PROJECT: {{PROJECT_NAME}} — {{WHAT_IT_DOES}}
Industry: {{INDUSTRY}}
Emotional tone: {{TONE}}
Competitors to differentiate from: {{COMPETITORS}}
Target country: {{COUNTRY}}

STRICT RULES:
❌ Do NOT write any code yet
❌ Do NOT suggest a tech stack
✅ Design decisions only
✅ Format as design-system.md

Deliver exactly:
1. Color palette — 5 hex codes with names and usage rules (primary/secondary/accent/bg/text) and WCAG AA contrast ratios
2. Typography — heading font, body font, mono font with Google Fonts links and CSS fallback stacks
3. Spacing scale — 4px base: 4, 8, 12, 16, 24, 32, 48, 64, 96px
4. Border radius — card, button, input, modal values
5. Shadow system — 3 elevation levels with CSS box-shadow values
6. Animation timing — ease functions for: hover, page load, modal open, error shake
7. Anti-patterns — 5 design choices to explicitly avoid for this brand

Wait for my approval before any next step.`,
      testChecklist: [
        "Color palette has 5 colors with hex codes",
        "Typography shows 3 fonts with Google Fonts links",
        "Border radius values defined for card, button, input",
        "Anti-patterns list has 5 items",
        "AI is waiting — did NOT start coding",
      ],
      estimatedTime: "5 minutes",
      contextNote: "Save this output — you will reference it in every future step",
    },
    {
      stepNumber: 3,
      title: "Project Scaffolding",
      description: "Create the Next.js project with your exact brand tokens configured",
      aiTool: "Any",
      prompt: `TASK 2 — Project Setup and Folder Structure

PROJECT CONTEXT:
- App: {{PROJECT_NAME}}
- Design tokens from Task 1: [PASTE YOUR COLORS AND FONTS HERE]

STRICT RULES:
❌ Do NOT skip any step
❌ Do NOT use different packages
❌ Do NOT add features not listed
✅ Exact commands only
✅ Test checklist at end

WHAT TO CREATE:
1. New Next.js 14 app:
npx create-next-app@latest {{SLUG}} --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

2. Install only these packages:
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs lucide-react clsx

3. tailwind.config.ts — add brand colors from Task 1 design system

4. src/lib/supabase.ts — Supabase client using env variables

5. .env.local:
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
ANTHROPIC_API_KEY=your-key

6. src/app/layout.tsx — Inter font, dark background, correct metadata

7. src/app/page.tsx — placeholder "{{PROJECT_NAME}} loading..."

EXPECTED OUTPUT:
- Exactly 5 files created
- Zero errors on npm run dev

TEST CHECKLIST:
□ npm run dev runs without errors
□ localhost:3000 shows placeholder text
□ No TypeScript errors
□ tailwind.config.ts has brand colors
□ .env.local exists with 3 variables
□ Browser console zero errors`,
      testChecklist: [
        "npm run dev runs without errors",
        "localhost:3000 loads correctly",
        "tailwind.config.ts has correct brand colors",
        ".env.local has all 3 variables",
        "Zero TypeScript errors in terminal",
      ],
      estimatedTime: "10 minutes",
      contextNote: "Run each command one by one — do not copy all at once",
    },
    {
      stepNumber: 4,
      title: "Authentication System",
      description: "Build login, register and protected dashboard with Supabase auth",
      aiTool: "Any",
      prompt: `TASK 3 — Authentication (Login + Register + Protected Dashboard)

PROJECT CONTEXT:
- App: {{PROJECT_NAME}}
- Stack: Next.js 14, TypeScript, Tailwind, Supabase
- Design: bg #09090B, cards #18181B, accent from brand system, border #27272A
- Supabase client at: src/lib/supabase.ts

STRICT RULES:
❌ Do NOT modify tailwind.config.ts
❌ Do NOT modify src/lib/supabase.ts
❌ Do NOT install new packages
❌ Do NOT use <form> tags — onClick handlers only
✅ TypeScript types on everything

WHAT TO CREATE:
1. src/app/(auth)/layout.tsx — fullscreen centered wrapper
2. src/app/(auth)/login/page.tsx — email + password, error state, redirect to /dashboard
3. src/app/(auth)/register/page.tsx — name + email + password, success confirmation
4. src/app/(dashboard)/layout.tsx — dashboard wrapper
5. src/app/(dashboard)/dashboard/page.tsx — protected, shows user email, sign out button

DESIGN:
- Cards: #18181B bg, rounded-xl, 32px padding, #27272A border
- Inputs: #18181B bg, #27272A border, white text, focus ring brand accent
- Button: brand accent bg, white text, rounded-lg

EXPECTED OUTPUT:
- Exactly 5 new files
- Zero existing files modified

TEST CHECKLIST:
□ /login loads with email + password fields
□ /register loads with name + email + password
□ Register → success message shows
□ Supabase dashboard → user created
□ Login → redirects to /dashboard
□ Dashboard shows user email
□ Sign out works
□ /dashboard without login → redirects to /login
□ Zero console errors`,
      testChecklist: [
        "Login page loads at /login",
        "Register page loads at /register",
        "Can register a new user",
        "User appears in Supabase Auth dashboard",
        "Login redirects to /dashboard",
        "Sign out works correctly",
      ],
      estimatedTime: "15 minutes",
      contextNote: "Disable email confirmation in Supabase Auth settings for faster testing",
    },
    {
      stepNumber: 5,
      title: "Database Schema & Credits System",
      description: "Create profiles and workflows tables with automatic credit tracking",
      aiTool: "Any",
      prompt: `TASK 4 — Database Schema + User Credits System

PROJECT CONTEXT:
- App: {{PROJECT_NAME}}
- Stack: Next.js 14, TypeScript, Tailwind, Supabase

STRICT RULES:
❌ Do NOT touch existing auth files
❌ Do NOT modify existing code
❌ Do NOT install new packages
✅ Give SQL to run in Supabase SQL Editor only
✅ Update dashboard page only

PART A — SUPABASE SQL:

Give me complete SQL for:

1. profiles table:
- id (uuid, primary key, references auth.users)
- full_name (text)
- email (text)
- plan (text, default 'free')
- credits (integer, default 3)
- created_at (timestamp with timezone, default now())

2. workflows table:
- id (uuid, primary key, default gen_random_uuid())
- user_id (uuid, references profiles.id)
- project_type (text)
- project_name (text)
- answers (jsonb)
- current_step (integer, default 1)
- total_steps (integer, default 9)
- status (text, default 'active')
- created_at (timestamp with timezone, default now())

3. Auto-create profile trigger:
- Function that runs on every new auth.users insert
- Copies id, email, raw_user_meta_data->full_name into profiles

4. RLS Policies:
- profiles: users can only select/update their own row
- workflows: users can only select/insert/update/delete their own rows

5. Indexes:
- workflows on user_id
- profiles on id

PART B — UPDATE DASHBOARD PAGE:
Add these features:
- Fetch user profile from profiles table
- Show credits remaining as a badge top right
- Show list of past workflows
- Add "Start New Workflow" button

TEST CHECKLIST:
□ Run SQL in Supabase → zero errors
□ Register new account → profile auto-created
□ Dashboard shows "3 Credits Left" badge
□ Dashboard shows workflows list
□ Zero console errors`,
      testChecklist: [
        "SQL runs without errors in Supabase",
        "Profiles table auto-creates on new user",
        "Dashboard shows credits badge",
        "Dashboard shows workflows list",
        "Zero TypeScript errors",
      ],
      estimatedTime: "10 minutes",
      contextNote: "Run the SQL exactly as given — do not modify the table structure",
    },
    {
      stepNumber: 6,
      title: "Core Feature UI",
      description: "Build the main application functionality and user interface",
      aiTool: "Any",
      prompt: `TASK 5 — Core Feature UI

PROJECT CONTEXT:
- App: {{PROJECT_NAME}}
- Stack: Next.js 14, TypeScript, Tailwind, Supabase
- Design system: [REFERENCE FROM TASK 1]

STRICT RULES:
❌ Do NOT change existing files unless specified
❌ Do NOT skip any component
❌ Do NOT use <form> tags — onClick handlers only
✅ TypeScript types on everything
✅ Match design system exactly

WHAT TO CREATE:

[STEP 6 PROMPT — Will be populated dynamically based on user answers]

TEST CHECKLIST:
□ All new components created
□ Components match design system
□ TypeScript types defined
□ Zero console errors
□ UI is responsive on mobile`,
      testChecklist: [
        "Feature UI components created",
        "Design system matches Task 1",
        "TypeScript types complete",
        "Mobile responsive works",
        "Zero console errors",
      ],
      estimatedTime: "20 minutes",
      contextNote: "Reference your brand system constantly — consistency is key",
    },
    {
      stepNumber: 7,
      title: "AI Integration Layer",
      description: "Connect to Claude API and set up prompt management system",
      aiTool: "Any",
      prompt: `TASK 6 — AI Integration Layer

PROJECT CONTEXT:
- App: {{PROJECT_NAME}}
- Stack: Next.js 14, TypeScript, Tailwind, Supabase
- AI: Claude API via Anthropic

STRICT RULES:
❌ Do NOT expose API keys to client
❌ Do NOT skip error handling
❌ Do NOT call API from client components
✅ Use Next.js API routes only
✅ Rate limiting required
✅ Error messages must be user-friendly

WHAT TO CREATE:

[STEP 7 PROMPT — Will be populated dynamically based on user answers]

TEST CHECKLIST:
□ API route created at /api/ai
□ API key stored securely in env vars
□ Error handling for all API failures
□ Rate limiting implemented
□ Client shows loading states
□ Zero console errors`,
      testChecklist: [
        "API route secure and working",
        "API key not exposed to client",
        "Error handling covers all cases",
        "Rate limiting active",
        "Loading states visible to user",
      ],
      estimatedTime: "15 minutes",
      contextNote: "Never expose your Anthropic API key in frontend code",
    },
    {
      stepNumber: 8,
      title: "SEO & Performance Optimization",
      description: "Add meta tags, sitemap, robots.txt and optimize Core Web Vitals",
      aiTool: "Any",
      prompt: `TASK 7 — SEO + Performance

PROJECT CONTEXT:
- App: {{PROJECT_NAME}}
- Stack: Next.js 14, TypeScript, Tailwind, Supabase
- Target Country: {{COUNTRY}}

STRICT RULES:
❌ Do NOT skip meta tags
❌ Do NOT forget Open Graph images
❌ Do NOT ignore Core Web Vitals
✅ Every page needs unique meta
✅ Images optimized with next/image
✅ Lighthouse score 90+ required

WHAT TO CREATE:

[STEP 8 PROMPT — Will be populated dynamically based on user answers]

TEST CHECKLIST:
□ Meta tags on all pages
□ Open Graph tags complete
□ Sitemap.xml generated
□ robots.txt created
□ Lighthouse score 90+
□ Images use next/image
□ Zero console errors`,
      testChecklist: [
        "All pages have unique meta titles/descriptions",
        "Open Graph image configured",
        "Sitemap accessible at /sitemap.xml",
        "robots.txt accessible at /robots.txt",
        "Lighthouse performance 90+",
        "All images use next/image",
      ],
      estimatedTime: "10 minutes",
      contextNote: "SEO done late is SEO never done — do this properly",
    },
    {
      stepNumber: 9,
      title: "Deploy to Production",
      description: "Push to GitHub and deploy on Vercel with environment variables",
      aiTool: "Any",
      prompt: `TASK 8 — Deploy to Production

PROJECT CONTEXT:
- App: {{PROJECT_NAME}}
- Platform: Vercel
- Git: GitHub

STRICT RULES:
❌ Do NOT deploy with placeholder env vars
❌ Do NOT skip build check locally
❌ Do NOT forget to add env vars in Vercel
✅ Build must pass locally first
✅ All env vars copied exactly
✅ Custom domain configured (if owned)

WHAT TO CREATE:

[STEP 9 PROMPT — Will be populated dynamically based on user answers]

TEST CHECKLIST:
□ GitHub repo created and pushed
□ Build passes locally (npm run build)
□ Vercel project created
□ All env vars added to Vercel
□ Deploy successful
□ Site loads at custom domain
□ Zero console errors on production
□ Auth works on production`,
      testChecklist: [
        "GitHub repo has all files",
        "Local build passes",
        "Vercel deploy successful",
        "Environment variables set",
        "Production site loads correctly",
        "Auth works on production URL",
        "Zero console errors",
      ],
      estimatedTime: "10 minutes",
      contextNote: "Test everything on production — local working doesn't mean deploy works",
    },
  ],
  "uc-seo-content": [
    {
      stepNumber: 1,
      title: "Master Setup & Context Lock",
      description: "Lock the AI into your SEO project context with UC framework rules",
      aiTool: "Any",
      prompt: `You are my expert SEO content strategist trained in Koray Tugberk's UC v6.1 framework.

STRICT RULES:
❌ Never skip any UC step
❌ Never give generic SEO advice
❌ Never recommend content length without justification
✅ Always use entity-based analysis
✅ Always wait for my confirmation between phases
✅ Format every output as structured markdown

PROJECT DETAILS:
- Target Keyword: {{TARGET_KEYWORD}}
- Website Niche: {{NICHE}}
- Content Type: {{CONTENT_TYPE}}
- Competitors: {{COMPETITORS}}
- Target Country: {{COUNTRY}}

Confirm understanding. Say "UC Analysis Ready for: {{TARGET_KEYWORD}}" and wait for Phase 1.`,
      testChecklist: [
        "AI confirmed keyword correctly",
        "AI is waiting — did NOT start analysis yet",
        "Check your keyword spelling is correct",
        "Confirm competitors URLs are correct",
      ],
      estimatedTime: "2 minutes",
      contextNote: "Double check your keyword before sending — fixing it later wastes credits",
    },
    {
      stepNumber: 2,
      title: "Entity & EAV Analysis",
      description: "Extract entities, attributes, values from top competitors (UC Steps 1-6)",
      aiTool: "Any",
      prompt: `PHASE 1 — Entity & EAV Analysis (UC Steps 1-6)

Target Keyword: {{TARGET_KEYWORD}}
Competitors: {{COMPETITORS}}

Perform:
1. Search Intent Analysis — identify query type (informational, commercial, etc.)
2. SERP Feature Analysis — what appears (featured snippets, PAA, etc.)
3. Entity Extraction — list 20+ entities mentioned across competitors
4. EAV Structure — for top 10 entities, extract:
   - Attributes (what describes the entity)
   - Values (specific facts/data)
5. Knowledge Gap Analysis — what are competitors missing?
6. Content Angle — unique angle based on gaps

Format as structured markdown with tables and lists.

Wait for my confirmation before Phase 2.`,
      testChecklist: [
        "20+ entities listed",
        "EAV structure complete for top 10",
        "Knowledge gaps identified",
        "Unique angle proposed",
        "AI is waiting for Phase 2 confirmation",
      ],
      estimatedTime: "15 minutes",
      contextNote: "This analysis determines your content's topical authority potential",
    },
    {
      stepNumber: 3,
      title: "NLP & N-gram Analysis",
      description: "Analyze term frequency, TF-IDF, and semantic coverage (UC Steps 7-12)",
      aiTool: "Any",
      prompt: `PHASE 2 — NLP & N-gram Analysis (UC Steps 7-12)

Target Keyword: {{TARGET_KEYWORD}}

Perform:
1. Term Frequency Analysis — top 50 terms across competitors
2. N-gram Analysis — 2-gram and 3-gram patterns (top 30 each)
3. TF-IDF Scoring — which terms are most important for this query
4. Semantic Field Mapping — topic clusters and relationships
5. Question Analysis — what questions need answers (from PAA, forums)
6. Content Gap Matrix — what sections are missing from competitors

Output as structured tables and lists.

Wait for confirmation before Phase 3.`,
      testChecklist: [
        "50 terms analyzed with frequency",
        "N-grams (2-gram, 3-gram) complete",
        "TF-IDF scoring applied",
        "Question inventory created",
        "Content gap matrix complete",
      ],
      estimatedTime: "15 minutes",
      contextNote: "N-grams reveal the exact language Google expects to see",
    },
    {
      stepNumber: 4,
      title: "Content Outline & Meta Optimization",
      description: "Create H1-H6 structure, meta tags, and URL optimization (UC Steps 13-16)",
      aiTool: "Any",
      prompt: `PHASE 3 — Content Outline + Meta Optimization (UC Steps 13-16)

Target Keyword: {{TARGET_KEYWORD}}
Content Type: {{CONTENT_TYPE}}
Country: {{COUNTRY}}

Create:
1. Optimized URL slug
2. Title Tag (60 chars max, CTR-optimized)
3. Meta Description (155 chars, compelling CTA)
4. H1 (main headline)
5. H2-H6 outline structure (minimum 15 headings)
   - Include entities from Phase 1
   - Address questions from Phase 2
   - Cover content gaps identified
6. Internal linking recommendations
7. Featured snippet optimization opportunities

Format as complete content brief section.`,
      testChecklist: [
        "URL slug is keyword-optimized",
        "Title tag under 60 characters",
        "Meta description under 155 characters with CTA",
        "H2-H6 structure has 15+ headings",
        "Entities integrated into headings",
        "Featured snippet opportunities identified",
      ],
      estimatedTime: "10 minutes",
      contextNote: "Your outline is the blueprint — be comprehensive here",
    },
    {
      stepNumber: 5,
      title: "RankMath Technical Checklist",
      description: "Generate on-page SEO checklist for RankMath/WP implementation (UC Steps 17-18)",
      aiTool: "Any",
      prompt: `PHASE 4 — RankMath Technical SEO (UC Steps 17-18)

For: {{TARGET_KEYWORD}}

Create complete RankMath checklist:

1. Focus Keyword Settings
   - Primary keyword
   - Secondary keywords (5-7)
   - LSI keywords (10-15)

2. Content Optimization
   - Keyword density target
   - First paragraph inclusion
   - H1-H6 keyword placement
   - Image alt text requirements
   - Internal link suggestions

3. Readability
   - Target Flesch score
   - Sentence length guidelines
   - Paragraph structure rules

4. Schema Requirements
   - Recommended schema types
   - Required properties

Wait for confirmation before Phase 5.`,
      testChecklist: [
        "Primary + 5-7 secondary keywords defined",
        "LSI keyword list complete (10-15)",
        "Keyword density specified",
        "Schema types recommended",
        "Internal linking suggestions provided",
      ],
      estimatedTime: "8 minutes",
      contextNote: "This checklist ensures your content is technically optimized",
    },
    {
      stepNumber: 6,
      title: "Schema Markup Generation",
      description: "Generate JSON-LD schema markup for maximum SERP features",
      aiTool: "Any",
      prompt: `PHASE 5 — Schema Markup Generation

Content Type: {{CONTENT_TYPE}}
Target: {{TARGET_KEYWORD}}

Generate complete JSON-LD schema:

1. Article/BlogPosting schema (or appropriate type)
2. FAQPage schema (if applicable)
3. HowTo schema (if applicable)
4. Organization schema
5. BreadcrumbList schema
6. WebPage schema

Include all required properties:
- @context, @type
- headline, description
- author, publisher
- datePublished, dateModified
- image requirements
- mainEntityOfPage

Output as copy-paste ready JSON-LD.`,
      testChecklist: [
        "Article schema complete and valid",
        "FAQPage schema included if applicable",
        "HowTo schema included if applicable",
        "Organization schema present",
        "All required properties filled",
        "JSON is valid (test with validator)",
      ],
      estimatedTime: "8 minutes",
      contextNote: "Schema markup can double your SERP real estate",
    },
    {
      stepNumber: 7,
      title: "Humanization & Writing Rules",
      description: "Define tone, voice, and anti-AI-detection writing guidelines",
      aiTool: "Any",
      prompt: `PHASE 6 — Humanization & Writing Guidelines

Content Type: {{CONTENT_TYPE}}
Target Country: {{COUNTRY}}

Define:

1. Tone & Voice Guidelines
   - Writing style (professional, casual, etc.)
   - Point of view (1st, 2nd, 3rd person)
   - Sentence variety targets
   - Transition word usage

2. Anti-AI-Detection Rules
   - Vary sentence length (short + long mix)
   - Use contractions naturally
   - Include occasional fragments
   - Personal anecdotes placeholder
   - Opinion statements required

3. Content Quality Standards
   - Fact-checking requirements
   - Source citation rules
   - Expert quote integration
   - Statistical data requirements

4. E-E-A-T Signals
   - Author bio requirements
   - External authority links
   - YMYL considerations (if applicable)

Provide specific examples for each rule.`,
      testChecklist: [
        "Tone guidelines specific and actionable",
        "Anti-AI rules include examples",
        "E-E-A-T signals defined",
        "Source citation rules clear",
        "Examples provided for each rule type",
      ],
      estimatedTime: "8 minutes",
      contextNote: "Human-sounding content ranks better and converts higher",
    },
    {
      stepNumber: 8,
      title: "90-Day Content Plan",
      description: "Create topical authority roadmap with supporting articles (UC Step 19)",
      aiTool: "Any",
      prompt: `PHASE 7 — 90-Day Content Plan (UC Step 19)

Target Keyword: {{TARGET_KEYWORD}}
Niche: {{NICHE}}

Create comprehensive content strategy:

WEEK 1-2: Foundation
- Pillar content: [Main article structure]
- Supporting articles (3-5)
- Internal linking map

WEEK 3-4: Authority Building
- Entity-focused articles (3)
- Question-answer content (5)
- Comparison articles (2)

MONTH 2: Topical Coverage
- Sub-topic deep dives (6)
- Update/refreshes of existing content
- Featured snippet targeting articles (4)

MONTH 3: Expansion
- Related topic expansion (4)
- Seasonal/trending content (2)
- Expert roundup/interviews (2)

For each piece:
- Target keyword
- Content type
- Priority (High/Medium/Low)
- Internal links to/from`,
      testChecklist: [
        "Week 1-2 has 4-6 articles planned",
        "Week 3-4 has 10+ pieces planned",
        "Month 2 has 10+ pieces planned",
        "Month 3 has 8+ pieces planned",
        "Internal linking strategy defined",
        "Priority levels assigned",
      ],
      estimatedTime: "10 minutes",
      contextNote: "Topical authority requires consistent publishing over time",
    },
    {
      stepNumber: 9,
      title: "Final Brief Export",
      description: "Compile all phases into one master document ready for writing",
      aiTool: "Any",
      prompt: `PHASE 8 — Final Brief Compilation

Target Keyword: {{TARGET_KEYWORD}}

Compile complete master brief:

=== EXECUTIVE SUMMARY ===
- Target keyword
- Search intent
- Recommended word count
- Difficulty assessment

=== ENTITY MAP ===
[Insert from Phase 1]

=== N-GRAM INSIGHTS ===
[Insert from Phase 2]

=== CONTENT STRUCTURE ===
[Insert from Phase 3]

=== META DATA ===
[Insert from Phase 3]

=== SCHEMA CODE ===
[Insert from Phase 5]

=== WRITING RULES ===
[Insert from Phase 6]

=== 90-DAY PLAN ===
[Insert from Phase 7]

=== QUICK REFERENCE ===
- Primary keyword
- Secondary keywords (list)
- Must-include entities (top 10)
- Questions to answer (all from PAA)
- Internal linking targets
- External authority links (minimum 3)

This brief is ready for your writer.`,
      testChecklist: [
        "All 8 phases compiled into one document",
        "Executive summary at top",
        "Quick reference section at bottom",
        "Word count recommendation included",
        "Document is ready to hand to writer",
      ],
      estimatedTime: "5 minutes",
      contextNote: "This is your single source of truth — keep it updated as you write",
    },
  ],
};

// Get all available workflow IDs
export const getAvailableWorkflowIds = (): string[] => {
  return Object.keys(promptsLibrary);
};

// Check if workflow has prompts defined
export const hasPrompts = (workflowId: string): boolean => {
  return workflowId in promptsLibrary;
};
