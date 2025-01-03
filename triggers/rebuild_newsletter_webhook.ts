import { Trigger } from "deno-slack-api/types.ts";
import { TriggerTypes } from "deno-slack-api/mod.ts";
import RebuildNewsletter from "../workflows/rebuild_newsletter.ts";

const rebuildNewsletterWebhook: Trigger<
  typeof RebuildNewsletter.definition
> = {
  type: TriggerTypes.Webhook,
  name: "Rebuild newsletter",
  description: "Rebuild website newsletter from notion",
  workflow: "#/workflows/rebuild_newsletter_workflow",
  inputs: {
    channel_id: {
      value: "C04GJN4FW9F",
    },
    user_id: {
      value: "U05V89JB8J0",
    },
  },
};

export default rebuildNewsletterWebhook;
