# Feriearbete.se Platform

A modern platform for summer job applications in Sweden, built with Next.js, TypeScript, and Shadcn UI.

## Features

- 🌍 **Multi-language Support** - Swedish (default) and English
- 🎨 **Monster.com-inspired Design** - Royal Purple & Tiffany Blue color scheme
- 📱 **Responsive Design** - Mobile-first approach
- 🎯 **Component Library** - Comprehensive design system
- ⚡ **Next.js 15** - Latest App Router with Server Components
- 🎨 **Tailwind CSS v4** - Modern styling with CSS variables
- 🔧 **TypeScript** - Type-safe development

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** Shadcn UI
- **Internationalization:** next-intl
- **Fonts:** Inter (body), Space Grotesk (headings)

## Project Structure

```
feriearbete/
├── backend/          # Backend services (to be implemented)
├── frontend/
│   └── feriearbete-platform/
│       ├── app/              # Next.js app directory
│       │   └── [locale]/     # Locale-based routing
│       ├── components/       # React components
│       ├── i18n/            # Internationalization config
│       ├── messages/         # Translation files
│       └── lib/              # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jswmusik/feriearbete.git
cd feriearbete
```

2. Install dependencies:
```bash
cd frontend/feriearbete-platform
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Design System

Visit `/design` (or `/en/design` for English) to view the complete component library and design system.

### Color Palette

- **Royal Purple** (`#6E46AE`) - Primary brand color
- **Tiffany Blue** (`#00B6B4`) - Accent/action color
- **Purple Dark** (`#2D2241`) - Hero backgrounds
- **Subtle Corners** - 4px border radius for a professional, squared-off aesthetic

## Internationalization

The platform supports multiple languages:

- Swedish (`/`) - Default
- English (`/en`)

Translation files are located in `messages/` directory.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

[Add your license here]

## Contributing

[Add contribution guidelines here]

