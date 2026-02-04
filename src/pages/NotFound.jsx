import { Link } from "react-router-dom";
import { CgArrowTopRight } from "react-icons/cg";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#BEB9A9] p-6">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-4">404</h1>
        <p className="text-xl md:text-2xl mb-8">The page you are looking for does not exist.</p>
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
};

export default NotFound;
