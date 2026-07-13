---
name: react-component-architect
description: Creates modern, production-ready React components with TypeScript and best practices. Use when building reusable UI components, accessible form elements, complex interactive components with proper state management, or when the user asks for React component generation.
---

# React Component Architect

**Source:** `prompts/components/react-component-generator.md` (Claude prompt — unchanged)

**Category:** components | **Difficulty:** Intermediate | **Tags:** #react #components #jsx #typescript

## Instructions

When the user needs a React component, follow this workflow:

1. Ask clarifying questions about specific requirements before generating.
2. Apply the specifications below, filling in placeholders from the user's request.

```
I need you to create a React component with the following specifications:

COMPONENT REQUIREMENTS:
- Component name: [COMPONENT_NAME]
- Purpose: [DESCRIBE_WHAT_THE_COMPONENT_DOES]
- Props needed: [LIST_PROPS_AND_TYPES]

TECHNICAL REQUIREMENTS:
- Use TypeScript with proper interfaces
- Include proper prop validation
- Add JSDoc comments for documentation
- Follow React best practices (hooks, functional components)
- Include error boundaries where appropriate
- Implement proper accessibility (ARIA labels, semantic HTML)
- Add loading and error states if applicable
- Make it responsive and mobile-friendly

STYLING REQUIREMENTS:
- Use CSS modules or styled-components (specify preference)
- Include hover and focus states
- Ensure proper contrast ratios
- Add smooth transitions where appropriate

OUTPUT FORMAT:
1. Component file (.tsx)
2. CSS/Styles file
3. Usage example with different prop variations
4. Unit test structure (Jest/React Testing Library)
```

## Example Usage

**Input:**
```
Component name: UserCard
Purpose: Display user profile information with avatar, name, role, and contact actions
Props needed: user (object with name, email, role, avatarUrl), onMessage (function), onCall (function), isOnline (boolean)
Styling: CSS modules preferred
```

**Expected output:**
1. `UserCard.tsx` — main component with TypeScript interfaces
2. `UserCard.module.css` — CSS modules styling
3. Usage examples for loading, error, online/offline states
4. Test structure with sample test cases

## Notes

- Always specify the component purpose clearly
- Include all required props with their types
- Mention any specific styling framework preferences
- Consider adding animation requirements if needed
