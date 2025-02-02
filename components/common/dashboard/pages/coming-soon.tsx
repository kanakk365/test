import Image from "next/image";

export default function ComingSoon() {
  return (
    <section className="py-10 bg-white sm:py-16 lg:py-24">
      <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="grid items-center md:grid-cols-2 gap-y-10 md:gap-x-20">
          <div className="pr-12 sm:pr-0">
            <div className="relative max-w-xs mb-12">
              <Image
                className="object-bottom rounded-md"
                src="https://static.vecteezy.com/system/resources/previews/021/282/092/non_2x/coming-soon-banner-icon-in-flat-style-promotion-label-illustration-on-isolated-background-open-poster-sign-business-concept-vector.jpg"
                alt=""
                width={500}
                height={500}
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Coming Soon!
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-400">
              Wedzing is currently under development. We are working hard to
              bring you the best.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
