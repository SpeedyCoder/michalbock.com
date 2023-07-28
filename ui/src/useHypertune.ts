import React, { useEffect, useMemo } from "react";
import hypertune from "./hypertune";

export default function useHypertune() {
    const [isInitialized, setIsInitialized] = React.useState<boolean>(
        hypertune.isInitialized()
    );

    useEffect(() => {
        hypertune.waitForInitialization().then(() => {
            console.log();
            setIsInitialized(true);
        });
    }, []);

    return useMemo(
        () =>
            hypertune
                .root({
                    context: {
                        language: 'en',
                    },
                }),
        []
    );
}