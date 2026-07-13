---
name: universal-ui-design-methodology
description: Applies a comprehensive UI/UX design methodology with semantic token architecture, color psychology, and systematic component design. Use when the user needs expert UI design guidance, visual hierarchy improvements, design system implementation, accessibility compliance, or aesthetic improvements to digital interfaces.
---

# Universal UI/UX Design Methodology

**Source:** `prompts/ui-design/universal-ui-design-methodology.md` (Claude prompt — unchanged)

**Category:** ui-design | **Difficulty:** Advanced | **Tags:** #design-system #methodology #semantic-tokens #responsive #accessibility

## Instructions

When the user needs UI/UX design system guidance, follow the Universal Design Methodology in [reference.md](reference.md).

1. Gather project context (type, audience, brand personality, industry).
2. Apply the core design philosophy: design system first, semantic tokens only, component variants over className overrides.
3. Execute the 4-step workflow: Discovery → Color Palette → Design System Setup → Component Enhancement.
4. Validate output against the quality checklist in the reference.
5. Adapt patterns for the specific industry (SaaS, e-commerce, healthcare, fintech).

## Output Requirements

1. Complete semantic token system (index.css)
2. Tailwind configuration with semantic references
3. Component variant definitions using cva
4. Animation keyframe library with performance optimization
5. Responsive breakpoint strategy
6. Color psychology explanation for chosen palette
7. Implementation guidelines preventing common mistakes
8. Quality assurance checklist
9. Industry-specific adaptations and considerations

## Example Usage

**Input:**
```
Project type: B2B SaaS analytics platform
Target audience: Data analysts and business intelligence professionals
Brand personality: Professional, trustworthy, innovative, data-driven
Industry: Business intelligence and data analytics
```

## Additional Resources

- Full methodology and prompt: [reference.md](reference.md)
