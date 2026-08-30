export const SCRAPING_TARGETS = [
  { id: 'NODE-01', name: 'BMA Procurement eGP2', domain: 'egp2.bangkok.go.th', url: 'https://egp2.bangkok.go.th/project-search?&budgetYear=2569', frequency: '15m', latency: '240ms', status: 'Healthy', successRate: '99.4%' },
  { id: 'NODE-02', name: 'CGD Main Announcement Portal', domain: 'process5.gprocurement.go.th', url: 'https://process5.gprocurement.go.th/egp-agpc01-web/announcement?keywordSearch=', frequency: '10m', latency: '410ms', status: 'Healthy', successRate: '98.8%' },
  { id: 'NODE-03', name: 'Department of Science Service RSS', domain: 'dss.go.th', url: 'https://www.dss.go.th/procurement/rss-cgd', frequency: '30m', latency: '120ms', status: 'Healthy', successRate: '100%' },
  { id: 'NODE-04', name: 'OCSC eGP Procurement', domain: 'egp.ocsc.go.th', url: 'https://egp.ocsc.go.th/procurement/all', frequency: '1h', latency: '580ms', status: 'Degraded', successRate: '92.1%' },
  { id: 'NODE-05', name: 'FDA MOPH Procurement Search', domain: 'gprocurement.fda.moph.go.th', url: 'https://gprocurement.fda.moph.go.th/procurement_search', frequency: '30m', latency: '310ms', status: 'Healthy', successRate: '97.5%' },
  { id: 'NODE-06', name: 'Phuket PAO Procurement', domain: 'egp.ppao.go.th', url: 'https://egp.ppao.go.th/', frequency: '2h', latency: '190ms', status: 'Healthy', successRate: '99.1%' },
];