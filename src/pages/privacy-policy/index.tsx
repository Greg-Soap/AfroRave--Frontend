export default function PrivacyPolicyPage() {
  return (
    <div className="bg-transparent text-white min-h-screen  mx-auto w-full">
      <section className="relative max-h-[510px] h-screen flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 w-full ">
        {/* Background Image with Grayscale */}
        <div className="absolute inset-0 bg-cover bg-center filter grayscale " />

        <div className="absolute inset-0 bg-gradient-to-t from-dark-gray via-dark-gray/10 to-transparent" />
      </section>
    </div>
  );
}
