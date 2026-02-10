import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { services } from "../data/services";
import { CgArrowTopRight } from "react-icons/cg";

function ServicePage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  // Scroll to top when service page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  const service = services[serviceId];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service not found</h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#C5C26D] text-black px-6 py-3 rounded-full font-medium hover:bg-[#b5b25d] transition-colors"
          >
            <span className="tracking-wider text-sm">GO HOME</span>
            <CgArrowTopRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  const handleContactClick = () => {
    window._internalNavigation = true;
    navigate("/#contact");
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6 md:px-12 lg:px-16">
        <Link to="/#services" onClick={() => { window._internalNavigation = true; }} className="text-lg md:text-xl font-medium text-black hover:opacity-70 transition-opacity">
          {service.title}
        </Link>
        <button
          onClick={handleContactClick}
          className="inline-flex items-center gap-2 bg-[#C5C26D] text-black px-4 py-2 rounded-full font-medium hover:bg-[#b5b25d] transition-colors text-sm"
        >
          <span className="tracking-wider text-xs">CONTACT US</span>
          <CgArrowTopRight size={14} />
        </button>
      </header>

      {/* Hero Image */}
      <section className="px-6 md:px-12 lg:px-16 mb-6">
        <div className="w-full h-[160px] md:h-[200px] bg-[#D9D9D9] overflow-hidden">
          {service.heroImage ? (
            <img
              src={service.heroImage}
              alt={service.title}
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>
      </section>

      {/* Description */}
      <section className="px-6 md:px-12 lg:px-16 mb-8">
        <p className="text-sm md:text-base leading-relaxed text-black">
          {service.description}
        </p>
      </section>

      {/* Features Gallery - Masonry Style */}
      <section className="px-6 md:px-12 lg:px-16 pb-12">
        {/* Mobile Layout - Matching desktop pattern */}
        <div className="grid grid-cols-2 gap-x-4 md:gap-x-6">
          {/* Left Column - Narrower */}
          <div className="flex flex-col">
            {/* First Image - Shorter */}
            <div className="w-full aspect-[4/5] bg-[#D9D9D9] overflow-hidden">
              {service.features[0]?.image ? (
                <img
                  src={service.features[0].image}
                  alt={service.features[0].label}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>

            {/* Durable Label */}
            <div className="flex items-center gap-2 my-3">
              <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
              <span className="text-xs font-medium">{service.features[1]?.label}</span>
            </div>

            {/* Third Image - Taller */}
            <div className="w-full aspect-[3/4] bg-[#D9D9D9] overflow-hidden">
              {service.features[2]?.image ? (
                <img
                  src={service.features[2].image}
                  alt={service.features[2].label}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>

            {/* Contact Button - Bottom */}
            <button
              onClick={handleContactClick}
              className="inline-flex items-center justify-between bg-[#C5C26D] text-black pl-4 pr-3 py-3 rounded-lg font-medium hover:bg-[#b5b25d] transition-colors w-[170px] mt-4"
            >
              <span className="tracking-wider text-xs">CONTACT US</span>
              <CgArrowTopRight size={18} />
            </button>
          </div>

          {/* Right Column - Offset down */}
          <div className="flex flex-col pt-4">
            {/* Quality Curtains Label */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
              <span className="text-xs font-medium">{service.features[0]?.label}</span>
            </div>

            {/* Second Image - Medium height */}
            <div className="w-full aspect-[4/5] bg-[#D9D9D9] overflow-hidden">
              {service.features[1]?.image ? (
                <img
                  src={service.features[1].image}
                  alt={service.features[1].label}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>

            {/* Aesthetic Label */}
            <div className="flex items-center gap-2 my-3">
              <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
              <span className="text-xs font-medium">{service.features[2]?.label}</span>
            </div>

            {/* Fourth Image - Bottom - Extends to match left column height */}
            <div className="w-full flex-1 min-h-[200px] bg-[#D9D9D9] overflow-hidden">
              {service.features[3]?.image ? (
                <img
                  src={service.features[3].image}
                  alt={service.features[3].label}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full p-6 bg-[#927C7C] text-white text-center">
        <p className="text-sm">&copy; 2024 Alhua Curtains. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default ServicePage;
