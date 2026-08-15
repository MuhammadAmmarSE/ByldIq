import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { WhatWeBuild } from "./WhatWeBuild";

const meta = {
  title: "Homepage/WhatWeBuild",
  component: WhatWeBuild,
} satisfies Meta<typeof WhatWeBuild>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
