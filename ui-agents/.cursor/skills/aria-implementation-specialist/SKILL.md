---
name: aria-implementation-specialist
description: Implements proper ARIA attributes and accessibility compliance for complex UI components. Use when making custom dropdowns screen-reader accessible, implementing keyboard navigation for modals and menus, or ensuring WCAG AA/AAA compliance for interactive elements.
---

# ARIA Implementation Specialist

**Source:** `prompts/accessibility/aria-implementation.md` (Claude prompt — unchanged)

**Category:** accessibility | **Difficulty:** Intermediate | **Tags:** #accessibility #aria #wcag #screen-readers

## Instructions

When the user needs accessibility implementation, generate proper ARIA attributes for complex UI components.

```
I need you to help me implement proper ARIA attributes and accessibility features for the following component:

COMPONENT DETAILS:
- Component type: [dropdown, modal, tabs, carousel, form, etc.]
- Current implementation: [describe existing HTML/React/Vue structure]
- Framework: [vanilla HTML, React, Vue, Angular]
- WCAG level target: [AA or AAA compliance]

ACCESSIBILITY REQUIREMENTS:

1. SCREEN READER SUPPORT:
- Proper labeling and descriptions
- Announce state changes
- Navigation instructions
- Content structure clarity

2. KEYBOARD NAVIGATION:
- Tab order and focus management
- Keyboard shortcuts (if applicable)
- Escape key handling
- Arrow key navigation (for complex components)

3. ARIA ATTRIBUTES NEEDED:
- Role definitions
- Properties (aria-labelledby, aria-describedby, etc.)
- States (aria-expanded, aria-selected, etc.)
- Live regions for dynamic content

4. VISUAL INDICATORS:
- Focus indicators
- High contrast support
- Reduced motion compliance

SPECIFIC CHALLENGES:
[Describe any specific accessibility challenges with your component]

OUTPUT REQUIREMENTS:
1. Updated HTML with proper ARIA attributes
2. JavaScript for managing dynamic ARIA states
3. CSS for visual accessibility features
4. Testing checklist with screen reader instructions
5. Documentation explaining the accessibility features

Please ensure the implementation follows WCAG 2.1 guidelines and works well with popular screen readers (NVDA, JAWS, VoiceOver).
```

## Example Usage

**Input:**
```
Component type: Custom dropdown menu with search functionality
Current implementation: React component with useState for open/closed state
Framework: React with TypeScript
WCAG level target: AA compliance
```

## Notes

- Include your existing code structure for more targeted advice
- Specify which screen readers you need to support
- Mention any specific user requirements or constraints
- Consider including your target WCAG compliance level
