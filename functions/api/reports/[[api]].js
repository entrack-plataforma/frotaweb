export const onRequest = ({request, env}, cf) => {
    const url = new URL(request.url)
    url.host = '178.156.172.139'
    url.protocol = 'http:'
    url.port = 80
    return fetch(new Request(url, request), cf)
}
