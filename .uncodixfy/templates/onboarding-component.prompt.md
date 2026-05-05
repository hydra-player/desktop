# Uncodixfy Prompt: Hydra Onboarding Component

Load these files first:

- `AGENTS.md`
- `CLAUDE.md`
- `docs/ai/uncodixfy.md`
- `docs/design/hydra-branding.md`
- Existing component nearest to the requested surface.
- Relevant CSS files under `src/styles/`.

Generate one focused onboarding component for Hydra.

## Component Rules

- Use a typed props alias.
- Use default export unless nearby code uses a different pattern.
- Use lucide-react icons for iconography.
- Use Hydra product copy and the Hydra default palette rules from `docs/design/hydra-branding.md`.
- Use existing CSS classes or add minimal scoped classes in an existing stylesheet only when needed.
- Support keyboard navigation and avoid icon-only controls without `aria-label`.
- Avoid nested cards and marketing-style copy.

## Output Format

Return:

- Component path.
- Props contract.
- States handled.
- Tests or manual checks.
