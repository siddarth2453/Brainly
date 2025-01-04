export function getEmbedUrl(youtubeUrl:string) {
    let videoId;
    const url = new URL(youtubeUrl);

    // Check the URL pattern
    if (url.hostname === "youtu.be") {
        // For share links: https://youtu.be/VIDEO_ID
        videoId = url.pathname.slice(1);
    } else if (url.hostname === "www.youtube.com" || url.hostname === "youtube.com") {
        // For watch links: https://www.youtube.com/watch?v=VIDEO_ID
        videoId = url.searchParams.get("v");
    }

    // Return the embed URL if videoId is found
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}


