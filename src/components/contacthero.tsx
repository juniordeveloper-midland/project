// For demonstration - replace with your router Link
const Link = ({ to, className, children }) => (
  <a href={to} className={className}>{children}</a>
);

const contact = () => {
  return (
    <section className="relative h-[85vh] md:h-[92vh] w-full overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/public/images/herocity.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-[#cacaca] bg-opacity-40" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className="relative mb-8 sm:mb-10 md:mb-14">
          <div className="relative w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 rotate-3 border-2 sm:border-[2.5px] md:border-[3px] border-orange-500" />
            <div className="absolute inset-0 -rotate-3 border-2 sm:border-[2.5px] md:border-[3px] border-orange-500" />
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-3 sm:px-4 md:px-6">
              <h1 className="text-white font-bold text-3xl xs:text-4xl sm:text-5xl md:text-6xl">CONTACT</h1>
              <div className="mt-2 sm:mt-3 h-[2px] sm:h-[3px] w-32 xs:w-36 sm:w-44 md:w-56 bg-white" />
            </div>
          </div>
        </div>

        <h2 className="text-[#123a89] text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight mb-6 sm:mb-8 md:mb-12 drop-shadow-[0_1px_1px_rgba(255,255,255,0.25)] max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl px-2">
          We'r her 24/7 to answer yout quries and provide tailored  secutity solutions for your business
        </h2>

        <nav className="text-white text-base sm:text-lg md:text-xl lg:text-2xl">
          <Link to="/" className="hover:underline"></Link>
          <span className="mx-3"></span>
          <span className="opacity-90"></span>
        </nav>
      </div>
    </section>
  );
};

export default contact;