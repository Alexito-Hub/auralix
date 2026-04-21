export interface TikTokAuthor {
    id: string;
    avatar: string | null;
    nickname: string;
    username: string;
    followers: number;
    following: number;
    like: number;
    verified: boolean;
    videoCount: number;
}

export interface TikTokMusic {
    id: string | null;
    title: string;
    author: string;
    thumbnail: string | null;
    duration: string;
    url: string | null;
}

export interface TikTokResult {
    id: string | null;
    like: number;
    views: number;
    share: number;
    comment: number;
    isVideo: boolean;
    title: string;
    region: string | null;
    duration: string;
    download: string | string[];
    author: TikTokAuthor;
    music: TikTokMusic;
}