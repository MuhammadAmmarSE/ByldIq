import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

const meta = {
  title: "Foundation/Tabs",
  component: Tabs,
  args: { defaultValue: "startup" },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args} className="w-96">
      <TabsList aria-label="Solutions">
        <TabsTrigger value="startup">Startup</TabsTrigger>
        <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
        <TabsTrigger value="commerce">Commerce</TabsTrigger>
      </TabsList>
      <TabsContent value="startup">
        <p className="text-foreground text-sm">
          Build products that investors and customers believe in.
        </p>
      </TabsContent>
      <TabsContent value="enterprise">
        <p className="text-foreground text-sm">Modernize systems built for tomorrow.</p>
      </TabsContent>
      <TabsContent value="commerce">
        <p className="text-foreground text-sm">Commerce engineered for sustainable growth.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const WithDisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="startup" className="w-96">
      <TabsList aria-label="Solutions">
        <TabsTrigger value="startup">Startup</TabsTrigger>
        <TabsTrigger value="platform" disabled>
          Platform (coming soon)
        </TabsTrigger>
      </TabsList>
      <TabsContent value="startup">
        <p className="text-foreground text-sm">
          Build products that investors and customers believe in.
        </p>
      </TabsContent>
      <TabsContent value="platform">
        <p className="text-foreground text-sm">Not available yet.</p>
      </TabsContent>
    </Tabs>
  ),
};
