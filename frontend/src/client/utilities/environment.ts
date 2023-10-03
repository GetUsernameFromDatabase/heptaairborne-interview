export function returnBackendBasePath() {
  const host = import.meta.env.VITE_API_HOST ?? 'localhost';
  const port = import.meta.env.VITE_API_PORT ?? '8080';
  return `http://${host}:${port}`;
}
