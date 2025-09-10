"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

import PropTypes from 'prop-types';

const OverviewCard = ({ card, index, user, analysis, onClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const pathname = usePathname();

  const handleClick = () => {
    if (onClick && card.key) {
      onClick(card.key);
      console.log(card.key)
    }
  };

  return (
    <div
      className="bg-white shadow-sm p-4 flex flex-col justify-between gap-2 rounded-xl cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-medium sm">{card.title}</span>
        <div className="rounded-full h-max bg-[#f8f4f9] p-2">
          <card.icon className="w-4 max-lg:w-3.5 max-md:w-3 h-auto text-blue-600" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-black font-medium lg">
          <span className="font-bold text-2xl">{(card.value || "0").toString().padStart(2, "0")}</span>
          {card.percent && "%"}{" "}
          {card.title.split(" ").length > 1
            ? card.title.split(" ")[1].toLowerCase()
            : card.title.toLowerCase()}
        </span>
        <span>
          {card.increase ? (
            <span
              className={`xs ${card.increase >= 0 ? "text-green-600" : "text-red-600"
                } font-medium flex items-center gap-1`}
            >
              {card.increase >= 0 ? "+" : ""}
              {card.increase}%{" "}
              <span className="text-[#bbbec1]">from yesterday</span>
            </span>
          ) : (
            <span className="text-sm text-black/60 font-medium">No change</span>
          )}
        </span>
      </div>
    </div>
  );
};

OverviewCard.propTypes = {
  card: PropTypes.object.isRequired,
  index: PropTypes.number,
  user: PropTypes.object,
  analysis: PropTypes.object,
  onClick: PropTypes.func,
};

export default OverviewCard;
