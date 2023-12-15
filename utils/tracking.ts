type TrackingProperties = {
    [key: string]: string | boolean | undefined | string[] | number | null;
};

export function track(eventName: string, properties: TrackingProperties) {
    try {
        // @ts-ignore
        window.mixpanel.track(eventName, properties);
    } catch (e) {
        console.error(e);
    }
}
