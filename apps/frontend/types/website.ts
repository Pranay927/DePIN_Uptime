interface Tick {
    id: string;
    createdAt: string;
    status: string;
    latency: number;
}
export interface Website {
    id: string;
    url: string;
    ticks: Tick[]
}
