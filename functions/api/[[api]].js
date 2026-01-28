export const onRequest = async ({request, env}, cf) => {
    const now = performance.now()
    const url = new URL(request.url)
    url.host = env.TRACCAR_SERVER || 'gps.frotaweb.com'
    url.protocol = 'http:'
    url.port = 80
    console.log(performance.now())
    const response = await fetch(new Request(url, request), cf)
    console.log(performance.now() - now, 'ms')
    return response
}
