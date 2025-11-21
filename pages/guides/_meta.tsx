import { SolutionsIcon,PlaybooksIcon,DiscoverIcon } from "../../components/svg/NavIcon";

import style from "../docs/sidebar.module.scss";

export default {
  "discover-mixpanel": {
    type: "separator",
    title: (
      <div className={style.titleContainer}>
        <DiscoverIcon /> DISCOVER
      </div>
    ),
  },
  "mixpanel-introduction": "Mixpanel Introduction",
  "self-guided-tours": "Self Guided Tours",
  "changelog": {
      title: "What's New? ↗",
      href: "/changelogs",
    newWindow: true
    },
  "solutions-and-workflows": {
    type: "separator",
    title: (
      <div className={style.titleContainer}>
        <SolutionsIcon /> WORKFLOWS
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
        <PlaybooksIcon /> PLAYBOOKS
      </div>
    ),
  },
  "benchmarks": "Benchmarks",
  "strategic-playbooks": "Strategic Playbooks",
  "glossary": "Glossary"
}
