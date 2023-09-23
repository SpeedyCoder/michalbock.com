import React, { useEffect, useMemo } from "react";
import hypertune from "./hypertune";

export default function useHypertune() {
    const [, setCommitHash] = React.useState(
        hypertune.getCommitHash()
    );

    useEffect(() => {
        function listener(newCommitHash: string): void {
            setCommitHash(newCommitHash);
        }
        hypertune.addUpdateListener(listener);
        return () => {
            hypertune.removeUpdateListener(listener);
        }
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