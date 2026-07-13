---
name: user-persona-generator
description: Generates data-driven user personas for product development and design decisions. Use when launching a new product and needing target user insights, improving features based on user understanding, or creating marketing strategies aligned with user needs.
---

# User Persona Generator

**Source:** `prompts/ux-research/user-persona-generator.md` (Claude prompt — unchanged)

**Category:** ux-research | **Difficulty:** Beginner | **Tags:** #user-research #personas #ux #target-audience

## Instructions

When the user needs user personas, generate detailed profiles based on product context, market research, and target audience.

```
I need you to create detailed user personas for my product with the following information:

PRODUCT CONTEXT:
- Product/service: [describe what you're building]
- Industry: [specify the industry]
- Business model: [B2B, B2C, marketplace, etc.]
- Stage: [concept, MVP, established product]

TARGET MARKET INFORMATION:
- Primary target audience: [age, profession, location]
- Secondary audiences: [if applicable]
- Market size: [if known]
- Competitors: [main competitors in your space]

RESEARCH DATA (if available):
- Survey results: [any user research data you have]
- Analytics insights: [user behavior data]
- Interview findings: [qualitative research]
- Demographics: [any demographic information]

PERSONA REQUIREMENTS:
- Number of personas: [typically 3-5 primary personas]
- Detail level: [basic, detailed, or comprehensive]
- Use cases: [how will these be used - design, marketing, development]

FOR EACH PERSONA, PLEASE INCLUDE:
1. Demographics (age, location, job, income level)
2. Background and context
3. Goals and motivations
4. Pain points and challenges
5. Technology comfort level
6. Preferred communication channels
7. Buying behavior and decision-making process
8. Quote that captures their essence
9. Frustrations with current solutions

OUTPUT FORMAT:
- Persona cards with key information
- Detailed persona profiles
- Usage scenarios for each persona
- Empathy maps (optional)
- Design implications and recommendations

If you don't have specific research data, please base personas on industry standards and typical user patterns for similar products.
```

## Example Usage

**Input:**
```
Product: Project management tool for small creative agencies
Industry: Creative services/software
Business model: B2B SaaS subscription
Target audience: Creative directors, project managers at 5-50 person agencies
```

## Notes

- Provide as much real user data as possible for more accurate personas
- Be specific about how you plan to use the personas
- Include any unique aspects of your market or industry
- Consider both primary users and secondary stakeholders
