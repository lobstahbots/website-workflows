import { SlackFunction } from "deno-slack-sdk/mod.ts";
import RevalidateWebsiteDefinition from "./definition.ts";

// https://docs.github.com/en/rest/issues/issues#create-an-issue
export default SlackFunction(
  RevalidateWebsiteDefinition,
  async ({ env }) => {
    const headers = {
      Accept: "application/vnd.github+json",
      Authorization: "Bearer " + env.github_token,
      "Content-Type": "application/json",
    };

    try {
      const owner = "lobstahbots";
      const repo = "lobstahbots.com";
      const workflow_id = "newsletter.yml";

      const endpoint =
        `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow_id}/dispatches`;

      const body = JSON.stringify({
        ref: "main",
      });

      await fetch(endpoint, {
        method: "POST",
        headers,
        body,
      }).then((res: Response) => {
        if (res.status === 204) return { outputs: {} };
        else throw new Error(`${res.status}: ${res.statusText}`);
      });
    } catch (err) {
      console.error(err);
      return {
        error:
          `An error was encountered during calling the action: \`${err.message}\``,
      };
    }
    return { outputs: {} };
  },
);
