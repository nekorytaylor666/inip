import React from "react";
import * as Progress from "@radix-ui/react-progress";
import styles from "./progress.module.css";

const ProgressBar: React.FC<{ value: number; max: number }> = ({
    value,
    max,
}) => {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setTimeout(() => setProgress(value), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Progress.Root className={styles.ProgressRoot} value={value} max={max}>
            <Progress.Indicator
                className={styles.ProgressIndicator}
                style={{ transform: `translateX(-${100 - progress}%)` }}
            />
        </Progress.Root>
    );
};

export default ProgressBar;
