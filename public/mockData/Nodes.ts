interface NodeConfig {
    key: string;
    id: string;
    name: string;
    color: string;
    gradientId: string;
    avgLatency: string;
    p99: string;
    errorRate: string;
    status: 'Healthy' | 'Degraded';
}

export const NODES: NodeConfig[] = [
    { key: 'egp2', id: 'NODE-01', name: 'BMA eGP2 Proxy', color: '#6366f1', gradientId: 'gradEgp2', avgLatency: '240ms', p99: '310ms', errorRate: '0.1%', status: 'Healthy' },
    { key: 'cgd', id: 'NODE-02', name: 'CGD Main Portal', color: '#10b981', gradientId: 'gradCgd', avgLatency: '410ms', p99: '580ms', errorRate: '0.4%', status: 'Healthy' },
    { key: 'ocsc', id: 'NODE-03', name: 'OCSC Procurement', color: '#ef4444', gradientId: 'gradOcsc', avgLatency: '890ms', p99: '1420ms', errorRate: '7.9%', status: 'Degraded' },
    { key: 'fda', id: 'NODE-04', name: 'FDA MOPH Node', color: '#f59e0b', gradientId: 'gradFda', avgLatency: '310ms', p99: '420ms', errorRate: '0.2%', status: 'Healthy' },
];