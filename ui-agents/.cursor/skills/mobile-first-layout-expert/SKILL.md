---
name: mobile-first-layout-expert
description: Creates responsive layouts optimized for mobile devices using a mobile-first approach. Use when building landing pages across devices, creating adaptive dashboard layouts, or designing e-commerce layouts with mobile conversion in mind.
---

# Mobile-First Layout Expert

**Source:** `prompts/responsive/mobile-first-layout.md` (Claude prompt — unchanged)

**Category:** responsive | **Difficulty:** Intermediate | **Tags:** #responsive #mobile-first #css-grid #flexbox

## Instructions

When the user needs responsive layouts, use mobile-first approach with modern CSS Grid and Flexbox.

```
I need you to create a mobile-first responsive layout with the following specifications:

LAYOUT REQUIREMENTS:
- Layout type: [landing page, dashboard, blog, e-commerce, portfolio]
- Sections needed: [header, hero, features, testimonials, footer, etc.]
- Content priority: [which content is most important on mobile]

BREAKPOINT STRATEGY:
- Mobile: 320px - 768px (primary focus)
- Tablet: 768px - 1024px
- Desktop: 1024px+
- Large screens: 1400px+ (optional)

DESIGN SPECIFICATIONS:
- Typography: Responsive type scaling
- Images: Responsive images with proper sizing
- Navigation: Mobile-friendly menu system
- Touch targets: Minimum 44px for interactive elements
- Performance: Optimize for mobile loading speeds

TECHNICAL REQUIREMENTS:
- CSS methodology: [BEM, CSS modules, styled-components, etc.]
- CSS features: Use modern Grid/Flexbox
- Framework: [vanilla CSS, Tailwind, Bootstrap, etc.]
- Browser support: [specify minimum requirements]

SPECIFIC LAYOUT DETAILS:
[Describe your specific layout needs, for example:]
- Header with logo and hamburger menu on mobile
- Hero section with background image and call-to-action
- Three-column feature section that stacks on mobile
- Responsive card grid that adapts to screen size
- Footer with collapsible sections on mobile

OUTPUT REQUIREMENTS:
1. HTML structure with semantic elements
2. Mobile-first CSS with progressive enhancement
3. Breakpoint documentation
4. Performance optimization notes
5. Cross-browser testing checklist

Please prioritize mobile user experience while ensuring desktop doesn't feel like an afterthought.
```

## Example Usage

**Input:**
```
Layout type: SaaS landing page
Sections needed: header, hero, features (3 columns), pricing, testimonials, footer
Content priority: Call-to-action and value proposition most important on mobile
Framework: Vanilla CSS with CSS custom properties
```

## Notes

- Always start with mobile content prioritization
- Specify your preferred CSS methodology upfront
- Include any specific brand or design requirements
- Mention performance constraints or goals
