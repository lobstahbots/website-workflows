import { SlackFunction } from "deno-slack-sdk/mod.ts";
import RevalidateWebsiteDefinition from "./definition.ts";

export default SlackFunction(
  RevalidateWebsiteDefinition,
  async () => {
    try {
      const endpoint = "https://lobstahbots.com/slack/revalidate";

      const res = await fetch(endpoint, {
        method: "POST",
      });
      if (res.status === 200) {
        return {
          outputs: { message: (await res.json()).text || "No response." },
        };
      } else {
        throw new Error(`${res.status}: ${res.statusText}`);
      }
    } catch (err) {
      console.error(err);
      return {
        error:
          `An error was encountered during calling the action: \`${err.message}\``,
      };
    }
  },
);
