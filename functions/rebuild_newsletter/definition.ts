import { DefineFunction } from "deno-slack-sdk/mod.ts";

const RebuildNewsletterDefinition = DefineFunction({
  callback_id: "rebuild_newsletter",
  title: "Rebuild newsletters",
  description: "Rebuild website newsletters from notion",
  source_file: "functions/rebuild_newsletter/mod.ts",
});

export default RebuildNewsletterDefinition;