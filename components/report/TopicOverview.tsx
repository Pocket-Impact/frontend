import React from "react";

const TopicOverview = ({ topTopics, identifier }: { topTopics: any[] }) => {
  return (
    <div className="bg-white border flex flex-col gap-3 border-stroke p-4 rounded-lg">
      {!identifier ? (
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">Trending topics</h2>
          <p className="text-sm -mt-1 text-black/60">
            Most mentioned topics in feedback
          </p>
        </div>
      ) : (
        ""
      )}
      <div className="flex flex-col gap-2">
        {topTopics?.map((topic) => (
          <div
            key={topic.category || topic.name}
            className="flex items-center w-full gap-2"
          >
            <div className="flex w-full gap-2 flex-col">
              <div className="flex w-full items-center justify-between">
                <h3 className="text-xs font-bold capitalize">
                  {topic.category || topic.name}
                </h3>
                <p className="text-xs text-black/60">
                  {topic.percentage ?? 0} %
                </p>
              </div>
              <div className="p-1 w-full rounded-full bg-black/10">
                <div
                  className="h-1 my-auto rounded-full bg-primary"
                  style={{ width: `${topic.percentage ?? 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicOverview;
