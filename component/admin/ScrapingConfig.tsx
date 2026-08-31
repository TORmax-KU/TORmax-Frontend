'use client';

import { SCRAPING_TARGETS } from '@/public/mockData/scrapingTargets';

interface ScrapingConfigProps {
  apiKey: string;
  onApiKeyChange: (value: string) => void;
  renderJs: boolean;
  onRenderJsChange: (value: boolean) => void;
  ultraPremiumProxies: boolean;
  onProxiesChange: (value: boolean) => void;
  onScrapeClick: (targetName: string) => void;
  onAddLog: (type: string, msg: string) => void;
  t: {
    scraperTitle: string;
    scraperSubtitle: string;
    poolActive: string;
    apiKeyLabel: string;
    jsRendering: string;
    residentialProxies: string;
    targetsTitle: string;
    interval: string;
    btnScrape: string;
  };
}

export function ScrapingConfig({
  apiKey,
  onApiKeyChange,
  renderJs,
  onRenderJsChange,
  ultraPremiumProxies,
  onProxiesChange,
  onScrapeClick,
  onAddLog,
  t,
}: ScrapingConfigProps) {
  return (
    <div className="space-y-6">
      <div className="card bg-base-100 border border-base-300 p-6 space-y-4 shadow-sm">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div>
            <h3 className="font-bold text-base text-base-content">{t.scraperTitle}</h3>
            <p className="text-xs text-base-content/80">{t.scraperSubtitle}</p>
          </div>
          <span className="badge badge-success gap-1 font-mono font-bold">
            <i className="ri-check-line"></i> {t.poolActive}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-xs text-base-content">{t.apiKeyLabel}</span>
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => onApiKeyChange(e.target.value)}
              className="input input-sm input-bordered font-mono bg-base-100 text-base-content"
            />
          </div>

          <div className="form-control pt-6">
            <label className="label cursor-pointer justify-start gap-3">
              <input
                type="checkbox"
                checked={renderJs}
                onChange={(e) => onRenderJsChange(e.target.checked)}
                className="checkbox checkbox-primary checkbox-sm"
              />
              <span className="label-text font-bold text-xs text-base-content">{t.jsRendering}</span>
            </label>
          </div>

          <div className="form-control pt-6">
            <label className="label cursor-pointer justify-start gap-3">
              <input
                type="checkbox"
                checked={ultraPremiumProxies}
                onChange={(e) => onProxiesChange(e.target.checked)}
                className="checkbox checkbox-primary checkbox-sm"
              />
              <span className="label-text font-bold text-xs text-base-content">{t.residentialProxies}</span>
            </label>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 border border-base-300 p-6 space-y-4 shadow-sm">
        <h3 className="font-bold text-base text-base-content">{t.targetsTitle}</h3>
        <div className="divide-y divide-base-300">
          {SCRAPING_TARGETS.map((target) => (
            <div key={target.id} className="py-3 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-base-content/70 font-bold">{target.id}</span>
                  <span className="font-bold text-xs text-base-content">{target.name}</span>
                </div>
                <a href={target.url} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline font-mono">
                  {target.url}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge badge-ghost font-mono text-[10px] text-base-content">{t.interval}: {target.frequency}</span>
                <button
                  onClick={() => {
                    onScrapeClick(target.name);
                    onAddLog('SCRAPE', `Initiated manual scrape request for: ${target.name}`);
                  }}
                  className="btn btn-xs btn-primary"
                >
                  <i className="ri-download-cloud-line"></i> {t.btnScrape}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}