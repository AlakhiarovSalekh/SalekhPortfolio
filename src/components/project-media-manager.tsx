"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type ImageRow = { id: string; storage_path: string; alt_text_en?: string | null; alt_text_az?: string | null; alt_text_ka?: string | null; display_order: number };
const allowed = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

function safeName(name: string) {
  const ext = name.split(".").pop()?.toLowerCase() || "jpg";
  const base = name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 50) || "image";
  return `${base}.${ext}`;
}

export function ProjectMediaManager({ projectId, coverPath, images }: { projectId: string; coverPath?: string | null; images: ImageRow[] }) {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const publicUrl = (path?: string | null) => path ? supabase.storage.from("portfolio-media").getPublicUrl(path).data.publicUrl : null;

  function validate(file: File) {
    if (!allowed.has(file.type)) throw new Error("Only JPG, PNG, WebP and AVIF images are allowed.");
    if (file.size > 8 * 1024 * 1024) throw new Error("Image must be 8 MB or smaller.");
  }

  async function uploadCover(file: File) {
    setBusy(true); setMessage(null);
    try {
      validate(file);
      const path = `${projectId}/cover-${Date.now()}-${safeName(file.name)}`;
      const upload = await supabase.storage.from("portfolio-media").upload(path, file, { contentType: file.type, upsert: false });
      if (upload.error) throw upload.error;
      const update = await supabase.from("projects").update({ cover_image_path: path, updated_at: new Date().toISOString() }).eq("id", projectId);
      if (update.error) { await supabase.storage.from("portfolio-media").remove([path]); throw update.error; }
      if (coverPath) await supabase.storage.from("portfolio-media").remove([coverPath]);
      setMessage("Cover image updated."); router.refresh();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Cover upload failed."); }
    finally { setBusy(false); }
  }

  async function uploadGallery(file: File) {
    setBusy(true); setMessage(null);
    try {
      validate(file);
      const path = `${projectId}/gallery-${Date.now()}-${safeName(file.name)}`;
      const upload = await supabase.storage.from("portfolio-media").upload(path, file, { contentType: file.type, upsert: false });
      if (upload.error) throw upload.error;
      const insert = await supabase.from("project_images").insert({ project_id: projectId, storage_path: path, display_order: images.length });
      if (insert.error) { await supabase.storage.from("portfolio-media").remove([path]); throw insert.error; }
      setMessage("Gallery image added."); router.refresh();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Gallery upload failed."); }
    finally { setBusy(false); }
  }

  async function removeCover() {
    if (!coverPath) return;
    setBusy(true); setMessage(null);
    try {
      const update = await supabase.from("projects").update({ cover_image_path: null, updated_at: new Date().toISOString() }).eq("id", projectId);
      if (update.error) throw update.error;
      await supabase.storage.from("portfolio-media").remove([coverPath]);
      setMessage("Cover removed."); router.refresh();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Could not remove cover."); }
    finally { setBusy(false); }
  }

  async function removeGallery(image: ImageRow) {
    setBusy(true); setMessage(null);
    try {
      const removeRow = await supabase.from("project_images").delete().eq("id", image.id);
      if (removeRow.error) throw removeRow.error;
      await supabase.storage.from("portfolio-media").remove([image.storage_path]);
      setMessage("Gallery image removed."); router.refresh();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Could not remove image."); }
    finally { setBusy(false); }
  }

  return <section className="media-manager">
    <div className="section-heading"><div><span className="eyebrow">MEDIA</span><h2>Project images</h2><p>Upload a cover image and gallery screenshots. JPG, PNG, WebP or AVIF, up to 8 MB.</p></div></div>
    {message && <div className="notice" role="status">{message}</div>}
    <div className="media-block">
      <h3>Cover image</h3>
      {coverPath ? <div className="media-item media-cover"><img src={publicUrl(coverPath)!} alt="Current project cover"/><button className="danger-link" type="button" disabled={busy} onClick={removeCover}>Remove cover</button></div> : <p className="muted">No cover image yet.</p>}
      <label className="secondary-button file-button">{busy ? "Working…" : "Upload cover"}<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" disabled={busy} onChange={(event) => { const file = event.target.files?.[0]; if (file) void uploadCover(file); event.currentTarget.value = ""; }}/></label>
    </div>
    <div className="media-block">
      <h3>Gallery</h3>
      <div className="media-grid">{images.map((image) => <div className="media-item" key={image.id}><img src={publicUrl(image.storage_path)!} alt={image.alt_text_en || "Project screenshot"}/><button className="danger-link" type="button" disabled={busy} onClick={() => void removeGallery(image)}>Remove</button></div>)}</div>
      {!images.length && <p className="muted">No gallery images yet.</p>}
      <label className="secondary-button file-button">{busy ? "Working…" : "Add gallery image"}<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" disabled={busy} onChange={(event) => { const file = event.target.files?.[0]; if (file) void uploadGallery(file); event.currentTarget.value = ""; }}/></label>
    </div>
  </section>;
}
