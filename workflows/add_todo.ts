import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

const AddToDoWorkflow = DefineWorkflow({
  callback_id: "add_to_do_workflow",
  title: "Add to-do",
  description: "Add a task to the rolling to-do list",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      channel_id: {
        type: Schema.slack.types.channel_id,
      },
      user_id: {
        type: Schema.slack.types.user_id,
      },
    },
    required: ["interactivity", "channel_id", "user_id"],
  },
});

const formStep = AddToDoWorkflow.addStep(Schema.slack.functions.OpenForm, {
  title: "Add a to-do",
  interactivity: AddToDoWorkflow.inputs.interactivity,
  submit_label: "Add to-do",
  fields: {
    elements: [
      {
        name: "title",
        title: "Title",
        type: Schema.types.string,
      },
      {
        name: "description",
        title: "Description",
        type: Schema.types.string,
        long: true,
      },
    ],
    required: ["title", "description"],
  },
});

AddToDoWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: AddToDoWorkflow.inputs.channel_id,
  message:
    `<@${AddToDoWorkflow.inputs.user_id}> is adding a to-do: ${formStep.outputs.fields.title}\nDescription:\n${formStep.outputs.fields.description}`,
});

export default AddToDoWorkflow;
