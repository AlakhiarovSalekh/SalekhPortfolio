"use client";

import { useActionState } from "react";
import type { ProjectActionState } from "@/app/admin/projects/actions";

type TranslationRow = {
  locale: string;
  title?: string | null;
  short_description?: string | null;
  overview?: string | null;
  problem?: string | null;
  solution?: string | null;
  my_role?: string | null;
  key_features?: string | null;
  architecture?: string | null;
  challenges?: string | null;
};

type Action = (previous: ProjectActionState, formData: FormData) => Promise<ProjectActionState>;

function LocaleFields({ code, label, translation }: { code: "en" | "az" | "ka"; label: string; translation?: TranslationRow }) {
  return <fieldset className="translation-tabs">
    <legend>{label}</legend>
    <label>Title<input name={`${code}_title`} defaultValue={translation?.title ?? ""} required={code === "en"} maxLength={160}/></label>
    <label>Short description<textarea name={`${code}_short`} rows={3} defaultValue={translation?.short_description ?? ""} required={code === "en"} maxLength={500}/></label>
    <label>Overview<textarea name={`${code}_overview`} rows={4} defaultValue={translation?.overview ?? ""}/></label>
    <label>Problem<textarea name={`${code}_problem`} rows={4} defaultValue={translation?.problem ?? ""}/></label>
    <label>Solution<textarea name={`${code}_solution`} rows={4} defaultValue={translation?.solution ?? ""}/></label>
    <label>My role<textarea name={`${code}_role`} rows={3} defaultValue={translation?.my_role ?? ""}/></label>
    <label>Key features<textarea name={`${code}_features`} rows={4} defaultValue={translation?.key_features ?? ""}/></label>
    <label>Architecture<textarea name={`${code}_architecture`} rows={4} defaultValue={translation?.architecture ?? ""}/></label>
    <label>Challenges<textarea name={`${code}_challenges`} rows={4} defaultValue={translation?.challenges ?? ""}/></label>
  </fieldset>;
}

export function ProjectEditorForm({ action, project, disabled = false, submitLabel = "Create project" }: { action: Action; project?: any; disabled?: boolean; submitLabel?: string }) {
  const [state, formAction, pending] = useActionState(action, {});
  const translation = (locale: string) => project?.project_translations?.find((row: TranslationRow) => row.locale === locale);
  const technologies = project?.project_technologies?.map((row: any) => row.technologies?.name).filter(Boolean).join(", ") ?? "";

  return <form action={formAction} className="editor-form">
    {state.error && <div className="notice danger" role="alert"><strong>Could not save project.</strong><br/>{state.error}</div>}
    <div className="form-grid">
      <label>Slug<input name="slug" defaultValue={project?.slug ?? ""} placeholder="my-project" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" maxLength={120}/></label>
      <label>Category<select name="category" defaultValue={project?.category ?? "web"}><option value="web">Web</option><option value="mobile">Mobile</option><option value="desktop">Desktop</option><option value="full-stack">Full stack</option><option value="backend">Backend</option><option value="other">Other</option></select></label>
      <label>Status<select name="status" defaultValue={project?.status ?? "in-progress"}><option value="in-progress">In progress</option><option value="active">Active</option><option value="completed">Completed</option><option value="archived">Archived</option></select></label>
      <label>Display order<input name="display_order" type="number" min="-9999" max="9999" defaultValue={project?.display_order ?? 0}/></label>
      <label>GitHub URL<input name="github" type="url" placeholder="https://github.com/..." defaultValue={project?.github_url ?? ""}/></label>
      <label>Live URL<input name="live" type="url" placeholder="https://..." defaultValue={project?.live_url ?? ""}/></label>
    </div>
    <label>Technologies <span className="muted">(comma separated)</span><input name="technologies" placeholder="Next.js, TypeScript, Supabase" defaultValue={technologies}/></label>
    <div className="check-row">
      <label><input type="checkbox" name="featured" defaultChecked={Boolean(project?.featured)}/> Featured</label>
      <label><input type="checkbox" name="published" defaultChecked={Boolean(project?.published)}/> Published</label>
    </div>
    <LocaleFields code="en" label="English / Primary" translation={translation("en")}/>
    <LocaleFields code="az" label="Azərbaycan dili" translation={translation("az")}/>
    <LocaleFields code="ka" label="ქართული" translation={translation("ka")}/>
    {disabled && <div className="notice">Supabase is not configured, so CMS writes are disabled.</div>}
    <div className="form-actions">
      <button className="primary-button" type="submit" disabled={disabled || pending}>{pending ? "Saving…" : submitLabel}</button>
      {project?.slug && <a className="secondary-button" href={`/projects/${project.slug}`} target="_blank" rel="noopener noreferrer">Preview ↗</a>}
    </div>
  </form>;
}
