# ShareButton

CLAUDE.md Part 23's Reading Experience: share. Built for Milestone 12's
Case Studies platform but generic — no case-study-specific logic — so
Knowledge Center articles or Solutions pages can reuse it later.

## Behavior

- **Native share sheet** when `navigator.share` exists (most mobile
  browsers, many desktop browsers behind a user gesture) — passes
  `{ title, url }` through directly.
- **Clipboard fallback** otherwise: copies `url` and shows a toast
  confirmation ("Link copied"). A failed copy (e.g. permission denied)
  shows an error toast instead of failing silently.

## Usage

Requires a `ToastProvider` ancestor for the clipboard-fallback path —
already mounted globally in `AppProviders`, so callers under the normal
app tree don't need to add one themselves.

```tsx
<ShareButton
  title={caseStudy.headline}
  url={`${siteConfig.url}/work/${caseStudy.slug}`}
  onShare={() => analytics.track("case_study_shared", { slug: caseStudy.slug })}
/>
```

`onShare` fires after a successful native share or clipboard copy —
never on a cancelled share sheet or a failed copy — so a caller's
analytics only counts real shares.
