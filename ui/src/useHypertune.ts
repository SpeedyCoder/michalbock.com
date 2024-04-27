import React, {useEffect, useMemo} from "react";
import hypertune from "./hypertune";

export default function useHypertune() {
    const [, setCommitHash] = React.useState(
        hypertune.getStateHash()
    );

    useEffect(() => {
        function listener(newStateHash: string): void {
            setCommitHash(newStateHash);
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
                    args: {
                        context: {
                            language: 'en',
                        },
                    }
                }),
        []
    );
}