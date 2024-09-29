import { Trigger } from "deno-slack-api/types.ts";
import RebuildNewsletter from "../workflows/rebuild_newsletter.ts";

const rebuildNewsletterShortcut: Trigger<
  typeof RebuildNewsletter.definition
> = {
  type: "shortcut",
  name: "Rebuild newsletter",
  description: "Rebuild website newsletter from notion",
  workflow: "#/workflows/rebuild_newsletter_workflow",
  inputs: {
    channel_id: {
      value: "{{data.channel_id}}",
    },
  },
};

export default rebuildNewsletterShortcut;
