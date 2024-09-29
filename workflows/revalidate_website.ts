import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import RevalidateWebsiteDefinition from "../functions/revalidate_website/definition.ts";

const RevalidateWebsiteWorkflow = DefineWorkflow({
  callback_id: "revalidate_website_workflow",
  title: "Revalidate website",
  description: "Revalidate website The Blue Alliance Data",
  input_parameters: {
    properties: {
      channel_id: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ["channel_id"],
  },
});

const revalidateWebsiteStep = RevalidateWebsiteWorkflow.addStep(RevalidateWebsiteDefinition, {});

RevalidateWebsiteWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: RevalidateWebsiteWorkflow.inputs.channel_id,
  message: revalidateWebsiteStep.outputs.message,
});

export default RevalidateWebsiteWorkflow;
