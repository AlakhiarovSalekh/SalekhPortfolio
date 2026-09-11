import { ProjectDetail } from "@/components/project-detail";
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return <ProjectDetail locale="az" slug={slug}/>;}
