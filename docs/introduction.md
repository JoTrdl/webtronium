# Introduction

> "Simplicity is the ultimate sophistication"
>
> -- Leonardo da Vinci

## Webapp vs Website

Before we begin, it's helpful to elaborate the differences between a "webapp" and "website":
  - __Website__: A website in the traditional sense has typically been a static HTML file sent to the client from a server. Search engines parsed and analyzed the structured HTML document to index its contents.
  - __Webapp__: A webapp is a relatively new concept which gained popularity as client-side Javascript frameworks were created to meet the needs of more complex websites (or apps) on the web. With a client-side webapp, the browser sends a request to the server which responds with an HTML document containing an empty body and script tags for the application's Javascript. All of the DOM the user sees is then generated and injected by Javascript at runtime.

One of the major caveats of pure client-side webapps is that their content is invisible to search engines who do not execute javascript and analyze the content after the page loads. Webapps which don't rely on search visibility are exempt from this caveat.

For the majority of the web, and in particular e-commerce, optimizing search ranking is very important. Modern Javascript frameworks have many benefits, however in order to be truly useful in the real world search engines need to receive content they can index.

## State of the art

As I am writing this section in 2017, what we call "isomorphic javascript" is trending. If you look at any of the major frameworks (React, Angular.io, Vue.js, ...), you'll notice they've moved from an old MVC pattern to a unidirectional store based architecture, with components connected to it and reacting on updates.

With the previous software architecture, there was a balance of 80% server and 20% client responsibility. The server used to manage the application routes through controllers and render the HTML output using a template engine. The client was mainly just responsible for handling UI interactions.

With the new generation of Virtual DOM libraries, templates were written on the server and components representing the same structure were written for the client. To avoid this unneeded duplication, the "isomorphic/universal" concept surfaced. In an "isomorphic" app, the same Javascript for components is executed on both the client and server.

Many common implementations put all of their routing logic in the client's router and the app is then rendered on server using this router. This raises 2 major concerns: First, there is larger overhead on the client, resulting a slower first page load time and reduced performance which is especially apparent on weaker devices such as smartphones. And second, the client is no longer just a "dumb" view layer, it has taken on responsibility which the server used to own.

Here's an example to illustrate the above two concerns: Imagine your company has decided to support multiple languages and a requirement is to match url-patterns in multiple languages, such as /product/xx, /produit/xx, /produkt/xx. For each language you add, the patterns begin to multiply for each route. Your client is running heavier route matching on each request and the bundle size keeps growing. It's relatively trivial for the much more capable server to import all of these route patterns when it starts up and reference them from memory, adding very little overhead. If you can manage to pass all of this responsibility back to the server and still have an "isomorphic" app, you've found the holy grail.

## Introducing the Pure Server Router pattern

In a nutshell, our goal is to properly manage the responsibility between the client and server:
  - __Server__: Should be responsible for route matching and providing the client the correct component name and data per route.
  - __Client__: Should switch component views and render data provided by the server and handle any additional UI interactions. When any navigation occurs, the client should call the backend and await its instructions for the next view.

There is an extremely thin router on the client which matches (```/*```) and fires off a fetch to the server with the requested url. The server will map the requested url to a route pattern and call the appropriate controller. The client will await the result and update the view according to the json response returned.

This website has been built on this pattern, using React/Koa. It is recommended to open the dev tools and inspect how it is working. The annotated source is also available [here](/annotated/src/client/index.js.html).

## Disclaimer

This is not intended to be a framework or a boilerplate but more of a skeleton that you have to adapt according to your needs. You may add and remove parts as you require.

## Important notes

1. This pattern is by itself "isomorphic": I personally implemented it with Vue.js/Express.js, Marko.js/Koa.js, Inferno.js/Koa.js and this one with React/Koa.js.
2. SSR performance depends on the library. From my own experience, as well as observed in benchmark metrics, these popular frameworks rank from slowest to fastest SSR operations per second: React, Vue.js, Inferno.js, Marko.js
