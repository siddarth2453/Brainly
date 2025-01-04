export function getTweetId(tweetUrl: string): string | null {
    const url = new URL(tweetUrl);
    let tweetId = null;
  
    // Check the URL pattern for x.com
    if (url.hostname === "x.com") {
      // For tweet links: https://x.com/{username}/status/{tweet_id}
      const pathSegments = url.pathname.split('/');
      if (pathSegments.length === 4 && pathSegments[2] === "status") {
        tweetId = pathSegments[3];
      }
    }
  
    return tweetId ? tweetId : "N/A";
  }
  