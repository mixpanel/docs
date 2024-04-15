import { DocSearch } from "@docsearch/react";
import "@docsearch/css";

// import style from "./Search.module.scss";
// import clsx from "clsx";

// TODO: @mixpanel dev
// We are implementing KAPA.AI for AI doc search. The goal is to remove `<DocSearch>` component and use the commented input field.
// Once we verify that the new widget works as intended in production, I will follow up with removing the <DocSearch> component
export default function Search() {
  return (
    <>
      {/* <div className={style.inputContainer}>
                <svg viewBox="0 0 24 24" focusable="false" className={style.icon}><path fill="currentColor" d="M23.414,20.591l-4.645-4.645a10.256,10.256,0,1,0-2.828,2.829l4.645,4.644a2.025,2.025,0,0,0,2.828,0A2,2,0,0,0,23.414,20.591ZM10.25,3.005A7.25,7.25,0,1,1,3,10.255,7.258,7.258,0,0,1,10.25,3.005Z"></path></svg>
                <input className={clsx("top-nav-search-bar", style.searchBar)} placeholder={`Search...`}/>
            </div> */}
      <DocSearch
        appId="MQIQQRKVX5"
        indexName="mixpanel_Docs v2"
        apiKey="d6267db26ac89477a9a87ea82da493b7"
        insights={true}
      />
    </>
  );
}
