export const GUIDE_PDF_PATH = "/Scaling_and_Reliability_Patterns.pdf";
export const INSTAGRAM_URL = "https://www.instagram.com/saadh393/";

export const GUIDE_PARTS = [
    {
        numeral: "I",
        title: "Serving reads fast",
        topics: "Indexing · Caching · Read replicas",
    },
    {
        numeral: "II",
        title: "Scaling writes & data",
        topics: "Batching · Partitioning · Sharding · Consistent hashing",
    },
    {
        numeral: "III",
        title: "Asynchronous work",
        topics: "Queues · Pub/Sub · Events · Workflow engines",
    },
    {
        numeral: "IV",
        title: "Designing for failure",
        topics: "Timeouts · Retries · Circuit breakers · Idempotency",
    },
    {
        numeral: "V",
        title: "Real-time delivery",
        topics: "Long polling · Server-Sent Events · WebSockets",
    },
    {
        numeral: "VI",
        title: "Putting it together",
        topics: "Symptom → pattern · Worked example · Cheat sheet",
    },
];

export const GUIDE_STATS = [
    { value: "21", label: "Patterns" },
    { value: "6", label: "Parts" },
    { value: "54", label: "Pages" },
];
