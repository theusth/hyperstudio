import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export type TestimonialItem = {
  id: string;
  name: string;
  company: string | null;
  photo: string | null;
  content: string;
  rating: number;
};

export function Testimonials({ testimonials }: { testimonials: TestimonialItem[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="relative py-24 sm:py-32">
      <Container className="flex flex-col gap-16">
        <SectionHeading
          eyebrow="Depoimentos"
          title="Quem trabalhou com a gente"
          description="Experiências de quem confiou na Hyper Studio para o seu projeto digital."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={(index % 3) * 0.08}>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-zinc-700"
                      }`}
                    />
                  ))}
                </div>

                <p className="flex-1 text-sm leading-relaxed text-zinc-300">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-2">
                  {testimonial.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={testimonial.photo}
                      alt={testimonial.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-bold text-white">
                      {testimonial.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                    {testimonial.company && (
                      <p className="text-xs text-zinc-500">{testimonial.company}</p>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
