import React from "react";

export const SkeletonGridComponent = ({ quantity = 9 }) => {
    return (
        <div>
            {/* create skeleton card with image of 500 height and 3 items grid all grey */}

            <div className="animate-pulse w-full ">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 lg:gap-y-16">
                    {Array(quantity)
                        .fill(0)
                        .map((_) => (
                            <div>
                                <div className="bg-gray-600 h-72 lg:h-[500px]"></div>
                                <div className="h-8 bg-gray-600 mt-4 rounded w-3/4"></div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};
