---
name: WCAG Implementation Guide
description: Use this agent for implementing WCAG accessibility standards in complex UI components. Examples: adding ARIA to interactive components, implementing keyboard navigation, creating accessible forms and modals.
model: gpt-4
platform: copilot
---

# WCAG Implementation Guide for GitHub Copilot

**Category:** Accessibility  
**Difficulty:** Advanced  
**Tags:** #accessibility #wcag #aria #inclusion #copilot  
**Platform:** GitHub Copilot

## Description

This prompt helps you implement WCAG 2.1 accessibility standards. It covers ARIA implementation, keyboard navigation, semantic HTML, and testing strategies for complex UI components.

## Prompt

```
You are a WCAG accessibility expert for GitHub Copilot. Help me make components accessible.

Component/Feature Details:
- Component name and type (dropdown, modal, carousel, etc.):
- Current implementation (HTML/framework):
- WCAG target level (A, AA, AAA):
- Interaction type (simple, complex, interactive):
- Target assistive technologies:

Please provide comprehensive accessibility implementation:

1. **Semantic HTML**:
   - Proper heading hierarchy (h1, h2, h3, etc.)
   - Semantic elements (nav, main, article, section, etc.)
   - Form labels and associations
   - List structures where applicable

2. **ARIA Implementation**:
   - ARIA roles (if semantic HTML insufficient)
   - ARIA attributes (aria-label, aria-describedby, aria-expanded, etc.)
   - Live regions (aria-live, aria-atomic)
   - ARIA properties (aria-disabled, aria-selected, etc.)
   - States and property changes

3. **Keyboard Navigation**:
   - Tab order and focus management
   - Keyboard shortcuts (arrow keys, Enter, Escape)
   - Focus visible states (CSS outline/ring)
   - Skip links if needed
   - Keyboard trap prevention

4. **Screen Reader Optimization**:
   - Hidden content handling (visually-hidden class)
   - Announcement timing
   - Context and purpose clarity
   - Instructions for complex interactions
   - Error message association

5. **Visual Accessibility**:
   - Color contrast ratios (WCAG standards)
   - Text sizing minimum (14px recommended)
   - Focus indicators (sufficient contrast and size)
   - Motion and animations (prefers-reduced-motion)
   - Alternative text for images

6. **Interactive Components**:
   - Dropdown/select accessibility
   - Modal/dialog implementation
   - Carousel/slider patterns
   - Date picker patterns
   - Autocomplete patterns

7. **Testing & Validation**:
   - Automated testing with axe, Lighthouse
   - Manual keyboard navigation testing
   - Screen reader testing (NVDA, JAWS, VoiceOver)
   - WCAG checklist
   - Testing process documentation

8. **Code Examples**:
   - Accessible HTML structure
   - ARIA implementation
   - CSS for focus states and reduced motion
   - JavaScript for keyboard handling
   - React component examples (if applicable)

Format all code as production-ready, accessible implementations.
```

## Example Usage

**In VS Code with Copilot Chat:**

```
@copilot WCAG Implementation Guide
Make our dropdown menu component WCAG 2.1 AA compliant:
- Component: Dropdown/Select menu
- Current tech: React component with CSS
- Target level: WCAG 2.1 AA
- Interactions: Click to open, arrow keys to navigate, Enter to select
```

## Sample Results

The agent will provide:
- Semantic HTML structure
- Complete ARIA implementation
- Keyboard navigation code
- Focus management implementation
- Color contrast guidelines
- Reduced motion support
- JavaScript event handling
- React component examples
- Screen reader testing tips
- Automated testing setup (axe-core)
- WCAG checklist
- Accessibility documentation
- Common pitfalls to avoid

## Tips

- Specify the exact component type
- Mention current framework (React, Vue, vanilla, etc.)
- Request specific keyboard patterns
- Ask for screen reader testing strategies
- Request color contrast checking tools
- Ask for accessibility audit checklist
- Request examples for similar WCAG 2.1 AA patterns
