import { bottombarLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";

const BottomBar = () => {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            key={link.label}
            className={`${
              isActive && "bg-primary-500 rounded-[10px]"
            } flex-center flex-col gap-1 p-2 transition`}
            to={link.route}
          >

            <p className="tiny-medium text-light-2">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default BottomBar;
