"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYoutubeEmbedUrl = getYoutubeEmbedUrl;
function getYoutubeEmbedUrl(youtubeUrl) {
    let videoId;
    try {
        const url = new URL(youtubeUrl);
        // Check the URL pattern
        if (url.hostname === "youtu.be") {
            // For share links: https://youtu.be/VIDEO_ID
            videoId = url.pathname.slice(1);
        }
        else if (url.hostname === "www.youtube.com" ||
            url.hostname === "youtube.com") {
            // For watch links: https://www.youtube.com/watch?v=VIDEO_ID
            videoId = url.searchParams.get("v");
        }
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }
        else {
            return "N/A"; // Return a fallback URL or a default error state.
        }
    }
    catch (error) {
        console.error("Invalid YouTube URL:", error);
        return "N/A"; // Return a fallback value in case of an invalid URL
    }
}
