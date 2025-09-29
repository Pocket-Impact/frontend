import React from "react";
import PropTypes from "prop-types";

const SideLink = ({ active, link }) => {
  const { name, href, icon: Icon } = link;
  return (
    <a href={href}>
      <div
        className={`hover:bg-gray-100 flex max-md:w-max items-center transition duration-300 text-black gap-3.5 inter font-semibold p-3.5 max-lg:p-3 max-md:p-2 rounded-gl ${
          active ? "bg-primary/5" : ""
        }`}
      >
        <Icon className="w-5 max-lg:w-3 h-auto" />
        <span className="base max-md:hidden">{name}</span>
      </div>
    </a>
  );
};

SideLink.propTypes = {
  active: PropTypes.bool,
  link: PropTypes.shape({
    name: PropTypes.string,
    href: PropTypes.string,
    icon: PropTypes.elementType,
  }),
};

export default SideLink;
