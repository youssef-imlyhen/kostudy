export const normalizeUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.sort();
    return urlObj.hostname.toLowerCase() + urlObj.pathname + urlObj.search;
  } catch (e) {
    // If it's not a valid URL, return the original string lowercased
    return url.toLowerCase();
  }
};