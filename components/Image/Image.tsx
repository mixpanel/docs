type ImageProps = {
    src: string;
    width?: string;
    height?: string;
}
export default function Image(props: ImageProps) {
    return (
        <div style={{padding: `8px`}}>
            <img {...props} />
        </div>
    )
}
