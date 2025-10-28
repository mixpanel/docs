import { SolutionsIcon,PlaybooksIcon,DiscoverIcon } from "../../components/svg/NavIcon";

import style from "../docs/sidebar.module.scss";

export default {
  "discover-mixpanel": {
    type: "separator",
    title: (
      <div className={style.titleContainer}>
        <DiscoverIcon /> DISCOVER MIXPANEL
      </div>
    ),
  },
  "mixpanel-introduction": "Mixpanel Introduction",
  "changelog": {
      title: "What's New? ↗",
      href: "/changelogs",
    newWindow: true
    },
  "solutions-and-workflows": {
    type: "separator",
    title: (
      <div className={style.titleContainer}>
        <SolutionsIcon /> SOLUTIONS & WORKFLOWS
      </div>
    ),
  },
  "guides-by-use-case": "Guides by Use Case",
  "guides-by-workflow": "Guides by Workflow",
  "guides-by-topic": "Guides by Topic",
  "best-practices-and-playbooks": {
    type: "separator",
    title: (
      <div className={style.titleContainer}>
        <PlaybooksIcon /> BEST PRACTICES & PLAYBOOKS
      </div>
    ),
  },
  "benchmarks": "Benchmarks",
  "strategic-playbooks": "Strategic Playbooks"
}