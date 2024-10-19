import { Trigger } from "deno-slack-api/types.ts";
import { TriggerContextData, TriggerTypes } from "deno-slack-api/mod.ts";
import AddToDoWorkflow from "../workflows/add_todo.ts";

const addToDoShortcut: Trigger<
  typeof AddToDoWorkflow.definition
> = {
  type: TriggerTypes.Shortcut,
  name: "Add To Do",
  description: "Add a task to the rolling to-do list",
  workflow: "#/workflows/add_to_do_workflow",
  inputs: {
    channel_id: {
      value: TriggerContextData.Shortcut.channel_id,
    },
    user_id: {
      value: TriggerContextData.Shortcut.user_id,
    },
    interactivity: {
      value: TriggerContextData.Shortcut.interactivity,
    },
  },
};

export default addToDoShortcut;
