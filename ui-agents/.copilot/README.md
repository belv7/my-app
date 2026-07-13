# GitHub Copilot Prompts for UI-Agents

This directory contains prompts optimized for **GitHub Copilot Chat** in VS Code.

## Overview

All prompts in this collection are tailored for GitHub Copilot's GPT-4 based models. They differ from Claude and Cursor versions with adjusted:
- Prompt structure and phrasing for GPT-4 optimal understanding
- Output formatting for VS Code chat integration
- Technology stack emphasis (broader range of tools)
- Code examples adapted for GitHub Copilot context

## Available Prompts

### UI Design (2 prompts)
- **Design System Builder** - Create comprehensive design systems with tokens
- **Mobile-First UI Designer** - Design mobile-optimized interfaces

### Components (1 prompt)
- **React Component Builder** - Build production-ready React components

### Web Development (1 prompt)
- **CSS Architecture Specialist** - Design scalable CSS architectures

### Responsive Design (1 prompt)
- **Responsive Layout Expert** - Create responsive layouts across all devices

### Accessibility (1 prompt)
- **WCAG Implementation Guide** - Implement WCAG 2.1 accessibility standards

### Animation (1 prompt)
- **Animation & Micro-Interactions Expert** - Create performant animations

### UX Research (1 prompt)
- **User Research & Persona Framework** - Develop data-driven user personas

## How to Use

### In VS Code with GitHub Copilot Chat:

1. **Copy the prompt** from any `.md` file in this collection
2. **Open Copilot Chat** (Ctrl+Shift+I / Cmd+Shift+I)
3. **Paste the prompt** into the chat input
4. **Customize** the requirements section with your specific needs
5. **Send** and get AI-generated solutions

### Example:

```
@copilot Design System Builder

Let me build a design system for an e-commerce platform:
- Project: TechStore E-commerce
- Target users: Online shoppers, age 18-45
- Key colors: Blue (#0066CC), Orange (#FF6B35)
- Design principles: Clean, modern, accessible
```

## Key Differences from Claude Prompts

- **Optimized for GPT-4** model behavior and token efficiency
- **Shorter, more direct** prompt structures
- **Technology-agnostic** examples (works with various frameworks)
- **Better for VS Code chat** integration
- **Focus on practical, copy-ready code** output

## Tips for Best Results

1. **Be specific** about your requirements
2. **Mention your tech stack** (React, Vue, Tailwind, etc.)
3. **Specify output format** (code, explanation, examples, etc.)
4. **Request step-by-step** approaches for complex topics
5. **Ask for practical examples** you can implement immediately

## Mixing Prompts

You can combine multiple prompts:
```
@copilot [Design System Builder + React Component Builder]

Use the design system I created to build a Button component with:
- Design tokens from my system
- TypeScript typing
- Accessibility features
- Tailwind CSS implementation
```

## Feedback & Improvements

If a prompt doesn't generate expected results:
1. Rephrase your requirements more specifically
2. Add more context about your project
3. Request example code for better clarity
4. Break complex requests into smaller steps

## Files

- `settings.json` - Configuration for this prompt collection
- `README.md` - This file
- `../prompts/*/copilot-*.md` - Individual prompts (each category folder)

---

**Note:** These prompts complement the Claude and Cursor prompts in the repository. All original prompts remain unchanged.
