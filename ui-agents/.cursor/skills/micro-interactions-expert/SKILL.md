---
name: micro-interactions-expert
description: Designs subtle, performance-optimized micro-interactions and UI animations. Use when adding hover effects to buttons and cards, creating loading states and feedback animations, or designing smooth transitions between UI states.
---

# Micro-Interactions Expert

**Source:** `prompts/animation/micro-interactions.md` (Claude prompt — unchanged)

**Category:** animation | **Difficulty:** Intermediate | **Tags:** #animation #micro-interactions #css #javascript

## Instructions

When the user needs micro-interactions, create subtle animations that enhance UX without being overwhelming.

```
I need you to design micro-interactions for the following UI elements:

INTERACTION CONTEXT:
- Element type: [SPECIFY: button, form field, card, icon, etc.]
- Interaction trigger: [hover, click, focus, load, success, error, etc.]
- Brand personality: [professional, playful, minimal, bold]
- Performance requirements: [smooth on mobile, low CPU usage, etc.]

INTERACTION REQUIREMENTS:
- Duration: Keep under 300ms for responsiveness
- Easing: Natural feeling motion curves
- Purpose: [feedback, guidance, delight, status indication]
- Accessibility: Respect prefers-reduced-motion

TECHNICAL SPECIFICATIONS:
- Implementation: [CSS-only, CSS with JS, or full JavaScript]
- Browser support: [modern browsers, IE11+, etc.]
- Framework: [vanilla, React, Vue, etc.]

SPECIFIC INTERACTIONS NEEDED:
[Describe each interaction you want, for example:]
1. Button hover effect that shows it's clickable
2. Form field focus animation for better UX
3. Loading spinner for async operations
4. Success/error feedback for form submissions
5. Card hover effect for interactive elements

OUTPUT REQUIREMENTS:
1. CSS/JavaScript code for each interaction
2. HTML structure needed
3. Accessibility considerations
4. Performance optimization notes
5. Usage examples with different states

Please make the animations feel natural and enhance usability rather than distract from it.
```

## Example Usage

**Input:**
```
Element type: Submit button for contact form
Interaction trigger: hover, click, loading states
Brand personality: Professional and trustworthy
Technical: CSS-only preferred, React project
```

## Notes

- Always specify the context where the interaction will be used
- Consider the overall brand experience when describing personality
- Mention any performance constraints upfront
- Include accessibility requirements from the start
