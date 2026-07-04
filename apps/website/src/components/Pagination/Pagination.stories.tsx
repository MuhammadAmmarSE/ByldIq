import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Pagination } from "./Pagination";

const meta = {
  title: "Foundation/Pagination",
  component: Pagination,
  args: { page: 1, pageCount: 5, onPageChange: () => {} },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FewPages: Story = {
  render: (args) => {
    function Interactive() {
      const [page, setPage] = useState(args.page);
      return <Pagination {...args} page={page} onPageChange={setPage} />;
    }
    return <Interactive />;
  },
};

export const ManyPages: Story = {
  args: { page: 8, pageCount: 24 },
  render: (args) => {
    function Interactive() {
      const [page, setPage] = useState(args.page);
      return <Pagination {...args} page={page} onPageChange={setPage} />;
    }
    return <Interactive />;
  },
};
