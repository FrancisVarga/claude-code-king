---
sidebar_position: 2
---

# Monorepo Structure

Understanding the file structure and organization of the Claude Code King monorepo.

## Directory Layout

```
claude-code-king/
├── apps/
│   └── web/                    # Next.js application
│       ├── app/               # App Router pages
│       ├── components/        # App-specific components
│       ├── lib/              # App utilities
│       ├── package.json      # App dependencies
│       └── tailwind.config.ts
├── packages/
│   ├── ui/                   # shadcn/ui component library
│   │   ├── src/
│   │   │   ├── components/   # UI components
│   │   │   └── lib/         # Utilities (cn, etc.)
│   │   └── package.json
│   ├── eslint-config/        # Shared ESLint configuration
│   ├── typescript-config/    # Shared TypeScript configuration
│   └── config-manager/       # Configuration utilities
├── gutenberg/                # Docusaurus documentation
│   ├── docs/                # Documentation content
│   ├── blog/                # Blog posts
│   └── docusaurus.config.ts
├── .claude/                  # Claude AI agent configurations
├── package.json             # Root package.json
├── pnpm-workspace.yaml      # Workspace configuration
├── turbo.json              # Turborepo configuration
└── tsconfig.json           # Root TypeScript config
```

## Workspace Configuration

### pnpm-workspace.yaml

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

This simple configuration tells pnpm to treat all directories under `apps/` and `packages/` as workspace members.

### Root Package.json

```json
{
  "name": "shadcn-ui-monorepo",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "build": "turbo build",
    "dev": "turbo dev",
    "lint": "turbo lint",
    "format": "prettier --write \"**/*.{ts,tsx,md}\""
  },
  "devDependencies": {
    "@workspace/eslint-config": "workspace:*",
    "@workspace/typescript-config": "workspace:*",
    "prettier": "^3.5.1",
    "turbo": "^2.4.2",
    "typescript": "5.7.3"
  },
  "engines": {
    "node": ">=20"
  },
  "packageManager": "pnpm@10.14.0+sha512..."
}
```

## Package Structure Details

### Apps Directory

#### apps/web/
The main Next.js application consuming the UI package:

```
apps/web/
├── app/                     # Next.js App Router
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── providers.tsx       # Context providers
│   └── ui/                 # Re-exported UI components
├── lib/
│   └── utils.ts           # App-specific utilities
├── package.json           # App dependencies
├── next.config.js         # Next.js configuration
├── tailwind.config.ts     # Tailwind configuration
└── tsconfig.json          # TypeScript configuration
```

### Packages Directory

#### packages/ui/
The core component library:

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── ui/            # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   └── index.ts       # Component exports
│   └── lib/
│       ├── utils.ts       # cn() utility
│       └── index.ts       # Utility exports
├── package.json           # UI package config
├── tailwind.config.js     # UI-specific Tailwind
└── tsconfig.json          # TypeScript config
```

#### packages/eslint-config/
Shared ESLint configuration:

```
packages/eslint-config/
├── base.js               # Base ESLint rules
├── next.js              # Next.js specific rules
├── react.js             # React specific rules
└── package.json         # ESLint config package
```

#### packages/typescript-config/
Shared TypeScript configurations:

```
packages/typescript-config/
├── base.json            # Base TypeScript config
├── nextjs.json          # Next.js TypeScript config
├── react-library.json   # React library config
└── package.json         # TypeScript config package
```

#### packages/config-manager/
Configuration management utilities:

```
packages/config-manager/
├── src/
│   ├── index.ts         # Main exports
│   ├── env.ts           # Environment helpers
│   └── types.ts         # Type definitions
├── package.json         # Config manager package
└── tsconfig.json        # TypeScript config
```

## File Naming Conventions

### Components
- **PascalCase**: `Button.tsx`, `InputField.tsx`
- **kebab-case directories**: `components/ui/`, `lib/utils/`

### Configuration Files
- **Descriptive names**: `tailwind.config.ts`, `next.config.js`
- **Standard names**: `.eslintrc.js`, `tsconfig.json`

### Documentation
- **kebab-case**: `getting-started.md`, `component-guide.md`
- **Descriptive**: Clear, meaningful file names

## Import Strategies

### Workspace Imports

```typescript
// From packages to apps
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

// Configuration imports
import baseConfig from "@workspace/eslint-config/base"
import { loadEnv } from "@workspace/config-manager"
```

### Relative Imports

```typescript
// Within the same package
import { Button } from "./button"
import { cn } from "../lib/utils"

// Within the same app
import { Providers } from "@/components/providers"
import { siteConfig } from "@/lib/config"
```

## Package Dependencies

```mermaid
graph TD
    A[Root Package] --> B[Shared Dev Dependencies]
    B --> C[turbo]
    B --> D[prettier]
    B --> E[typescript]
    
    F[apps/web] --> G[@workspace/ui]
    F --> H[@workspace/eslint-config]
    F --> I[@workspace/typescript-config]
    
    G --> J[External UI Dependencies]
    J --> K[@radix-ui/*]
    J --> L[lucide-react]
    J --> M[class-variance-authority]
    
    F --> N[Next.js Dependencies]
    N --> O[next]
    N --> P[react]
    N --> Q[react-dom]
```

## Build Outputs

### Development
- **Hot reloading**: All packages in watch mode
- **Type checking**: Real-time across packages
- **No build artifacts**: Direct source consumption

### Production
- **Compiled packages**: TypeScript → JavaScript
- **Optimized apps**: Next.js production builds
- **Static assets**: Generated documentation site

This structure provides clear separation of concerns while enabling efficient development workflows and build processes.