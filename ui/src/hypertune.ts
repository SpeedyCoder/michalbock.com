import {initializeHypertune} from "./generated/hypertune";

const hypertune = initializeHypertune({}, {
    shouldStartIntervals: true,
    shouldListenForUpdates: true,
});

export default hypertune;
