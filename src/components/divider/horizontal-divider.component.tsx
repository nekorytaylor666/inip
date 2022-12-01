import React from "react";

export const HorizontalDivider = (props) => {
    const { className } = props;
    return (
        <div
            className={`w-full border-b border-gray-600  ${className ?? ""}`}
        ></div>
    );
};
