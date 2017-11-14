# Keys Points

The 3 keys point of this architecture are: the _Renderer_, the _Router_ and the _App_.

## The Renderer
The renderer is a middleware running on the node server that will first setup the base state in the current request session, then wait for the controller response and finally render the response itself.
It will both render a JSON or an HTML content depending on the origin of the request: if the request has been sent through the loaded app or if it is the first request requiring a SSR (Server Side Rendering).

View the annotated source [here](/annotated/src/server/middlewares/renderer/renderer.render.js.html).

## The Router
Its job is to intercept client-side navigation through the app and notify a route change to the App Component.
It also provides a minimum context when running on the server in order to have its Link component be aware of the current location (and set the active class name if needed).

View the annotated source [here](/annotated/src/client/components/router/Router.jsx.html).

## The App Component
This component is the entry point of the application and it receives a notification when the user click on a Link. It is responsible for fetching the new context from the backend, loading the container via Webpack (lazy loading) and managing the scroll position (to the top if it is a push, else restoring the previous position).

View the annotated source [here](/annotated/src/client/App.jsx.html).
