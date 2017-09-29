# Keys Points

The 3 keys point of this architecture are: the _Renderer_, the _Router_ and the _Application Main_.

## The Renderer
The renderer is a middleware running on the node server that will first setup the base state in the current request session, then wait for the controller response and finally render the response itself.
It will both render a JSON or an HTML content depending on the origin of the request: if the request has been sent trough the loaded app or if it is the first request requiring a SSR (Server Side Rendering).

Check the annotated source [here](/annotated/src/server/middlewares/renderer/render.js.html).

## The Router
Like any other routers, its job is to intercept clicks navigation through the app and notify a route change to the Application Main.
It also provides a minimum context when running on the server in order to have its Link component be aware of the current location (and set the active class name if needed).

Check the annotated source [here](/annotated/src/client/router/Router.jsx.html).

## The Application Main
This component is the entry point of the application and it receives a notification when the user click on a Link. It is responsible for fetching the new context from the backend, loading the view component via Webpack (lazy loading) and managing the scroll position (to the top if it is a push, else restoring the previous position).

Check the annotated source [here](/annotated/src/client/AppMain.jsx.html).