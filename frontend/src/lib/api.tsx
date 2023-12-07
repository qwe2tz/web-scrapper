const baseUrl = "http://localhost"
const port = 8080;
const baseRoute = 'api'

export async function get(route: string) {
  const response = await fetch(`${baseUrl}:${port}/${baseRoute}/${route}`, {
    method: 'GET',
    cache: 'no-cache',
    credentials: 'same-origin',
  });

  return response.json();
}