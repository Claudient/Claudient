import type { AppId } from "./types";
import type { WindowManager } from "./useWindows";
import { HomeApp } from "./apps/HomeApp";
import { SkillsApp } from "./apps/SkillsApp";
import { AgentsApp } from "./apps/AgentsApp";
import { McpApp } from "./apps/McpApp";
import { GuidesApp } from "./apps/GuidesApp";
import { StacksApp } from "./apps/StacksApp";
import { InstallApp } from "./apps/InstallApp";
import { AboutApp } from "./apps/AboutApp";
import { TrashApp } from "./apps/TrashApp";

export function AppContent({ appId, wm }: { appId: AppId; wm: WindowManager }) {
  switch (appId) {
    case "home":
      return <HomeApp wm={wm} />;
    case "skills":
      return <SkillsApp />;
    case "agents":
      return <AgentsApp />;
    case "mcp":
      return <McpApp />;
    case "guides":
      return <GuidesApp />;
    case "stacks":
      return <StacksApp />;
    case "install":
      return <InstallApp />;
    case "about":
      return <AboutApp wm={wm} />;
    case "trash":
      return <TrashApp />;
    default:
      return null;
  }
}
