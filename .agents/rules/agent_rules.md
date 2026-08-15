# Agent Rules & Guidelines

## 1. Tool Usage Restrictions
- **No Browser Execution**: NEVER use `browser_subagent` or attempt to open external browser windows. All verifications, audits, and checks must be performed using terminal commands, file inspections, type checks (`tsc --noEmit`), build tools (`vite build`), or code review.
- **Direct Terminal & Code Verification**: Use native terminal commands, unit tests, and build scripts for all validation tasks.

## 2. Implementation Philosophy (DIY & Clean DSA)
- **Do-It-Yourself (DIY)**: Build and implement clean, self-contained algorithms, data structures, and state machines rather than pulling in unnecessary external libraries.
- **Solid Data Structures & Algorithms (DSA)**:
  - Write optimized, clean algorithms for pathfinding, tree traversal (VFS), string parsing, and state transitions.
  - Keep state management predictable, pure, and declarative.
- **Maintain Modular Architecture**: Maintain separation of concerns between `types`, `data`, `services`, and `components`.

## 3. Code Standards & Safety
- Always ensure `npm run lint` (`tsc --noEmit`) passes with 0 errors before completing any task.
- Keep components focused and cleanly organized in their respective directories (`common/`, `terminal/`, `game/`).
