import { DocSearch } from "@docsearch/react";
import "@docsearch/css";

export default function Search() {
    return (
        <DocSearch
            appId="MQIQQRKVX5"
            indexName="mixpanel_Docs v2"
            apiKey="d6267db26ac89477a9a87ea82da493b7"
            insights={true}
        />
    );
}
