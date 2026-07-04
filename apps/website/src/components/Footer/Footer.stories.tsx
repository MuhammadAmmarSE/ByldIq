import { Globe, Mail } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Footer } from "./Footer";

const meta = {
  title: "Foundation/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithColumnsAndSocial: Story = {
  args: {
    columns: [
      {
        heading: "Solutions",
        items: [
          { label: "Startup", href: "/solutions/startup" },
          { label: "Enterprise", href: "/solutions/enterprise" },
        ],
      },
      {
        heading: "Company",
        items: [
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
    socialLinks: [
      { label: "Website", href: "https://byldiq.com", icon: Globe },
      { label: "Email", href: "mailto:hello@byldiq.com", icon: Mail },
    ],
  },
};
