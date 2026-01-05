# Feriearbete.se Design System (v4)

## 1. Brand Identity
The design is inspired by **Monster.com**: Bold, professional but youthful, high contrast, and slightly "blocky" with subtle rounded corners.

### Color Palette
We use **Tailwind CSS v4** variables defined in `globals.css`.

| Token | CSS Variable | Visual | Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | `--primary` | **Royal Purple** (#6E46AE) | Brand identity, primary buttons, active tabs. |
| **Tiffany** | `--tiffany` | **Tiffany Blue** (#00B6B4) | **Action Color**. "Apply" buttons, links, highlights. |
| **Purple Dark** | `--purple-dark` | **Dark Violet** (#2D2241) | Hero backgrounds, Footers, heavy text. |
| **Purple Light** | `--purple-light` | **Pale Lavender** | Section backgrounds (alternative to gray). |
| **Tiffany Light** | `--tiffany-light` | **Pale Cyan** | Success states, subtle highlights. |

### Semantic Badges (Monster Style)
Used for tags and categories.
- **Teal/Tiffany:** Assessments / IT
- **Yellow (`--warning`):** Jobs / Administration
- **Green (`--success`):** Resume / Park Work
- **Coral (`--coral`):** Interview / Care

## 2. Typography
- **Headings:** `font-heading` (**Space Grotesk**). Bold, geometric.
- **Body:** `font-sans` (**Inter**). Clean, legible.

## 3. Core Components

### Buttons (`<Button>`)
*Based on Shadcn, but overridden.*
- **Base Style:** `h-12 px-6 rounded-md font-bold text-sm`.
- **Variant `default`:** Royal Purple (`bg-primary`).
- **Variant `action`:** Tiffany Blue (`bg-tiffany`). Has a bottom border for 3D effect (`border-b-4`). **Use for main CTAs.**
- **Variant `outline`:** White with thick borders (`border-2`).

### Inputs & Forms
- **Base Style:** `h-12 rounded-md border-2 border-input`.
- **Focus:** Sharp focus ring (`ring-primary`).
- **Note:** Never use thin `1px` borders for inputs. Always `border-2`.

### Cards
- **Style:** `rounded-xl border border-slate-200 shadow-sm`.
- **Behavior:** Interactive cards (like Job Listings) have `hover:border-primary hover:shadow-md`.

## 4. Internationalization (Next-Intl)
The app is fully localized (Swedish `sv` default, English `en`).

### File Structure
- `messages/sv.json`: Source of truth for text.
- `messages/en.json`: English translations.

### Usage Pattern
```tsx
import { useTranslations } from 'next-intl';

export default function JobCard() {
  const t = useTranslations('jobs');
  return (
    <Button>{t('applyNow')}</Button>
  );
}
```

