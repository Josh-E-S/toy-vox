# ToyVox: NFC-Activated Character Voice Interaction

A React-based web application for the Vapi Build Challenge that enables NFC-activated character voice interactions.

## Live Demo

Try the application at: [https://josh-e-s.github.io/toy-vox/](https://josh-e-s.github.io/toy-vox/)

Last updated: May 25, 2025 - 10:48 AM PST - With API keys

## Overview

ToyVox is a minimalist but functional prototype that demonstrates NFC-activated character voice interactions. The application features:

- Web-based application with responsive design
- Particle animation backgrounds for visual engagement
- Page-based navigation triggered by NFC tags
- Vapi voice integration for character conversations

## Technologies Used

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/) (page navigation)
- [HeroUI](https://heroui.com) (UI components)
- [Tailwind CSS](https://tailwindcss.com) (styling)
- [Framer Motion](https://www.framer.com/motion) (animations)
- [TypeScript](https://www.typescriptlang.org)

## User Flow

1. **Idle State**: App displays waiting screen with animated background
2. **Character Detection**: User places toy with NFC tag on reader
3. **Character Connection**: App connects to the character via Vapi
4. **Conversation**: User can speak with character
5. **Session End**: Reset button or timeout returns to home screen

## Setup and Installation

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

## License

Licensed under the [MIT license](https://github.com/Josh-E-S/toy-vox/blob/main/LICENSE).
