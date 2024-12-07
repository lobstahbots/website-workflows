import { Trigger } from "deno-slack-api/types.ts";
import { TriggerContextData, TriggerTypes } from "deno-slack-api/mod.ts";
import RevalidateWebsite from "../workflows/revalidate_website.ts";

const revalidateWebsiteShortcut: Trigger<
  typeof RevalidateWebsite.definition
> = {
  type: TriggerTypes.Shortcut,
  name: "Revalidate website",
  description: "Revalidate website The Blue Alliance Data",
  workflow: "#/workflows/revalidate_website_workflow",
  inputs: {
    channel_id: {
      value: TriggerContextData.Shortcut.channel_id,
    },
    user_id: {
      value: TriggerContextData.Shortcut.user_id,
    },
  },
};

export default revalidateWebsiteShortcut;
