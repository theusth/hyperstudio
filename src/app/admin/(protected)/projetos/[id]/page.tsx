import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectForm } from "../ProjectForm";
import { updateProjectAction } from "@/server/actions/projects";
import { GalleryManager } from "@/components/admin/GalleryManager";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: { images: { orderBy: { order: "asc" } } },
  });
  if (!project) notFound();

  const boundAction = updateProjectAction.bind(null, id);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">Editar projeto</h1>
        <p className="mt-1 text-sm text-zinc-400">{project.name}</p>
      </div>

      <ProjectForm
        action={boundAction}
        submitLabel="Salvar alterações"
        defaultValues={{
          name: project.name,
          slug: project.slug,
          category: project.category,
          shortDescription: project.shortDescription,
          fullDescription: project.fullDescription,
          coverImage: project.coverImage,
          projectUrl: project.projectUrl,
          technologies: project.technologies,
          client: project.client,
          projectDate: project.projectDate ? project.projectDate.toISOString().slice(0, 10) : "",
          featured: project.featured,
          published: project.published,
        }}
      />

      <div className="max-w-2xl border-t border-white/10 pt-8">
        <h2 className="font-display text-lg font-semibold text-white">Galeria de imagens</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Adicione imagens extras do projeto. Você pode definir qualquer uma delas como capa.
        </p>
        <div className="mt-5">
          <GalleryManager
            projectId={project.id}
            images={project.images}
            coverImage={project.coverImage}
          />
        </div>
      </div>
    </div>
  );
}
