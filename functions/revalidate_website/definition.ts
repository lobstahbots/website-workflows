import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts";

const RevalidateWebsiteDefinition = DefineFunction({
  callback_id: "revalidate_website",
  title: "Revalidate website",
  description: "Revalidate website data from The Blue Alliance",
  source_file: "functions/revalidate_website/mod.ts",
  output_parameters: {
    properties: {
      message: {
        type: Schema.types.string,
        description: "Message",
      },
    },
    required: ["message"],
  },
});

export default RevalidateWebsiteDefinition;
