export type Post = {
  id: number;
  content: string;
  image_urls: string[];
  user_id?: string;
  profiles: Profiles;
};
export type Profiles = {
  email: string;
  avatar_url: string;
};
