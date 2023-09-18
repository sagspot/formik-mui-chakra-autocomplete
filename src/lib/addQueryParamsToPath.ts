interface QueryParams {
  [key: string]: string;
}

export function addQueryParamsToPath(
  originalPath: string,
  queryParams: QueryParams
): string {
  // Check if the original path already contains query parameters
  const separator = originalPath.includes('?') ? '&' : '?';

  // Convert the queryParams object to an array of key-value pairs and join them
  const queryParamsString = Object.entries(queryParams)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  // Concatenate the original path with the new parameters
  const modifiedPath = `${originalPath}${separator}${queryParamsString}`;

  return modifiedPath;
}
