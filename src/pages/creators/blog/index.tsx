import { EmptyPage } from "@/pages/landing-page/_component/empty-page";

export default function CreatorsBlogPage() {
  return (
    <>
      <img
        src="/assets/landing-page/blog.png"
        alt="Abstract"
        className="fixed inset-0 w-full h-full object-cover z-0"
      />
      <EmptyPage withGradient={false} className="bg-transparent" />
    </>
  );
}
