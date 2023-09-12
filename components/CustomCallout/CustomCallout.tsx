import { Callout } from 'nextra-theme-docs';

type CalloutProps = {
    type: string,
    children?: JSX.Element,
    title?: string
}

const calloutTypeDict = {
    'error': {
        type: `error`,
        emoji: `❗️`,
    },
    'warning': {
        type: `warning`,
        emoji: `⚠️`,
    },
    'info': {
        type: `info`,
        emoji: `ⓘ`,
    },
    'success': {
        type: `info`,
        emoji: `👍`,
    }
}

export default function CustomCallout(props: CalloutProps) {
    let propsType = calloutTypeDict[`info`].type;
    if (props.type in calloutTypeDict) {
        propsType = props.type;
    }
    return (
        <Callout type={calloutTypeDict[propsType].type} emoji={calloutTypeDict[propsType].emoji}>
            <div>
                {props.title && <strong>{props.title}</strong>}
                {props.children && props.children}
            </div>
        </Callout>
    )
}
