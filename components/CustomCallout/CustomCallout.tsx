import clsx from "clsx";

import style from "./CustomCallout.module.scss";
import CircleCheckmark from "./icons/CircleCheckmark";
import Info from "./icons/Info";
import Warning from "./icons/Warning";

type CalloutProps = {
    type: `warning` | `info` | `success`,
    children?: JSX.Element,
    title?: string
}

export default function CustomCallout(props: CalloutProps) {
    return (
        <div className={clsx(
            style.root,
            props.type === `warning` && style.warningTheme,
            props.type === `info` && style.infoTheme,
            props.type === `success` && style.successTheme,
        )}>
            <div className={style.iconSection}>
                <div className={style.titleIcon}>
                    {props.type === `warning` && <Warning />}
                    {props.type === `success` && <CircleCheckmark />}
                    {props.type === `info` && <Info />}
                </div>
            </div>
            <div className={style.contentSection}>
                <div>{props.title && <strong>{props.title}</strong>}</div>
                {props.children && <div>{props.children}</div>}
            </div>
        </div>
    )
}
