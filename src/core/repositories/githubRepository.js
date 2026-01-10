const API_BASE = 'https://api.github.com/users';
const CACHE_KEY = 'jojo-github-stats';
const CACHE_DURATION = 1000 * 60 * 60; // 1 Hora

export async function fetchGithubStats(username) {
    // 1. Verificar Caché
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
        const { timestamp, data } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
            console.log('[GithubRepo] Serving from cache');
            return data;
        }
    }

    try {
        console.log('[GithubRepo] Fetching live data...');
        
        // 2. Fetch Paralelo (Perfil + Repos)
        const [profileRes, reposRes] = await Promise.all([
            fetch(`${API_BASE}/${username}`),
            fetch(`${API_BASE}/${username}/repos?per_page=100`)
        ]);

        if (!profileRes.ok || !reposRes.ok) throw new Error('GitHub API Error');

        const profile = await profileRes.json();
        const repos = await reposRes.json();

        // 3. Calcular Estrellas Totales (La API de usuario no te da este total, hay que sumarlo)
        const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);

        // 4. Formatear Datos Limpios
        const stats = {
            repos: profile.public_repos,
            followers: profile.followers,
            stars: totalStars,
            avatar: profile.avatar_url,
            url: profile.html_url
        };

        // 5. Guardar en Caché
        localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            data: stats
        }));

        return stats;

    } catch (error) {
        console.error('[GithubRepo]', error);
        // Fallback en caso de error/offline
        return { repos: 'ERR', followers: 'ERR', stars: 'ERR', url: '#' };
    }
}