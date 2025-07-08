# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev`
- **Build for production**: `npm run build` (runs TypeScript compilation then Vite build)
- **Preview production build**: `npm run preview`
- **Type checking**: `npm run typecheck` (runs TypeScript compiler without emitting)
- **Format code**: `npm run format` (runs Prettier on src directory)

## Architecture Overview

ToyVox is a character voice interaction webapp built with React, Vapi AI, and Three.js for visualizations. Currently focused on the web version with a phone app planned.

### Core Application Flow
The app follows a simple state-driven flow managed by `CharacterContext`:
1. **Waiting** → User selects a character
2. **Detecting** → Character selected from the interface
3. **Connecting** → Vapi voice assistant initialized
4. **Active** → Voice conversation with character

### Key Components Structure

**Routing & Layout**
- `App.tsx`: Main router with character-based routes (`/character/:characterId`)
- `MainLayout.tsx`: Common layout wrapper for all pages
- `CharacterProvider`: Global state management for character interactions

**Character System**
- `config/characters.ts`: Character definitions with personality, voices, and animated backgrounds
- Each character has slideshow backgrounds with GIF transitions
- Characters map to Vapi voice assistants with custom system prompts

**Voice Integration**
- `services/vapiService.ts`: Vapi Web SDK integration
- Handles voice calls, speech events, and volume levels for visualizations
- Uses environment variables: `VITE_VAPI_API_KEY` and `VITE_VAPI_ASSISTANT_ID`

**Visual Components**
- `AudioVisualizer/`: WebGL-based voice visualization using Three.js shaders
- `DynamicBackground.tsx`: Character-specific animated background system
- `SparkleEffect.tsx`: Particle animations for UI feedback

### State Management
The `CharacterContext` provides global state for:
- Current interaction status (`waiting` | `detecting` | `connecting` | `active`)
- Active character data and voice transcript
- Audio levels for real-time visualization
- Reset functionality for returning to home state

### Technology Stack
- **UI**: React + HeroUI components + Tailwind CSS + Framer Motion
- **Voice**: Vapi Web SDK for voice conversations
- **Graphics**: Three.js for WebGL audio visualizations
- **Build**: Vite + TypeScript with path aliases (`@/*` → `./src/*`)

### File Organization
- `pages/`: Route components (HomePage, CharacterPage, SettingsPage)
- `components/`: Reusable UI components and visualizers
- `context/`: React context providers for global state
- `services/`: External API integrations (Vapi)
- `config/`: Application configuration and character data
- `public/assets/characters/`: Character-specific GIF backgrounds

### Environment Setup
Create a `.env` file with the following variables:
```
VITE_VAPI_API_KEY=your_vapi_api_key
VITE_VAPI_ASSISTANT_ID=your_assistant_id
```

### Development Principles

**Component Development**
- Always use HeroUI components first before creating custom ones
- Leverage existing libraries (Framer Motion, react-intersection-observer, etc.)
- Avoid writing custom CSS when component libraries provide solutions
- Use pre-built animations and effects from libraries

### Common Development Tasks

**Adding a New Character**
1. Add character definition to `config/characters.ts` with unique ID, name, and personality
2. Create GIF assets in `public/assets/characters/{characterId}/`
3. Configure Vapi assistant mapping in character definition

**Modifying Audio Visualizer**
- Shader files: `components/AudioVisualizer/shaders/`
- Configuration: `components/AudioVisualizer/visualizerConfig.ts`
- The visualizer responds to `audioLevel` from CharacterContext

**Working with Voice Integration**
- All Vapi logic is centralized in `services/vapiService.ts`
- Voice events update CharacterContext state automatically
- Check browser console for Vapi connection status and errors

### Future Feature Plans

**Category System**
- Fantasy, Space Adventure, Educational, Animal Friends, Superheroes categories
- Character unlock/progression system
- Achievement and XP mechanics

**Enhanced Features**
- User profiles with favorite characters
- Conversation history and memory system
- Parental controls and time limits
- Voice-controlled mini-games
- Daily challenges and streaks

**Technical Roadmap**
- Progressive Web App capabilities
- Mobile Flutter companion app
- Offline character selection
- Performance optimizations for low-end devices

**UI/UX Evolution**
- Modern hero landing page with scroll-based character reveals
- 3D character cards with animations
- Immersive full-screen character interactions
- Parallax scrolling effects and micro-interactions