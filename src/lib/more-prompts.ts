// Additional workflow prompts
export const additionalPrompts = {
  "micro-niche": [
    {
      stepNumber: 1,
      title: "Master Setup & Context Lock",
      description: "Lock the AI into your micro niche project context",
      aiTool: "Any",
      prompt: `You are my expert SEO strategist for building a micro niche authority site.\n\nSTRICT RULES:\n❌ Never skip topical authority steps\n❌ Never recommend thin content\n✅ Always entity-first approach\n✅ Always wait for confirmation between phases\n\nPROJECT DETAILS:\n- Main Topic/Niche: {{MAIN_TOPIC}}\n- Monetization: {{MONETIZATION_METHOD}}\n- Target Keyword: {{TARGET_KEYWORD}}\n- Competitors: {{COMPETITOR_URLS}}\n- Target Country: {{TARGET_COUNTRY}}\n\nConfirm understanding. Say "Micro Niche Analysis Ready" and wait for Phase 1.`,
      testChecklist: ["AI confirmed niche correctly", "AI is waiting for Phase 1", "Check keyword spelling is correct"],
      estimatedTime: "2 minutes",
      contextNote: "Double check your niche — fixing later wastes credits"
    },
    {
      stepNumber: 2,
      title: "Topical Authority Map",
      description: "Create comprehensive topic cluster structure",
      aiTool: "Any",
      prompt: `PHASE 1 — Topical Authority Map\n\nNiche: {{MAIN_TOPIC}}\nTarget: {{TARGET_KEYWORD}}\nMonetization: {{MONETIZATION_METHOD}}\n\nCreate:\n1. Pillar content topics (3-5 main categories)\n2. Supporting cluster content (15-20 articles)\n3. Internal linking structure\n4. Content priority matrix\n5. Content calendar for first 90 days\n\nFormat as structured markdown with tables.`,
      testChecklist: ["3-5 pillar topics defined", "15-20 cluster articles planned", "Internal linking map created", "90-day calendar ready"],
      estimatedTime: "10 minutes",
      contextNote: "This map determines your site's topical authority"
    },
    {
      stepNumber: 3,
      title: "Keyword Research & Clustering",
      description: "Find and group all keywords for topical coverage",
      aiTool: "Any",
      prompt: `PHASE 2 — Keyword Research\n\nMain Topic: {{MAIN_TOPIC}}\nTarget Keyword: {{TARGET_KEYWORD}}\n\nFor EACH pillar topic:\n1. List 20-30 keywords\n2. Group into keyword clusters\n3. Assign search intent\n4. Prioritize by opportunity score\n5. Map to specific content pieces\n\nOutput as tables per pillar topic.`,
      testChecklist: ["100+ keywords total", "Keywords grouped into clusters", "Search intent assigned", "Opportunity scores included"],
      estimatedTime: "15 minutes",
      contextNote: "Keyword clustering ensures topical depth"
    },
    {
      stepNumber: 4,
      title: "Competitor Content Gap Analysis",
      description: "Analyze competitors and find content opportunities",
      aiTool: "Any",
      prompt: `PHASE 3 — Competitor Gap Analysis\n\nNiche: {{MAIN_TOPIC}}\nCompetitors: {{COMPETITOR_URLS}}\n\nAnalyze each competitor:\n1. Content inventory\n2. Content gaps\n3. Weaknesses\n4. Opportunities\n5. Unique angles for our site\n\nCreate content gap matrix.`,
      testChecklist: ["All 3 competitors analyzed", "Content gaps identified", "Weaknesses documented", "Unique angles proposed"],
      estimatedTime: "12 minutes",
      contextNote: "Find what competitors missed"
    },
    {
      stepNumber: 5,
      title: "First Pillar Content Brief",
      description: "Create detailed brief for your main pillar article",
      aiTool: "Any",
      prompt: `PHASE 4 — Pillar Content Brief\n\nCreate detailed content brief:\n\n1. Target keyword + secondary keywords\n2. Search intent analysis\n3. Recommended word count\n4. H1-H6 outline structure\n5. Must-cover sections\n6. Internal linking plan\n7. External authority sources\n8. Content format\n9. CTA placement strategy`,
      testChecklist: ["Primary + secondary keywords", "Word count justified", "H2-H6 outline complete", "Internal links planned", "External sources listed"],
      estimatedTime: "12 minutes",
      contextNote: "This pillar article is your site's foundation"
    },
    {
      stepNumber: 6,
      title: "Content Writing Guidelines",
      description: "Define voice, style, and writing standards",
      aiTool: "Any",
      prompt: `PHASE 5 — Writing Guidelines\n\nNiche: {{MAIN_TOPIC}}\nMonetization: {{MONETIZATION_METHOD}}\n\nDefine:\n1. Content voice\n2. Article structure template\n3. Paragraph length targets\n4. Image requirements\n5. CTA placement rules\n6. Affiliate link strategy\n7. Update/maintenance schedule\n8. E-E-A-T signals\n\nProvide specific examples.`,
      testChecklist: ["Voice guidelines specific", "Structure template created", "Image requirements set", "Affiliate strategy defined", "E-E-A-T signals listed"],
      estimatedTime: "10 minutes",
      contextNote: "Consistency builds brand trust"
    },
    {
      stepNumber: 7,
      title: "Link Building Strategy",
      description: "Plan how to get backlinks to your niche site",
      aiTool: "Any",
      prompt: `PHASE 6 — Link Building Strategy\n\nNiche: {{MAIN_TOPIC}}\n\nCreate link building plan:\n\n1. Linkable assets to create\n2. Outreach targets (100 sites)\n3. Guest posting opportunities\n4. Resource page link building\n5. HARO/featured opportunities\n6. Competitor backlink analysis\n7. Link velocity targets\n\nFormat as actionable checklist.`,
      testChecklist: ["3-5 linkable assets planned", "100 outreach targets identified", "Guest posting sites listed", "HARO strategy defined", "Link velocity set"],
      estimatedTime: "15 minutes",
      contextNote: "Links = rankings. Don't skip link building"
    },
    {
      stepNumber: 8,
      title: "Technical SEO Setup",
      description: "Configure site for technical SEO best practices",
      aiTool: "Any",
      prompt: `PHASE 7 — Technical SEO\n\nSetup checklist:\n\n1. Site speed optimization targets\n2. Mobile responsiveness checks\n3. Schema markup\n4. XML sitemap configuration\n5. Robots.txt optimization\n6. URL structure rules\n7. Internal linking automation\n8. Image optimization standards\n9. Core Web Vitals targets\n\nProvide implementation guidance.`,
      testChecklist: ["Speed targets set", "Schema types defined", "Sitemap configured", "URL structure set", "Core Web Vitals targets defined"],
      estimatedTime: "10 minutes",
      contextNote: "Technical SEO is the foundation"
    },
    {
      stepNumber: 9,
      title: "Launch & Growth Plan",
      description: "90-day action plan to launch and grow the site",
      aiTool: "Any",
      prompt: `PHASE 8 — Launch & Growth Plan\n\nComplete 90-day roadmap:\n\nMONTH 1: Foundation\n- Week 1-2: Site setup + first pillar\n- Week 3-4: 5 supporting articles\n- Technical SEO complete\n\nMONTH 2: Content Velocity\n- Week 5-6: 8 more articles\n- First link building outreach\n- Internal linking optimization\n\nMONTH 3: Scale & Optimize\n- Week 9-10: 8 more articles\n- Analytics review + optimization\n- Link building follow-up\n\nDaily/weekly task breakdown included.`,
      testChecklist: ["Month 1 tasks detailed", "Month 2 tasks detailed", "Month 3 tasks detailed", "Daily/weekly breakdown ready", "Milestones defined"],
      estimatedTime: "10 minutes",
      contextNote: "Execution is everything — stick to the plan"
    }
  ],
  "local-seo": [
    {
      stepNumber: 1,
      title: "Master Setup & Context Lock",
      description: "Lock the AI into your local business context",
      aiTool: "Any",
      prompt: `You are my expert Local SEO specialist.\n\nSTRICT RULES:\n❌ Never skip Google Business Profile optimization\n❌ Never ignore NAP consistency\n✅ Always location-specific strategies\n✅ Always mobile-first approach\n\nPROJECT DETAILS:\n- Business: {{BUSINESS_NAME}}\n- Location: {{TARGET_CITY}}\n- Services: {{MAIN_SERVICES}}\n- Competitors: {{COMPETITOR_URLS}}\n- Target Country: {{TARGET_COUNTRY}}\n\nConfirm understanding. Say "Local SEO Ready for: {{BUSINESS_NAME}}" and wait for Phase 1.`,
      testChecklist: ["AI confirmed business name", "AI is waiting for Phase 1", "Check location details are correct"],
      estimatedTime: "2 minutes",
      contextNote: "Local SEO is location-specific — accuracy matters"
    },
    {
      stepNumber: 2,
      title: "Google Business Profile Optimization",
      description: "Complete GBP setup and optimization strategy",
      aiTool: "Any",
      prompt: `PHASE 1 — Google Business Profile Optimization\n\nBusiness: {{BUSINESS_NAME}}\nServices: {{MAIN_SERVICES}}\nLocation: {{TARGET_CITY}}\n\nCreate complete GBP strategy:\n\n1. Business category selection\n2. Business description (750 chars)\n3. Service area definition\n4. Service listings with descriptions\n5. Business attributes to enable\n6. Photo strategy\n7. Review generation plan\n8. Q&A section prep\n9. Posting schedule\n10. Insights tracking setup`,
      testChecklist: ["Primary + 9 secondary categories", "750-char description written", "Service areas defined", "Photo strategy created", "Review plan ready"],
      estimatedTime: "15 minutes",
      contextNote: "GBP is #1 ranking factor for local SEO"
    },
    {
      stepNumber: 3,
      title: "Local Keyword Research",
      description: "Find location-specific keywords with intent",
      aiTool: "Any",
      prompt: `PHASE 2 — Local Keyword Research\n\nBusiness: {{BUSINESS_NAME}}\nServices: {{MAIN_SERVICES}}\nLocation: {{TARGET_CITY}}\n\nFind keywords for:\n\n1. Service + location combos (50+ keywords)\n2. Near me searches\n3. Question-based local queries\n4. Competitor keyword gaps\n5. Long-tail local opportunities\n\nFor each: Search volume, intent, priority\n\nOutput as table.`,
      testChecklist: ["50+ location-specific keywords", "Near me variations covered", "Question keywords included", "Competitor gaps identified", "Priorities assigned"],
      estimatedTime: "12 minutes",
      contextNote: "Local keywords have different patterns than national"
    },
    {
      stepNumber: 4,
      title: "Website Local SEO Setup",
      description: "Configure website for local search dominance",
      aiTool: "Any",
      prompt: `PHASE 3 — Website Local SEO\n\nCreate optimization checklist:\n\n1. NAP consistency rules\n2. Location page structure\n3. Service area page content\n4. Local schema markup\n5. Embedded Google Map strategy\n6. Local content calendar\n7. Internal linking for local relevance\n8. Mobile optimization\n9. Click-to-call button placement\n10. Directions page setup`,
      testChecklist: ["NAP consistency rules set", "Local schema defined", "Content calendar created", "Mobile optimization planned", "CTA placement strategy ready"],
      estimatedTime: "12 minutes",
      contextNote: "Your website must scream 'local' to Google"
    },
    {
      stepNumber: 5,
      title: "Local Link Building & Citations",
      description: "Build local authority through citations and links",
      aiTool: "Any",
      prompt: `PHASE 4 — Local Authority Building\n\nBusiness: {{BUSINESS_NAME}}\nLocation: {{TARGET_CITY}}\n\nCreate link/citation plan:\n\n1. Top 50 citation sites for {{TARGET_COUNTRY}}\n2. Local directory opportunities\n3. Chamber of Commerce listings\n4. Local business associations\n5. Sponsor/partnership opportunities\n6. Local PR opportunities\n7. Community event participation\n8. Local blogger/influencer outreach\n9. Competitor citation analysis\n10. NAP consistency monitoring\n\nProvide URLs where possible.`,
      testChecklist: ["50 citation sites listed", "Local directories identified", "Partnership opportunities found", "Local PR angles defined", "Monitoring plan ready"],
      estimatedTime: "15 minutes",
      contextNote: "Local citations are like backlinks for local SEO"
    },
    {
      stepNumber: 6,
      title: "Review Generation System",
      description: "Create systematic approach to get more reviews",
      aiTool: "Any",
      prompt: `PHASE 5 — Review Generation System\n\nBusiness: {{BUSINESS_NAME}}\n\nDesign complete review system:\n\n1. Review request email/SMS templates (5 variations)\n2. Timing strategy (when to ask)\n3. Follow-up sequence (3-step)\n4. Response templates for all review types\n5. Review monitoring setup\n6. Review showcase on website\n7. Review incentives (compliant)\n8. Staff training guidelines\n9. Review tracking spreadsheet\n10. Goal setting (monthly targets)`,
      testChecklist: ["5 request templates written", "3-step follow-up created", "Response templates for all types", "Monitoring system defined", "Monthly targets set"],
      estimatedTime: "12 minutes",
      contextNote: "Reviews = trust = rankings = customers"
    },
    {
      stepNumber: 7,
      title: "Local Content Strategy",
      description: "Create location-specific content plan",
      aiTool: "Any",
      prompt: `PHASE 6 — Local Content Strategy\n\nBusiness: {{BUSINESS_NAME}}\nLocation: {{TARGET_CITY}}\nServices: {{MAIN_SERVICES}}\n\nContent plan:\n\n1. Service area pages\n2. Service detail pages\n3. Local guide content\n4. FAQ page (50+ local questions)\n5. Case studies with local clients\n6. Before/after showcases\n7. Local event participation content\n8. Team/About pages with local connection\n9. Blog calendar (local topics)\n10. Video content ideas\n\nFirst 10 articles prioritized.`,
      testChecklist: ["Area pages planned", "Service pages outlined", "50+ FAQ questions ready", "Case study ideas defined", "First 10 articles prioritized"],
      estimatedTime: "15 minutes",
      contextNote: "Local content connects you to the community"
    },
    {
      stepNumber: 8,
      title: "Competitor Local Analysis",
      description: "Analyze local competitors and find advantages",
      aiTool: "Any",
      prompt: `PHASE 7 — Competitor Analysis\n\nCompetitors: {{COMPETITOR_URLS}}\nLocation: {{TARGET_CITY}}\n\nAnalyze each competitor:\n\n1. GBP optimization level\n2. Review count and rating\n3. Website local SEO score\n4. Backlink profile\n5. Content strategy analysis\n6. Service offerings comparison\n7. Pricing strategy insights\n8. Weaknesses to exploit\n9. Quick wins\n10. Long-term differentiation strategy\n\nCreate competitive advantage plan.`,
      testChecklist: ["All 3 competitors analyzed", "GBP scores assessed", "Review counts documented", "Weaknesses identified", "Differentiation strategy ready"],
      estimatedTime: "12 minutes",
      contextNote: "Know your competition, then beat them"
    },
    {
      stepNumber: 9,
      title: "90-Day Local SEO Action Plan",
      description: "Complete execution roadmap for local dominance",
      aiTool: "Any",
      prompt: `PHASE 8 — 90-Day Action Plan\n\nComplete daily/weekly breakdown:\n\nWEEK 1-2: Foundation\n- GBP optimization\n- Website local setup\n- Citation building (first 20)\n\nWEEK 3-4: Content & Reviews\n- First 3 service pages\n- Review generation starts\n- Local schema implementation\n\nWEEK 5-8: Authority Building\n- 30 more citations\n- Local link building\n- Content publishing (2x/week)\n\nWEEK 9-12: Scale & Optimize\n- Performance review\n- Double down on winners\n- Expand service areas\n\nDaily task checklist included.`,
      testChecklist: ["Week 1-2 tasks detailed", "Week 3-4 tasks detailed", "Week 5-8 tasks detailed", "Week 9-12 tasks detailed", "Daily checklist ready"],
      estimatedTime: "10 minutes",
      contextNote: "Consistent execution beats sporadic effort"
    }
  ]
};
