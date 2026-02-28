// AI-Powered Dynamic Prompt Generation
// These prompts use Claude API to generate UNIQUE prompts for each user

export interface DynamicPromptRequest {
  workflowId: string;
  stepNumber: number;
  userAnswers: Record<string, string>;
  previousOutputs?: string[];
}

// Master prompt for generating context-aware prompts
export const generateMasterPrompt = (request: DynamicPromptRequest): string => {
  const { workflowId, stepNumber, userAnswers } = request;
  
  // Get workflow-specific context
  const workflowContexts: Record<string, string> = {
    "saas-builder": "SaaS development project using Next.js, TypeScript, Tailwind, Supabase",
    "uc-seo-content": "SEO content strategy using Koray Tugberk's UC v6.1 framework",
    "micro-niche": "Micro niche site building for topical authority",
    "local-seo": "Local SEO for service-based business",
    "ecommerce": "eCommerce store with conversion optimization",
    "security-hardening": "Web application security audit and hardening",
    "chrome-extension": "Chrome Extension with Manifest V3",
    "landing-page": "High-conversion landing page design"
  };

  const context = workflowContexts[workflowId] || "Development project";
  
  return `You are an expert AI prompt engineer. Your job is to create a HIGHLY SPECIFIC, CUSTOMIZED prompt based on the user's project details.

PROJECT CONTEXT: ${context}

USER'S PROJECT DETAILS:
${Object.entries(userAnswers).map(([key, value]) => `- ${key}: ${value}`).join('\n')}

CURRENT STEP: ${stepNumber}

INSTRUCTIONS:
1. Create a UNIQUE prompt that references the user's SPECIFIC project details
2. Use their exact project name, target audience, competitors, etc.
3. Make it IMPOSSIBLE to use without their specific context
4. Include STRICT constraints and rules
5. Add a TEST CHECKLIST at the end

The prompt should feel like it was written JUST FOR THIS USER'S PROJECT.

Format as a ready-to-copy prompt that they can paste into Claude/ChatGPT.`;
};

// Cache key generator
export const generateCacheKey = (request: DynamicPromptRequest): string => {
  const answerHash = Object.entries(request.userAnswers)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v.substring(0, 20)}`)
    .join('|');
  return `${request.workflowId}-${request.stepNumber}-${answerHash}`;
};

// Placeholder replacement with user data
export const personalizePrompt = (
  template: string,
  answers: Record<string, string>
): string => {
  let result = template;
  
  // Replace all {{KEY}} with actual user answers
  Object.entries(answers).forEach(([key, value]) => {
    const placeholder = new RegExp(`{{${key.toUpperCase().replace(/-/g, '_')}}}`, 'g');
    result = result.replace(placeholder, value);
  });
  
  // Generate smart project name if not provided
  const projectName = answers.what_does_your_saas_do || 
                     answers.business_name || 
                     answers.target_keyword || 
                     "My Project";
  
  result = result.replace(/{{PROJECT_NAME}}/g, projectName.split(' ').slice(0, 3).join(' '));
  result = result.replace(/{{SLUG}}/g, projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 20));
  
  return result;
};
