export default function ({ store, route, redirect }) {
  // Log the current route and authentication status
  console.log('Current Route:', route.path);
  console.log('Authenticated:', store.getters['auth/isAuthenticated']);

  // List of routes that should be protected
  const protectedRoutes = ['/buy', '/watchlist','/alerts'];

  // Check if the current route is one of the protected routes
  if (protectedRoutes.includes(route.path) && !store.getters['auth/isAuthenticated']) {
    console.log('Redirecting to login page...');
    // Redirect to the login page if not authenticated
    return redirect('/login');
  }

  console.log('Access granted to route:', route.path);
}