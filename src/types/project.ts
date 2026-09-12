export type Locale = "en" | "az" | "ka";
export type ProjectTranslation = { title:string; shortDescription:string; overview?:string; problem?:string; solution?:string; myRole?:string; keyFeatures?:string; architecture?:string; challenges?:string; };
export type ProjectImage = { url:string; altText?:Partial<Record<Locale,string>>; displayOrder:number };
export type Project = {
  id:string;
  slug:string;
  category:"web"|"mobile"|"desktop"|"full-stack"|"backend"|"other";
  status:"active"|"completed"|"in-progress"|"archived";
  featured:boolean;
  published:boolean;
  displayOrder:number;
  githubUrl?:string;
  liveUrl?:string;
  coverImage?:string;
  images?:ProjectImage[];
  technologies:string[];
  translations:Record<Locale,ProjectTranslation>;
};
