// Taken from /marketing-site/src/utils/client.ts
export enum APIMethods {
    POST = `POST`,
    GET = `GET`,
}

// Certain POST Django endpoints in the Mixpanel app appear to require distinct Content-Types and body formats.
export enum HeaderContentType {
    JSON = `application/json`,
    FormUrlEncoded = `application/x-www-form-urlencoded`,
}

interface APIRequestProps {
    token?: string;
    url: string;
    method?: APIMethods;
    body?: any;
    headerContentType?: HeaderContentType;
}

export type SuccessResponse<ResultsType> = {
    status: `ok`;
    results: ResultsType;
};

export type ErrorResponse = {
    status: `error`;
    error: string;
    type?: string;
};

export type ApiResponse<ResultsType> =
    | ErrorResponse
    | SuccessResponse<ResultsType>;

type Obj<ValueT = any> = Record<string, ValueT>;
export function objToQueryString(params: Obj): string {
    return Object.keys(params)
        .map((k) => [k, encodeURIComponent(params[k])].join(`=`))
        .join(`&`);
}

async function BaseAPI({
    token,
    url,
    method = APIMethods.GET,
    headerContentType = HeaderContentType.JSON,
    body,
}: APIRequestProps) {
    const preparedBody =
        headerContentType === HeaderContentType.JSON
            ? JSON.stringify(body)
            : objToQueryString(body);

    const OPTIONS = {
        method: method,
        headers: {
            "Content-Type": headerContentType,
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        ...(preparedBody && { body: preparedBody }),
    };

    const response = await fetch(url, OPTIONS).then((response: any) =>
        response.json(),
    );

    return response;
}

export { BaseAPI };