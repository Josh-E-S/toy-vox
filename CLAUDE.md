# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev`
- **Build for production**: `npm run build` (runs TypeScript compilation then Vite build)
- **Preview production build**: `npm run preview`

## Architecture Overview

ToyVox is an NFC-activated character voice interaction app built with React, Vapi AI, and Three.js for visualizations.

### Core Application Flow
The app follows a simple state-driven flow managed by `CharacterContext`:
1. **Waiting** → User places NFC toy on base
2. **Detecting** → NFC tag detected, character identified
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