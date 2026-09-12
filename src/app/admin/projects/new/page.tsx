import { AdminShell } from "@/components/admin-shell";
import { ProjectEditorForm } from "@/components/project-editor-form";
import { createProject } from "@/app/admin/projects/actions";
import { requireRole } from "@/lib/auth/require-role";

export default async function Page() {
  const auth = await requireRole();
  return <AdminShell role={auth.role}>
    <div className="admin-top"><div><span className="eyebrow">NEW CONTENT</span><h1>Add project</h1><p>Create the project first; after saving you can upload its cover and gallery images.</p></div></div>
    <ProjectEditorForm action={createProject} disabled={!auth.configured}/>
  </AdminShell>;
}
