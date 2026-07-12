# Track Academy — Official Brand Colours & Typography 2025-2026

*Source: TA colour palette fonts 2025-2026 (1).pdf*
*This is the OFFICIAL brand style document. Overrides any colour/font assumptions made during the audit phase.*

---

## Colour Palette (Official)

| Colour Name | Hex | RGB | Usage Notes |
|---|---|---|---|
| **Orange** | `#f2620e` | rgb(242, 98, 14) | Primary brand colour. Buttons, CTAs, highlights. |
| **Light Orange** | `#f2a30f` | rgba(242, 163, 15, 255) | Dark background text. Subtle highlights. |
| **Gold** | `#f2b90e` | rgba(242, 185, 14, 255) | Dark navy background text. Elegant highlights. |
| **Blue** | `#112b8c` | rgba(17, 43, 140, 255) | Primary brand colour. Body text on white backgrounds. Section backgrounds. |
| **Pink** | `#d90152` | rgba(217, 1, 82, 255) | Alerts and emphasis only. Use sparingly — can feel intense. |

## Typography (Official)

| Role | Font | Notes |
|---|---|---|
| **Headings** | **Fredoka Medium** | All headings, hero text, stat numbers |
| **Body Text** | **Inter Regular** | All paragraphs, form labels, captions |

## Colour Combination Rules

### For long text / paragraphs
- **White Background + Blue Text (#112B8C)**

### For buttons, headers, bubbles
- **White on Blue (#112B8C)** — primary
- **White on Orange (#F2620E)** — CTA/highlight

### For dark backgrounds
- **Dark Blue/Navy (e.g., #0A1C5F) + Gold Text (#F2B90E)** — elegant for highlights

### Avoid
- Blue text on orange (or vice versa) — low contrast and straining
- Pink on orange/gold — clashes and poor readability
- Pure black/white — soften with palette colours to reduce eye strain

### Pink rules
- Pink Background (#D90152) + White Text — reserve for alerts or emphasis (can feel intense)
- Do NOT use pink casually — it's for alerts/warnings/special emphasis

## Contrast Testing
- Test combinations using WebAIM Contrast Checker
- Test combinations using Coolors Contrast Tool

---

## KEY CHANGES (vs our previous strategy docs)

| Element | Our assumption (strategy docs) | Official document | Action needed |
|---|---|---|---|
| **Primary Blue** | `#0b2b8c` | `#112b8c` | Update all strategy docs + proposal + website CSS |
| **Primary Orange** | `#f26f2a` | `#f2620e` | Update all strategy docs + proposal + website CSS |
| **Orange-Dark** | `#d45f1f` | Derive from #f2620e | Recalculate hover/active states from official orange |
| **Heading Font** | Bricolage Grotesque / Space Grotesk | **Fredoka Medium** | Update typography in all strategy docs + use Fredoka in website |
| **Body Font** | Inter | Inter **(correct!)** | No change needed |
| **Pink** | Not in palette | `#d90152` — alerts/emphasis only | Add pink to palette, document as accent/alert colour only |
| **Gold** | Not in palette | `#f2b90e` — dark bg accents | Add gold to palette, document as dark bg accent colour |
| **Light Orange** | Not in palette | `#f2a30f` — dark bg text | Add light orange to palette |

---

## Derived Colour System (for implementation)

From the official document, we can derive:

| Variable Name | Hex | Usage |
|---|---|---|
| `--ta-blue` | `#112b8c` | Primary blue — text on white, section backgrounds, footer |
| `--ta-blue-dark` | `#0a1c5f` | Dark backgrounds (from official doc example) |
| `--ta-orange` | `#f2620e` | Primary CTA, buttons, highlights, stat numbers |
| `--ta-orange-hover` | `#d4550c` | (Derived — 10% darker than #f2620e) |
| `--ta-gold` | `#f2b90e` | Accent text on dark navy backgrounds |
| `--ta-light-orange` | `#f2a30f` | Text on dark/black backgrounds |
| `--ta-pink` | `#d90152` | Alerts, warnings, emphasis only |
| `--ta-white` | `#ffffff` | Backgrounds, text on dark/coloured backgrounds |
| `--ta-grey` | `#4a4a4a` | Body text fallback, secondary info |
| `--ta-grey-light` | `#f5f5f5` | Section background alternating |