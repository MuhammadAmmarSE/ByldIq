import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./Accordion";

const meta = {
  title: "Foundation/Accordion",
  component: Accordion,
  args: { type: "single" },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SingleCollapsible: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      <AccordionItem value="discovery">
        <AccordionTrigger>What happens after booking?</AccordionTrigger>
        <AccordionContent>
          We&apos;ll review your project beforehand and come prepared with thoughtful questions.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="nda">
        <AccordionTrigger>Can you sign an NDA?</AccordionTrigger>
        <AccordionContent>Yes — always, before any detailed discussion.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="teams">
        <AccordionTrigger>Can you work with existing teams?</AccordionTrigger>
        <AccordionContent>
          Yes. We regularly embed within existing engineering and product teams.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-96">
      <AccordionItem value="a">
        <AccordionTrigger>Section A</AccordionTrigger>
        <AccordionContent>Multiple sections can be open at once.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Section B</AccordionTrigger>
        <AccordionContent>Try opening both.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
