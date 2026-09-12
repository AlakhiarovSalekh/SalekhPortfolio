import Link from "next/link";
import { AdminShell } from "@/components/admin-shell";
import { deleteProject } from "@/app/admin/projects/actions";
import { requireRole } from "@/lib/auth/require-role";
import { getAdminProjects } from "@/lib/data/admin-projects";

export default async function Page({ searchParams }: { searchParams: Promise<{ deleted?: string; error?: string }> }) {
  const auth = await requireRole();
  const query = await searchParams;
  const projects = await getAdminProjects();
  return <AdminShell role={auth.role}>
    <div className="admin-top"><div><span className="eyebrow">CONTENT</span><h1>Projects</h1><p>Drafts and published case studies.</p></div><Link className="primary-button" href="/admin/projects/new">Add project</Link></div>
    {query.deleted === "1" && <div className="notice success">Project deleted.</div>}
    {query.error && <div className="notice danger">{query.error}</div>}
    {!projects.length && <div className="notice">No projects yet. Use <strong>Add project</strong> to create your first case study.</div>}
    {!!projects.length && <div className="admin-table">
      <div className="admin-row admin-head"><span>Project</span><span>Status</span><span>Published</span><span>Action</span></div>
      {projects.map((project: any) => {
        const english = project.project_translations?.find?.((translation: any) => translation.locale === "en");
        const title = english?.title ?? project.translations?.en?.title ?? project.slug;
        return <div className="admin-row" key={project.id}>
          <span><strong>{title}</strong><small>{project.slug}</small></span>
          <span>{project.status}</span>
          <span>{project.published ? "Yes" : "No"}</span>
          <span className="row-actions">
            {!String(project.id).startsWith("demo-") && <Link className="text-link" href={`/admin/projects/${project.id}/edit`}>Edit</Link>}
            {project.published && <Link className="text-link" href={`/projects/${project.slug}`} target="_blank">View ↗</Link>}
            {auth.role === "OWNER" && !String(project.id).startsWith("demo-") && <form action={deleteProject}><input type="hidden" name="id" value={project.id}/><button className="danger-link" type="submit">Delete</button></form>}
          </span>
        </div>;
      })}
    </div>}
  </AdminShell>;
}
