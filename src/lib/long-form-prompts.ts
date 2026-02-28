// LONG-FORM PROMPT TEMPLATES (2000+ words)
// Professional grade, comprehensive, vibe coding optimized

export interface LongFormStep {
  stepNumber: number;
  title: string;
  description: string;
  aiTool: string;
  estimatedTime: string;
  wordCount: number;
  prompt: string;
  testChecklist: string[];
  deliverables: string[];
  commonMistakes: string[];
  nextStepHint: string;
}

// MEGA VIBE CODER - 20 Steps
export const megaVibeCoderSteps: LongFormStep[] = [
  {
    stepNumber: 1,
    title: "AI Context Lock & Project Inception",
    description: "Establish deep context with your AI pair programmer. This is THE most critical step.",
    aiTool: "Claude",
    estimatedTime: "10-15 min",
    wordCount: 2500,
    prompt: `You are now my elite AI Software Development Partner. We are co-founding a SaaS startup together. This is not a one-off task - this is a long-term partnership to build a production-grade application.

═══════════════════════════════════════════════════════════
                    PROJECT BRIEF
═══════════════════════════════════════════════════════════

APPLICATION NAME: {{PROJECT_NAME}}
CORE CONCEPT: {{APP_IDEA}}
TARGET USERS: {{TARGET_USERS}}

COMPETITIVE LANDSCAPE:
{{#if COMPETITORS}}
Direct Competitors: {{COMPETITORS}}
{{else}}
Market Gap: First-mover advantage in this specific niche
{{/if}}

TECH STACK (Confirmed):
- Frontend: Next.js 14 (App Router)
- Styling: Tailwind CSS
- Backend: Supabase (PostgreSQL + Auth + Realtime)
- Deployment: Vercel
- Language: TypeScript (strict mode)
- UI Components: Custom (no heavy UI libraries)

DESIGN PHILOSOPHY:
Style: {{DESIGN_STYLE}}
Approach: Mobile-first, accessible, conversion-optimized

═══════════════════════════════════════════════════════════
                    STRICT RULES
═══════════════════════════════════════════════════════════

❌ ABSOLUTELY NEVER:
1. Suggest a different tech stack (we're locked to Next.js + Supabase)
2. Install packages without explicit approval
3. Modify existing files unless specifically instructed
4. Skip TypeScript types (strict mode always)
5. Use <form> tags - use onClick handlers only
6. Write code without a test checklist at the end
7. Move to next task without my explicit confirmation
8. Assume dependencies are installed - always verify
9. Use 'any' type - proper typing mandatory
10. Skip error handling or loading states

✅ ALWAYS:
1. Write production-ready, scalable code
2. Tell me EXACTLY which files to create/modify
3. Use proper error boundaries and fallbacks
4. Include loading states for all async operations
5. Follow Next.js 14 best practices (Server Components by default)
6. Implement proper RLS policies for Supabase
7. Write semantic, accessible HTML
8. Optimize for Core Web Vitals
9. Include comprehensive test checklists
10. Think about security at every step

═══════════════════════════════════════════════════════════
                    COMMUNICATION STYLE
═══════════════════════════════════════════════════════════

- Be direct and technical - no fluff
- When I say "Task X", deliver ONLY Task X
- Wait for my "✅ All tests passed" before next task
- If something is unclear, ask before proceeding
- Suggest improvements but don't implement without approval
- Always provide context for WHY, not just WHAT

═══════════════════════════════════════════════════════════
                    CONFIRMATION
═══════════════════════════════════════════════════════════

Respond with:
"{{PROJECT_NAME}} Partner Locked. Ready for Task 1. Waiting for your go-ahead."

DO NOT proceed until I say "Start Task 1"`,
    testChecklist: [
      "AI acknowledged project name correctly",
      "AI confirmed tech stack (Next.js + Supabase)",
      "AI listed all 10 NEVER rules",
      "AI listed all 10 ALWAYS rules",
      "AI is waiting - did NOT start coding",
      "Response format matches exactly"
    ],
    deliverables: ["AI confirmation with exact project name", "Partner relationship established"],
    commonMistakes: ["AI starts coding immediately", "AI suggests different stack", "AI skips confirmation"],
    nextStepHint: "We'll design the complete system architecture"
  },

  {
    stepNumber: 2,
    title: "System Architecture & Database Design",
    description: "Design the complete technical architecture and PostgreSQL schema.",
    aiTool: "Claude",
    estimatedTime: "20-30 min",
    wordCount: 3000,
    prompt: `TASK 1 — System Architecture & Database Design

We need to design the complete technical foundation for {{PROJECT_NAME}}. This is the blueprint everything else builds on.

═══════════════════════════════════════════════════════════
                    PART 1: SYSTEM ARCHITECTURE
═══════════════════════════════════════════════════════════

1. HIGH-LEVEL ARCHITECTURE DIAGRAM
   - Frontend (Next.js 14 App Router)
   - API Layer (Route Handlers)
   - Database (Supabase PostgreSQL)
   - Authentication (Supabase Auth)
   - Storage (Supabase Storage)
   - Realtime (Supabase Realtime)
   - External Services (list all)

2. COMPONENT ARCHITECTURE
   - Server Components vs Client Components strategy
   - Shared layout structure
   - Data fetching patterns
   - Caching strategy (Next.js Cache, React Cache, SWR/React Query)

3. AUTHENTICATION FLOW
   - Sign up process
   - Login process
   - Password reset
   - Email verification
   - Session management
   - Protected routes strategy

═══════════════════════════════════════════════════════════
                    PART 2: DATABASE DESIGN
═══════════════════════════════════════════════════════════

Create complete PostgreSQL schema:

1. TABLES (with exact column types, constraints, defaults)
   - users (extends auth.users)
   - profiles
   - {{MAIN_ENTITIES}} (core business tables)
   - {{RELATED_ENTITIES}} (supporting tables)
   - subscriptions/plans (if applicable)

2. RELATIONSHIPS
   - Foreign key constraints
   - Cascade behaviors
   - One-to-many, many-to-many mappings

3. INDEXES
   - Primary keys
   - Foreign key indexes
   - Query optimization indexes
   - Full-text search indexes (if needed)

4. ROW LEVEL SECURITY (RLS) POLICIES
   - Every table must have RLS
   - Users can only access their data
   - Admin override policies
   - Service role policies

5. TRIGGERS & FUNCTIONS
   - Updated_at auto-update
   - Profile creation on signup
   - Any business logic triggers

═══════════════════════════════════════════════════════════
                    PART 3: API DESIGN
═══════════════════════════════════════════════════════════

1. RESTful API endpoints (if applicable)
2. Database functions (RPC)
3. Realtime subscriptions
4. Webhook handlers

═══════════════════════════════════════════════════════════
                    DELIVERABLES
═══════════════════════════════════════════════════════════

1. Text-based architecture diagram
2. Complete SQL schema (ready to run)
3. RLS policy statements
4. Index creation statements
5. Entity Relationship Diagram description

═══════════════════════════════════════════════════════════
                    TEST CHECKLIST
═══════════════════════════════════════════════════════════

□ All tables have primary keys
□ All foreign keys have indexes
□ RLS enabled on every table
□ RLS policies cover all CRUD operations
□ Triggers don't create infinite loops
□ Schema is normalized (3NF)
□ JSONB fields used for flexible data
□ Timestamps (created_at, updated_at) on all tables
□ Soft delete strategy (if applicable)
□ Enum types defined for fixed options

═══════════════════════════════════════════════════════════

Wait for my approval before proceeding to Task 2.`,
    testChecklist: [
      "Architecture diagram provided",
      "All database tables defined with types",
      "RLS policies on every table",
      "Indexes for performance",
      "Foreign key constraints defined",
      "SQL is copy-paste ready",
      "ERD description provided"
    ],
    deliverables: ["SQL schema file", "Architecture diagram", "RLS policies"],
    commonMistakes: ["Missing RLS policies", "No indexes", "Wrong data types", "Missing foreign keys"],
    nextStepHint: "We'll implement authentication system"
  },

  {
    stepNumber: 3,
    title: "Brand Identity & Design System",
    description: "Create comprehensive visual design system before writing any UI code.",
    aiTool: "Claude",
    estimatedTime: "25-35 min",
    wordCount: 2800,
    prompt: `TASK 2 — Brand Identity & Design System

Before touching any code, we need a complete design system. This ensures visual consistency throughout the app.

═══════════════════════════════════════════════════════════
                    PART 1: BRAND FOUNDATION
═══════════════════════════════════════════════════════════

BRAND CONTEXT:
- App: {{PROJECT_NAME}}
- Target Users: {{TARGET_USERS}}
- Style Preference: {{DESIGN_STYLE}}

1. BRAND PERSONALITY (3-5 adjectives)
   Example: Trustworthy, Innovative, Approachable, Professional, Modern

2. VOICE & TONE
   - How we speak to users
   - Error message tone
   - Success message tone
   - Microcopy style

═══════════════════════════════════════════════════════════
                    PART 2: COLOR SYSTEM
═══════════════════════════════════════════════════════════

Provide EXACT hex codes with HSL values:

1. PRIMARY PALETTE
   - Primary: #______ (Main brand color)
   - Primary Light: #______ (Hover states)
   - Primary Dark: #______ (Active states)
   
2. SECONDARY PALETTE
   - Secondary: #______
   - Secondary variations

3. NEUTRAL SCALE (11 shades from white to black)
   - White: #FFFFFF
   - Gray 50-900
   - Black: #000000

4. SEMANTIC COLORS
   - Success: #______
   - Warning: #______
   - Error: #______
   - Info: #______

5. COLOR USAGE RULES
   - Text on light backgrounds
   - Text on dark backgrounds
   - Interactive element colors
   - Disabled state colors

═══════════════════════════════════════════════════════════
                    PART 3: TYPOGRAPHY
═══════════════════════════════════════════════════════════

1. FONT FAMILY SELECTION
   - Headings: [Google Font] + fallback stack
   - Body: [Google Font] + fallback stack
   - Monospace (for code): [Font]

2. TYPE SCALE (8 sizes minimum)
   - Display (for hero)
   - H1, H2, H3, H4
   - Body Large, Body, Body Small
   - Caption, Overline

3. LINE HEIGHTS & LETTER SPACING
   - Tight (headings): 1.1-1.2
   - Normal (body): 1.5-1.6
   - Relaxed (long text): 1.7-1.8

4. FONT WEIGHTS
   - Light: 300
   - Regular: 400
   - Medium: 500
   - Semibold: 600
   - Bold: 700

═══════════════════════════════════════════════════════════
                    PART 4: SPACING SYSTEM
═══════════════════════════════════════════════════════════

1. BASE UNIT: 4px or 8px

2. SPACING SCALE (12+ values)
   Example: 0, 0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96

3. COMPONENT SPACING
   - Button padding (horizontal/vertical)
   - Input padding
   - Card padding
   - Section padding
   - Container max-widths

═══════════════════════════════════════════════════════════
                    PART 5: SHADOWS & EFFECTS
═══════════════════════════════════════════════════════════

1. SHADOW SCALE (3-4 levels)
   - Small: cards, buttons
   - Medium: dropdowns, modals
   - Large: modals, dialogs
   - XL: floating elements

2. BORDER RADIUS SCALE
   - Small: buttons, inputs
   - Medium: cards
   - Large: sections
   - Full: pills, avatars

3. TRANSITIONS
   - Default duration: 150ms-300ms
   - Easing functions

═══════════════════════════════════════════════════════════
                    PART 6: COMPONENT PRIMITIVES
═══════════════════════════════════════════════════════════

For each component, define:

1. BUTTONS
   - Sizes: Small, Medium, Large
   - Variants: Primary, Secondary, Ghost, Destructive
   - States: Default, Hover, Active, Disabled, Loading

2. INPUTS
   - Sizes, states, validation styles

3. CARDS
   - Padding, shadows, borders

4. MODALS/DIALOGS
   - Sizes, overlay, animations

5. NAVIGATION
   - Header, sidebar, tabs, breadcrumbs

═══════════════════════════════════════════════════════════
                    DELIVERABLES
═══════════════════════════════════════════════════════════

1. Complete design tokens (JSON format)
2. tailwind.config.ts configuration
3. globals.css with CSS variables
4. Component style specifications

═══════════════════════════════════════════════════════════

Wait for approval before any code implementation.`,
    testChecklist: [
      "Color palette has exact hex codes",
      "Typography scale defined with sizes",
      "Spacing system with 12+ values",
      "Shadow scale defined",
      "All component primitives specified",
      "Tailwind config provided",
      "CSS variables in globals.css format"
    ],
    deliverables: ["Design tokens JSON", "tailwind.config.ts code", "globals.css code"],
    commonMistakes: ["Vague color descriptions", "Missing hover states", "Inconsistent spacing"],
    nextStepHint: "We'll set up the Next.js project with these design tokens"
  }
];

// Export more steps (4-20) would continue here...
export const getMegaVibeCoderStep = (stepNumber: number): LongFormStep | undefined => {
  return megaVibeCoderSteps.find(s => s.stepNumber === stepNumber);
};
