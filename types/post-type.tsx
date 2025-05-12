export type Post = {
  profiles: any;
  content?: string | null;
  created_at?: string;
  id?: string;
  image_urls?: string[] | null;
  author_id?: string | null;
};
export type Profiles = {
  avatar_url: string | null;
  comments: string | null;
  created_at: string;
  email: string | null;
  friends_id: string | null;
  id: string;
  likes: string | null;
  name: string | null;
  posts: string | null;
};
