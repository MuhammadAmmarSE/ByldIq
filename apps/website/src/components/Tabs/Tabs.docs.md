# Tabs

Switches between related content panels without navigating away, built
on Radix `Tabs`. Compound component: `Tabs` (root), `TabsList`,
`TabsTrigger`, `TabsContent`.

## Usage

```tsx
<Tabs defaultValue="startup">
  <TabsList aria-label="Solutions">
    <TabsTrigger value="startup">Startup</TabsTrigger>
    <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
  </TabsList>
  <TabsContent value="startup">...</TabsContent>
  <TabsContent value="enterprise">...</TabsContent>
</Tabs>
```

## Props

Each part extends the matching Radix primitive's props
(`TabsPrimitive.Root/List/Trigger/Content`) — `value`/`defaultValue`/
`onValueChange` on `Tabs`, `value`/`disabled` on `TabsTrigger`, etc.
`TabsList` needs an `aria-label` describing the set of tabs.

## Accessibility

Arrow keys move between tabs (activating each as you go); `Tab` enters
and exits the tablist as one stop. Panels are associated with their
trigger via `aria-controls`/`aria-labelledby`, managed by Radix.
