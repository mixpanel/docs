import { Tabs } from 'nextra/components'
import { useEffect, useState, useCallback } from 'react';
import LinkIcon from '../svg/LinkIcon';

type ExtendedTabsType = {
    children: JSX.Element;
    urlParam: string;
    urlToItemsMap: Record<string, string>;
}

export default function ExtendedTabs(props: ExtendedTabsType) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const item = urlParams.get(props.urlParam);
        if (item && item in props.urlToItemsMap) {
            const index = Object.keys(props.urlToItemsMap).indexOf(item);
            setSelectedIndex(index);
        }
    }, [props.urlParam, props.urlToItemsMap]);

    // Generate shareable URL for a tab
    const getTabUrl = useCallback((key: string) => {
        const url = new URL(window.location.href);
        url.searchParams.set(props.urlParam, key);
        return url.toString();
    }, [props.urlParam]);

    // Copy to clipboard handler
    const handleCopyLink = useCallback(async (key: string, index: number, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const url = getTabUrl(key);

        try {
            await navigator.clipboard.writeText(url);
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = url;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                setCopiedIndex(index);
                setTimeout(() => setCopiedIndex(null), 2000);
            } catch (e) {
                console.error('Failed to copy:', e);
            }
            document.body.removeChild(textArea);
        }
    }, [getTabUrl]);

    function onChange(idx) {
        setSelectedIndex(idx);
    };

    // Create custom tab items with anchor links
    const tabItemsWithAnchors = Object.entries(props.urlToItemsMap).map(([key, label], index) => (
        <span key={key} className="tab-label-with-anchor">
            <span className="tab-label-text">{label}</span>
            <button
                className={`tab-anchor-link ${copiedIndex === index ? 'copied' : ''}`}
                onClick={(e) => handleCopyLink(key, index, e)}
                aria-label={`Copy link to ${label} tab`}
                title={copiedIndex === index ? 'Copied!' : 'Copy link to this tab'}
            >
                <LinkIcon />
            </button>
        </span>
    ));

    return (
        <Tabs
            items={tabItemsWithAnchors}
            selectedIndex={selectedIndex}
            onChange={onChange}
        >
            {props.children}
        </Tabs>
    )
}
