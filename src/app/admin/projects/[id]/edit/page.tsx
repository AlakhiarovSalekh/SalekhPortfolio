import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import { ProjectEditorForm } from "@/components/project-editor-form";
import { updateProject } from "@/app/admin/projects/actions";
import { requireRole } from "@/lib/auth/require-role";
import { getAdminProject } from "@/lib/data/admin-projects";
export default async function Page({params}:{params:Promise<{id:string}>}){const auth=await requireRole();const {id}=await params;const project=await getAdminProject(id);if(auth.configured&&!project)notFound();const action=updateProject.bind(null,id);return <AdminShell role={auth.role}><div className="admin-top"><div><span className="eyebrow">EDIT CONTENT</span><h1>Edit project</h1></div></div><ProjectEditorForm action={action} project={project} disabled={!auth.configured} submitLabel="Save changes"/></AdminShell>;}
