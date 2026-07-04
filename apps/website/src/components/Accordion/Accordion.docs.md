# Accordion

Collapsible content sections, built on Radix `Accordion`. Compound
component: `Accordion` (root), `AccordionItem`, `AccordionTrigger`,
`AccordionContent`.

## Usage

```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="discovery">
    <AccordionTrigger>What happens after booking?</AccordionTrigger>
    <AccordionContent>We'll review your project beforehand.</AccordionContent>
  </AccordionItem>
</Accordion>
```

## Props

`Accordion` extends Radix `AccordionPrimitive.Root` props — pass
`type="single"` (optionally `collapsible`) or `type="multiple"`.
`AccordionItem` needs a unique `value`.

## Accessibility / motion

Trigger is a real `<button>` inside an `<h3>` (`AccordionPrimitive.Header`),
toggles `aria-expanded`, and is fully keyboard operable. The open/close
height animation is the one deliberate exception to this system's
"never animate height" rule (see `globals.css`) — there's no
transform-only way to animate to an unknown content height. It uses the
`--duration-base` token, so it already collapses to instant under
`prefers-reduced-motion`.
