import {
  AdminIcon,
  AnalysisIcon,
  DataInIcon,
  DataOutIcon,
  IntroIcon,
  SupportIcon,
} from "../../components/svg/NavIcon";

import style from "./sidebar.module.scss";

export default {
  intro: {
    type: "separator",
    title: (
      <div className={style.titleContainer}>
        <IntroIcon /> INTRO
      </div>
    ),
  },
  "what-is-mixpanel": "What is Mixpanel?",
  "what-to-track": "What to Track",
  quickstart: "Quickstart",
  "data-in": {
    type: "separator",
    title: (
      <div className={style.titleContainer}>
        <DataInIcon /> DATA IN
      </div>
    ),
  },
  "tracking-methods": "Tracking Methods",
  "data-structure": "Data Structure",
  migration: "Migration",
  "tracking-best-practices": "Best Practices",
  analysis: {
    type: "separator",
    title: (
      <div className={style.titleContainer}>
        <AnalysisIcon /> ANALYSIS
      </div>
    ),
  },
  reports: "Reports",
  boards: "Boards",
  featureflags: "Feature Flags",
  experiments: "Experiments",
  metric_tree: "Metric Trees",
  users: "Users",
  "session-replay": "Session Replay",
  features: "Features",
  admin: {
    type: "separator",
    title: (
      <div className={style.titleContainer}>
        <AdminIcon /> ADMIN
      </div>
    ),
  },
  "orgs-and-projects": "Orgs & Projects",
  "data-governance": "Data Governance",
  "access-security": "Access Security",
  privacy: "Privacy",
  pricing: "Pricing",
  "data-out": {
    type: "separator",
    title: (
      <div className={style.titleContainer}>
        <DataOutIcon /> DATA OUT
      </div>
    ),
  },
  "export-methods": "Export Methods",
  "data-pipelines": "Data Pipelines",
  "cohort-sync": "Cohort Sync",
  support: {
    type: "separator",
    title: (
      <div className={style.titleContainer}>
        <SupportIcon /> SUPPORT
      </div>
    ),
  },
  community: "Community",
  "get-help": {
    title: "Get Help ↗",
    newWindow: true,
    href: "https://mixpanel.com/get-support",
  },
  "response-times": "Response Times",
  "hire-an-expert": {
    title: "Hire an Expert ↗",
    newWindow: true,
    href: "https://mixpanel.com/partners/experts/matchmaking",
  },
};
