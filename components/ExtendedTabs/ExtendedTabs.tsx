import { Tabs } from 'nextra-theme-docs'
import { useEffect, useState } from 'react';

type ExtendedTabsType = {
    children: JSX.Element;
    urlParam: string;
    urlToItemsMap: Record<string, string>;
}

export default function ExtendedTabs(props: ExtendedTabsType) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const item = urlParams.get(props.urlParam);
        if (item && item in props.urlToItemsMap) {
            const index = Object.keys(props.urlToItemsMap).indexOf(item);
            setSelectedIndex(index);
        }
    })

    return (
        <Tabs
            items={Object.values(props.urlToItemsMap)}
            selectedIndex={selectedIndex}
        >
            {props.children}
        </Tabs>
    )
}
