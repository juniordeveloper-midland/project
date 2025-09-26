import { Link } from 'react-router-dom';

const sectionHero = () => {
  return (
    <section className="relative h-[85vh] md:h-[92vh] w-full overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg')",
        }}
      />
      <div className="absolute inset-0 bg-[#cacaca] bg-opacity-70" />


      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div className="relative mb-14">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 rotate-3 border-2 md:border-[3px] border-orange-500" />
            <div className="absolute inset-0 -rotate-3 border-2 md:border-[3px] border-orange-500" />
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
              <h1 className="text-white font-bold text-5xl md:text-6xl">Our Sections</h1>
              <div className="mt-3 h-[3px] w-44 md:w-56 bg-white" />
            </div>
          </div>
        </div>

        <h2 className="text-[#123a89] text-4xl md:text-5xl font-semibold leading-tight mb-12 drop-shadow-[0_1px_1px_rgba(255,255,255,0.25)]">
          Protecting Every Industry with Tailored Security Solutions
        </h2>

        <nav className="text-white text-xl md:text-2xl">
          <Link to="/" className="hover:underline"></Link>
          <span className="mx-3"></span>
          <span className="opacity-90"></span>
        </nav>
      </div>
    </section>
  );
};

export default sectionHero;