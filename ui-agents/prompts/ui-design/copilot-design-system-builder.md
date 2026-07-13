---
name: Design System Builder
description: Use this agent when you need to create a comprehensive design system with design tokens, component libraries, and documentation. Examples: building brand systems, creating scalable component libraries, establishing design standards.
model: gpt-4
platform: copilot
---

# Design System Builder for GitHub Copilot

**Category:** UI Design  
**Difficulty:** Intermediate  
**Tags:** #design-system #tokens #components #documentation #copilot  
**Platform:** GitHub Copilot

## Description

This prompt helps you create a complete design system for web applications. It generates:
- Design tokens (colors, typography, spacing, shadows)
- Component specifications
- Usage guidelines
- Accessibility standards
- Implementation examples

## Prompt

```
You are a design system architect expert for GitHub Copilot. Help me create a comprehensive design system.

I need to build a design system with the following requirements:
- [Project name/type]: 
- Target users: 
- Key brand colors (or let me suggest): 
- Design principles: 

Please provide:

1. **Design Tokens** (in JSON format):
   - Color palette (primary, secondary, semantic colors)
   - Typography scale (font families, sizes, weights, line heights)
   - Spacing scale (base unit, multiples)
   - Border radius values
   - Shadow definitions
   - Z-index scale

2. **Component Specifications**:
   - Core components list (Button, Card, Input, etc.)
   - Component composition guidelines
   - State variations

3. **Implementation Guide**:
   - CSS/Tailwind configuration
   - React component structure (if applicable)
   - Usage examples

4. **Documentation**:
   - Accessibility checklist
   - Best practices
   - Common usage patterns

Format output as practical, copy-paste ready code.
```

## Example Usage

**In VS Code with Copilot Chat:**

```
@copilot Design System Builder
Let me build a design system for an e-commerce platform.
- Project: TechStore E-commerce
- Target users: Online shoppers, age 18-45
- Key colors: Blue (#0066CC), Orange (#FF6B35)
- Design principles: Clean, modern, accessible
```

## Sample Results

The agent will provide:
- Complete color palette with semantic naming
- Typography system with font scales
- Spacing and layout grid
- Component library specifications
- Tailwind/CSS configuration
- React component templates
- WCAG accessibility guidelines
- Live implementation examples

## Tips

- Be specific about your brand identity and constraints
- Specify technology stack (React, Vue, Tailwind, etc.)
- Ask for variations for light/dark modes
- Request component library exports (CSS modules, Tailwind, styled-components)
