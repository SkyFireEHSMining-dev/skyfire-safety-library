# SkyFire App Architecture Rules

These rules guide future Safety Library growth so the app stays lean, field-friendly, and easy to navigate as new tools and resources are added.

## Home screen

1. **Keep the home screen lean.** Target roughly 10 cards maximum, with a practical flexibility of about ±1 while restructuring work is underway.
2. **Consolidate before adding clutter.** When the home screen approaches the card limit, group related functionality into clear hubs rather than continuing to add top-level cards.
3. **Top-level destinations should earn their place.** The home screen is for major destinations, not every individual tool or resource.
4. **Do not advertise empty functionality.** A card should represent usable content or functionality. Placeholders and “coming soon” modules should remain hidden until they provide real value.
5. **Keep the global header non-sticky.** The SkyFire Safety Library banner should scroll away with the page so field content receives the maximum available screen space.

## Permanent home-screen elements

The following are expected to retain dedicated visibility unless a future design review finds a stronger reason to change them:

- Field Status Dashboard
- Feedback & Suggestions
- About SkyFire
- Project/footer attribution

## Current functional hubs

### Safety Tools
Interactive tools used to assess, calculate, guide, or support field decisions.

Current contents:
- Risk Assessment Matrix
- Safety ROI Calculator
- 5S Workplace Organization

Potential future contents:
- Work Area Safety Check
- Other interactive field tools

### Regulatory Resources
Regulatory references, forms, and related compliance resources.

Current contents:
- MSHA / 30 CFR
- OSHA / 29 CFR
- MSHA Forms Library

Potential future contents:
- MSHA PPM and other MSHA resources
- Additional authoritative regulatory reference material

### Field Resources
Printable, reference, checklist, and practical field materials that are not better classified as an interactive tool or regulatory resource.

Current contents:
- Safety Docs

Future contents may include Toolbox Talks and other field reference material once actual usable content exists.

## Classification rule

Before adding a new top-level home card, ask:

1. Is this a permanent major destination, or does it belong inside an existing hub?
2. Is the feature usable today, or is it only planned?
3. Does adding it improve field access enough to justify additional scrolling?
4. Could an existing hub be reorganized instead?

Default to the leaner navigation choice.

## Feedback and roadmap guardrails

- Home-screen cards represent **usable functionality**, not future intentions.
- Future or requested features may be communicated through a dedicated updates/roadmap pattern rather than placeholder home cards.
- Do not publicly promise a requested feature until it has deliberately moved from **Under Consideration** to **Planned / In Development**.
- Feedback should eventually form a closed loop: submission → review → decision/action → response when practical.

## Review trigger

Revisit the information architecture whenever:
- the home screen approaches the card-limit window;
- a hub becomes too broad to scan easily;
- a new feature does not clearly fit an existing category; or
- mobile scrolling begins to interfere with quick field use.
