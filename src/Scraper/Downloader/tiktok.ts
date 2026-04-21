import { TikTokResult } from "../../@Types/Scraper"

async function tt(url: string): Promise<TikTokResult | null> {
    const html: string = await fetch(url, {
        headers: {
            authority: "www.tiktok.com",
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": `"Android"`,
            "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36"
        }
    }).then(a => a.text());

    const match: RegExpMatchArray | null = html.match(/<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__"[^>]*>([\s\S]*?)<\/script>/);
    if (!match) return null;

    // Using 'any' for the parsed scraped JSON because the structure is massive and volatile
    const json: any = JSON.parse(match[1]);
    const data: any = json.__DEFAULT_SCOPE__["webapp.reflow.video.detail"].itemInfo.itemStruct;

    // download can be an array of strings (images) or a single string (video URL)
    let download: string | string[] = data.imagePost
        ? data.imagePost.images.reduce((acc: string[], img: any) => {
            return acc.concat(img.imageURL.urlList);
        }, [])
        : await fetch(`https://www.tiktok.com/player/api/v1/items?item_ids=${data.id}`)
            .then(a => a.json())
            .then((b: any) => b.items[0].video_info.url_list[0]);

    return {
        id: data.id || data.aweme_id || null,
        like: data.stats?.diggCount || 0,
        views: data.stats?.playCount || data.play || 0,
        share: data.stats?.shareCount || 0,
        comment: data.stats?.commentCount || 0,
        isVideo: !data.imagePost,
        title: data.desc || data.suggestedWords?.[0] || "",
        region: data.locationCreated || null,
        duration: `${data.duration || data.music?.duration || 0} second`,
        download: download,
        author: {
            id: data.author?.id || "",
            avatar: data.author?.avatarThumb || null,
            nickname: data.author?.nickname || "",
            username: data.author?.uniqueId || "",
            followers: data.author?.followerCount || 0,
            following: data.author?.followingCount || 0,
            like: data.author?.heartCount || 0,
            verified: data.author?.verified || false,
            videoCount: data.author?.videoCount || 0
        },
        music: {
            id: data.music?.id || null,
            title: data.music?.title || "",
            author: data.music?.authorName || "",
            thumbnail: data.music?.coverLarge || data.music?.coverMedium || data.music?.coverThumb || null,
            duration: `${data.music?.duration || 0} second`,
            url: data.music?.playUrl || null
        }
    };
}

(async () => {
    // Fixed the missing closing quote on the URL string here
    console.log(await tt("https://www.tiktok.com/@maksimstefanov4/photo/7621166300668185878?_r=1"));
})();