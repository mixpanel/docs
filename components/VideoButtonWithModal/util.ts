const urlMatchesDomain = (domains: string[], domainStartsWith: string, url: string ) =>
  domains
    .filter((domain) => domain.startsWith(domainStartsWith))
    .some((domain) => url.includes(domain));

const getYoutubeEmbedURL = (url: string) => {
  const videoId = url.split("v=")[1]
    ? url.split("v=")[1].split("&")[0]
    : url.split("/").pop();
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
};

const getLoomEmbedURL = (url: string) => {
    const videoId = url.split("/").pop();
    return `https://www.loom.com/embed/${videoId}?hideEmbedTopBar=true`;
};

const getVideoEmbedURL = (url: string) => {
  const domains = ["youtube.com", "youtu.be", "loom.com"];

  if (urlMatchesDomain(domains, "youtu", url)) 
    return getYoutubeEmbedURL(url);

  if (urlMatchesDomain(domains, "loom", url)) 
    return getLoomEmbedURL(url);

  return null;
};

export default getVideoEmbedURL;
