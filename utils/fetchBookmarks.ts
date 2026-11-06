import { ProjectLoadedState } from "@/interface/ProjectLoadedState";
import { API_BASE_URL } from "@/lib/auth";

export default function fetchBookmarks(ids: string[]): Promise<Record<string, ProjectLoadedState>> {
    const controller = new AbortController();
    const pendingKey = ids.join(',');
    return new Promise((resolve) => {
        async function load(id: string): Promise<[string, ProjectLoadedState]> {
            try {
                const response = await fetch(`${API_BASE_URL}/api/projects/${encodeURIComponent(id)}`, { signal: controller.signal });
                if (response.status === 404) return [id, 'missing'];
                if (!response.ok) return [id, 'error'];
                return [id, await response.json()];
            } catch { return [id, 'error']; }
        }
        void Promise.all(pendingKey.split(',').map(load)).then(entries => {
            if (!controller.signal.aborted) resolve(Object.fromEntries(entries));
        });
    });
}