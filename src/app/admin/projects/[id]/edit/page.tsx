import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import { ProjectEditorForm } from "@/components/project-editor-form";
import { ProjectMediaManager } from "@/components/project-media-manager";
import { updateProject } from "@/app/admin/projects/actions";
import { requireRole } from "@/lib/auth/require-role";
import { getAdminProject } from "@/lib/data/admin-projects";

export default async function Page({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ created?: string; saved?: string }> }) {
  const auth = await requireRole();
  const { id } = await params;
  const query = await searchParams;
  const project = await getAdminProject(id);
  if (auth.configured && !project) notFound();
  const action = updateProject.bind(null, id);
  return <AdminShell role={auth.role}>
    <div className="admin-top"><div><span className="eyebrow">EDIT CONTENT</span><h1>Edit project</h1><p>Content, publishing, technology tags and project media.</p></div></div>
    {query.created === "1" && <div className="notice success">Project created. You can now add cover and gallery images.</div>}
    {query.saved === "1" && <div className="notice success">Project changes saved.</div>}
    <ProjectEditorForm action={action} project={project} disabled={!auth.configured} submitLabel="Save changes"/>
    {project && <ProjectMediaManager projectId={project.id} coverPath={project.cover_image_path} images={project.project_images ?? []}/>} 
  </AdminShell>;
}
