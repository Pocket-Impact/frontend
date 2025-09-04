import React from "react";

interface TopicOverviewProps {
  topTopics: any[];
}

const TopicOverview = ({ topTopics }: TopicOverviewProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        {topTopics.map((topic, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <span
              className="w-3 h-3 rounded-full mb-1"
              style={{ background: topic.color || '#D05B8B' }}
            ></span>
            <span className="text-xs font-medium text-black/70">
              {topic.category}
            </span>
            <span className="text-xs text-black/50">
              {topic.percentage}%
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-2 mt-2">
        {topTopics.map((topic, idx) => (
          <span key={idx} className="text-xs text-black/40">
            {topic.count} feedbacks
          </span>
        ))}
      </div>
    </div>
  );
  // // ...existing code...
  // return (
  //   <div className="bg-white border flex flex-col gap-3 border-stroke p-4 rounded-lg">
  //     {/* Removed identifier prop check, as identifier is no longer a prop */}
  //     <div className="flex flex-col">
  //       <h2 className="text-lg font-semibold">Trending topics</h2>
  //       <p className="text-sm -mt-1 text-black/60">
  //         Most mentioned topics in feedback
  //       </p>
  //     </div>
  //     ) : (
  //     ""
  //     {/* ...existing code... */}
  //     <div className="flex flex-col gap-2">
  //       {topTopics?.map((topic) => (
  //         <div
  //           key={topic.category || topic.name}
  //           className="flex items-center w-full gap-2"
  //         >
  //           <div className="flex w-full gap-2 flex-col">
  //             <div className="flex w-full items-center justify-between">
  //               <h3 className="text-xs font-bold capitalize">
  //                 {topic.category || topic.name}
  //               </h3>
  //               <p className="text-xs text-black/60">
  //                 {topic.percentage ?? 0} %
  //               </p>
  //             </div>
  //             <div className="p-1 w-full rounded-full bg-black/10">
  //               <div
  //                 className="h-1 my-auto rounded-full bg-primary"
  //                 style={{ width: `${topic.percentage ?? 0}%` }}
  //               ></div>
  //             </div>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
};

export default TopicOverview;