import { Trigger } from "deno-slack-api/types.ts";
import { TriggerContextData, TriggerTypes } from "deno-slack-api/mod.ts";
import RebuildNewsletter from "../workflows/rebuild_newsletter.ts";

const rebuildNewsletterShortcut: Trigger<
  typeof RebuildNewsletter.definition
> = {
  type: TriggerTypes.Shortcut,
  name: "Rebuild newsletter",
  description: "Rebuild website newsletter from notion",
  workflow: "#/workflows/rebuild_newsletter_workflow",
  inputs: {
    channel_id: {
      value: TriggerContextData.Shortcut.channel_id,
    },
  },
};

export default rebuildNewsletterShortcut;
