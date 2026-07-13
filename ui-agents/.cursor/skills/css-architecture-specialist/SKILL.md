---
name: css-architecture-specialist
description: Designs scalable CSS organization and architecture for large projects. Use when refactoring messy CSS codebases, establishing team CSS standards, setting up maintainable styling systems, or solving CSS specificity and organization problems.
---

# CSS Architecture Specialist

**Source:** `prompts/web-development/css-architecture.md` (Claude prompt — unchanged)

**Category:** web-development | **Difficulty:** Advanced | **Tags:** #css #architecture #scalability #methodology

## Instructions

When the user needs CSS architecture guidance, design scalable organization with proper naming conventions and maintainability strategies.

```
I need you to help me design a scalable CSS architecture for my project with the following requirements:

PROJECT CONTEXT:
- Project type: [web app, marketing site, e-commerce, etc.]
- Team size: [solo developer, small team, large team]
- Project timeline: [short-term, long-term maintenance]
- Framework: [React, Vue, Angular, vanilla HTML]
- Build tools: [Webpack, Vite, Parcel, etc.]

CURRENT CHALLENGES:
- [Describe any existing CSS problems: specificity issues, code duplication, hard to maintain, etc.]
- [Team collaboration challenges]
- [Performance concerns]

ARCHITECTURE REQUIREMENTS:

1. ORGANIZATION STRUCTURE:
- Folder/file organization strategy
- Component-based vs. page-based structure
- Shared utilities and base styles

2. NAMING METHODOLOGY:
- [BEM, OOCSS, SMACSS, or custom approach]
- Component naming conventions
- Utility class patterns

3. CSS APPROACH:
- [CSS-in-JS, CSS Modules, Sass/SCSS, PostCSS]
- Design token integration
- Theme/brand management

4. SCALABILITY FEATURES:
- Code splitting strategies
- Performance optimization
- Maintenance guidelines

5. TEAM COLLABORATION:
- Code review standards
- Documentation requirements
- Style guide integration

OUTPUT REQUIREMENTS:
1. Complete folder structure with explanations
2. Naming convention guide with examples
3. Base CSS setup (reset, variables, utilities)
4. Component architecture patterns
5. Build process recommendations
6. Team guidelines and best practices
7. Migration strategy (if refactoring existing code)

Please focus on long-term maintainability and team scalability while keeping development velocity high.
```

## Example Usage

**Input:**
```
Project type: B2B SaaS dashboard
Team size: 6 frontend developers
Framework: React with TypeScript
Current challenges: Inconsistent styling, hard to find styles, specificity wars
CSS approach: Considering CSS Modules or styled-components
```

## Notes

- Be specific about current pain points for targeted solutions
- Include information about your build setup
- Mention any existing design systems or style guides
- Consider your team's CSS skill level and preferences
