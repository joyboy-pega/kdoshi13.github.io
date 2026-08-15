# Agent Rules & Guidelines

## 1. Tool Usage Restrictions
- **No Browser Execution**: NEVER use `browser_subagent` or attempt to open external browser windows. All verifications, audits, and checks must be performed using terminal commands, file inspections, type checks (`tsc --noEmit`), build tools (`vite build`), or code review.
- **Direct Terminal & Code Verification**: Use native terminal commands, unit tests, and build scripts for all validation tasks.

## 2. Visual & UI Constraints
- **No Emojis**: Strictly DO NOT use emojis in code, UI components, terminal outputs, icons, or agent responses. Use clean text, ASCII glyphs, or box-drawing characters instead.
- **No Gradients**: DO NOT use CSS gradients (`gradient`, `linear-gradient`, `radial-gradient`, Tailwind gradient utilities like `bg-gradient-*`, `from-*`, `to-*`, `via-*`). Use flat, solid colors only.
- **ASCII / TUI Style UI**: The portfolio MUST look and feel like a real CLI or TUI (Terminal User Interface). Use:
  - Box-drawing characters: `┌`, `─`, `┐`, `│`, `└`, `┘`, `├`, `┤`, `┬`, `┴`, `┼`
  - Sharp `rounded-none` borders, flat solid colors, no shadows or glassmorphism
  - Status bars, breadcrumb paths, mode indicators (NORMAL / INSERT / VISUAL)
  - Monospace fonts exclusively throughout all UI components
  - Scanline-style rows, table-style layouts with dividers
  - No card shadows, no blur effects, no backdrop-filter
- **No Rounded Corners**: Use `rounded-none` everywhere. TUI elements are sharp and rectangular.
- **Flat Design Only**: No `shadow-*`, no `drop-shadow-*`, no `blur-*`, no `backdrop-blur-*`.

## 3. Implementation Philosophy (DIY & Clean DSA)
- **Do-It-Yourself (DIY)**: Build and implement clean, self-contained algorithms, data structures, and state machines rather than pulling in unnecessary external libraries.
- **Solid Data Structures & Algorithms (DSA)**:
  - Write optimized, clean algorithms for pathfinding, tree traversal (VFS), string parsing, and state transitions.
  - Keep state management predictable, pure, and declarative.
- **Maintain Modular Architecture**: Maintain separation of concerns between `types`, `data`, `services`, and `components`.

## 4. Code Standards & Safety
- Always ensure `npm run lint` (`tsc --noEmit`) passes with 0 errors before completing any task.
- Keep components focused and cleanly organized in their respective directories (`common/`, `terminal/`, `game/`).
