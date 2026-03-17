import { useEffect, useState, useCallback, useRef } from 'react';
import LinkIcon from '../svg/LinkIcon';

declare const mixpanel: { track: (event: string, props?: Record<string, unknown>) => void };

type ExtendedAccordionProps = {
    title: string;
    id: string;
    section?: string;
    children: React.ReactNode;
}

function slugify(text: string): string {
    return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

export default function ExtendedAccordion({ title, id: idProp, section, children }: ExtendedAccordionProps) {
    const id = idProp || slugify(title);
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    // Auto-open if URL hash matches on mount
    useEffect(() => {
        if (typeof window !== 'undefined' && window.location.hash === `#${id}`) {
            setIsOpen(true);
            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, [id]);

    // Set hidden="until-found" on the inner content div when closed.
    // This makes text searchable via cmd+f in Chrome/Firefox.
    // In Safari (no until-found support), display:block !important in CSS keeps
    // the grid trick working so content is still findable via cmd+f.
    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;
        if (!isOpen) {
            el.setAttribute('hidden', 'until-found');
        } else {
            el.removeAttribute('hidden');
        }
    }, [isOpen]);

    // Listen for beforematch: fires in Chrome/Firefox when browser find
    // highlights text inside a hidden="until-found" element.
    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;
        const handleBeforeMatch = () => {
            setIsOpen(true);
            const url = new URL(window.location.href);
            url.hash = id;
            window.history.replaceState(null, '', url.toString());
        };
        el.addEventListener('beforematch', handleBeforeMatch);
        return () => el.removeEventListener('beforematch', handleBeforeMatch);
    }, [id]);

    const handleToggle = useCallback(() => {
        const opening = !isOpen;
        setIsOpen(opening);
        if (opening) {
            if (typeof mixpanel !== 'undefined') {
                mixpanel.track("[Docs] FAQ Item Expanded", {
                    "faq-question": title,
                    ...(section && { "faq-section": section }),
                });
            }
            const url = new URL(window.location.href);
            url.hash = id;
            window.history.replaceState(null, '', url.toString());
        } else {
            const url = new URL(window.location.href);
            url.hash = '';
            window.history.replaceState(null, '', url.toString());
        }
    }, [isOpen, title, section, id]);

    const handleCopyLink = useCallback(async (e: React.MouseEvent | React.KeyboardEvent) => {
        e.stopPropagation();
        const url = new URL(window.location.href);
        url.hash = id;
        const urlString = url.toString();
        try {
            await navigator.clipboard.writeText(urlString);
        } catch {
            const ta = document.createElement('textarea');
            ta.value = urlString;
            ta.style.position = 'fixed';
            ta.style.left = '-999999px';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [id]);

    return (
        <div id={id} className={`extended-accordion${isOpen ? ' open' : ''}`}>
            <button
                className="accordion-header"
                onClick={handleToggle}
                aria-expanded={isOpen}
                aria-controls={`${id}-body`}
            >
                <span className="accordion-title-row">
                    <strong className="accordion-title">{title}</strong>
                    <span
                        role="button"
                        tabIndex={0}
                        className={`accordion-anchor-link${copied ? ' copied' : ''}`}
                        onClick={handleCopyLink}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCopyLink(e); }}
                        aria-label={`Copy link to ${title}`}
                        title={copied ? 'Copied!' : 'Copy link to this section'}
                    >
                        <LinkIcon />
                    </span>
                </span>
                <svg
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    height="18"
                    className={`accordion-chevron${isOpen ? ' rotated' : ''}`}
                >
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <div
                id={`${id}-body`}
                className="accordion-body"
                role="region"
                aria-labelledby={id}
            >
                <div ref={contentRef} className="accordion-content">
                    {children}
                </div>
            </div>
        </div>
    );
}
