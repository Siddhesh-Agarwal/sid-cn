type PageType = {
  name: string;
  path: string;
};

export const componentPages: PageType[] = [
  {
    name: "Badge",
    path: "/components/badge",
  },
  {
    name: "Button",
    path: "/components/button",
  },
  {
    name: "Data Table",
    path: "/components/data-table",
  },
  {
    name: "Date Input",
    path: "/components/date-input",
  },
  {
    name: "Date Time Input",
    path: "/components/date-time-input",
  },
  {
    name: "Package Manager Command",
    path: "/components/package-manager-command",
  },
];

export const blockPages: PageType[] = [
  {
    name: "Markdown Editor",
    path: "/blocks/markdown-editor",
  },
  {
    name: "Spinning Wheel",
    path: "/blocks/spinning-wheel",
  },
  {
    name: "Supabase Auth",
    path: "/blocks/supabase-auth",
  },
];
