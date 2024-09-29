import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import RevalidateWebsiteDefinition from "../functions/rebuild_newsletter/definition.ts";

const RebuildNewsletterWorkflow = DefineWorkflow({
  callback_id: "rebuild_newsletter_workflow",
  title: "Rebuild newsletter",
  description: "Rebuild Lobstah Bots newsletter",
  input_parameters: {
    properties: {
      channel_id: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ["channel_id"],
  },
});

RebuildNewsletterWorkflow.addStep(RevalidateWebsiteDefinition, {});

RebuildNewsletterWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: RebuildNewsletterWorkflow.inputs.channel_id,
  message: "Started newsletter rebuild",
});

export default RebuildNewsletterWorkflow;
