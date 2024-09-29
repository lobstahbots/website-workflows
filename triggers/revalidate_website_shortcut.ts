import { Trigger } from "deno-slack-api/types.ts";
import RevalidateWebsite from "../workflows/revalidate_website.ts";

const revalidateWebsiteShortcut: Trigger<
  typeof RevalidateWebsite.definition
> = {
  type: "shortcut",
  name: "Revalidate website",
  description: "Revalidate website The Blue Alliance Data",
  workflow: "#/workflows/revalidate_website_workflow",
  inputs: {
    channel_id: {
      value: "{{data.channel_id}}",
    },
  },
};

export default revalidateWebsiteShortcut;
