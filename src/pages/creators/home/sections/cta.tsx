export default function CTASection() {
  return (
    <div className="container w-full flex flex-col items-center gap-[63px] max-md:mb-[154px]">
      <div className="max-w-[700px] flex flex-col items-center gap-3">
        <div className="w-fit flex flex-col items-center text-center gap-2 font-sf-pro text-white uppercase">
          <p className="w-fit text-[32px] font-black">seamless management</p>
          <p className="font-light">
            The Afro Revive mobile app brings the power of events right to your
            pocket. Designed for both fans and event professionals, the app
            makes attending and managing events smoother than eve
          </p>
        </div>
        <div className="flex items-center justify-center gap-5">
          {[
            { src: "/assets/landing-page/google-play.png", alt: "Google Play" },
            { src: "/assets/landing-page/apple-store.png", alt: "Apple Store" },
          ].map((item) => (
            <img
              key={item.alt}
              src={item.src}
              alt={item.alt}
              className="max-w-[135px] max-h-10 w-auto h-auto"
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-y-10 items-center justify-between">
        {[
          {
            heading: "scan tickets, manage guests, and stay connected!",
            details:
              "Scan tickets on-site, manage guest lists, chat with vendors or organizers, and keep things running smoothly — even during the event",
          },
          {
            heading:
              "Access tickets instantly, get updates, and check in with ease!",
            details:
              "with the built-in wallet, get event updates, and enjoy a secure, hassle-free entry experience — all from your phone.",
          },
        ].map((item) => (
          <div
            key={item.heading}
            className="max-w-[540px] flex flex-col gap-2 font-sf-pro text-white uppercase max-md:text-center"
          >
            <p className="text-xl font-black">{item.heading}</p>
            <p className="font-light">{item.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
