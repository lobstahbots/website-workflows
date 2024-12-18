import { Manifest } from "deno-slack-sdk/mod.ts";
import RebuildNewsletterDefinition from "./functions/rebuild_newsletter/definition.ts";
import RebuildNewsletterWorkflow from "./workflows/rebuild_newsletter.ts";
import RevalidateWebsiteDefinition from "./functions/revalidate_website/definition.ts";
import RevalidateWebsiteWorkflow from "./workflows/revalidate_website.ts";
import LeaderboardUpdateDefinition from "./functions/leaderboard_update/definition.ts";
import LeaderboardUpdateWorkflow from "./workflows/leaderboard_update.ts";
import LeaderboardDatastore from "./datastores/leaderboard.ts";
import ClearLeaderboardDefinition from "./functions/clear_leaderboard/definition.ts";
import RegenerateLeaderboardDefinition from "./functions/regenerate_leaderboard/definition.ts";
import RegenerateLeaderboardWorkflow from "./workflows/regenerate_leaderboard.ts";

export default Manifest({
  name: "Lobstah Bots",
  description: "Lobstah Bots internal workflows",
  icon: "assets/icon.png",
  datastores: [
    LeaderboardDatastore,
  ],
  functions: [
    RebuildNewsletterDefinition,
    RevalidateWebsiteDefinition,
    LeaderboardUpdateDefinition,
    ClearLeaderboardDefinition,
    RegenerateLeaderboardDefinition,
  ],
  workflows: [
    RebuildNewsletterWorkflow,
    RevalidateWebsiteWorkflow,
    LeaderboardUpdateWorkflow,
    RegenerateLeaderboardWorkflow,
  ],
  outgoingDomains: ["api.github.com", "lobstahbots.com"],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "users:read",
    "users:read.email",
    "datastore:read",
    "datastore:write",
    "channels:history",
    "reactions:write",
  ],
});
