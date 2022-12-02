import React from "react";

export const SkeletonGridComponent = ({ quantity = 9 }) => {
    return (
        <div>
            {/* create skeleton card with image of 500 height and 3 items grid all grey */}

            <div className="animate-pulse w-full ">
                <div className="grid grid-cols-3 gap-8 gap-y-16 py-1">
                    {Array(quantity)
                        .fill(0)
                        .map((_) => (
                            <div>
                                <div className="bg-gray-600 h-[500px]"></div>
                                <div className="h-8 bg-gray-600 mt-4 rounded w-3/4"></div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};
