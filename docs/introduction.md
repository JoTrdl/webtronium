# Introduction

> "Simplicity is the ultimate sophistication"
>
> -- Leonardo da Vinci

## Webapp vs Website

Before everything, it is important to explain the concept of webapp and website:
  - __website__: a website is historically the web. At the beginning, it was only a - static - HTML page served by a server. Search engines used the structured document to analyse and index the content.
  - __webapp__: a webapp is "relatively" new, if we simplify the concept: the browser hits a server, get an empty HTML page with just some scripts to load and once the page is ready, fetches the data to an API and finally displays something (this can be more optimized: prefetch the data on the initial load...) but in this case, we loose the structured document for SEO.

It is obviously a little bit easier to just build a webapp and to trash out all the SEO aspect (which is by the way getting harder and harder to have a good one). This can be acceptable if you build a pure webapp like a live editor for example.

In the e-commerce world, everything is important: technicals performances, final user speed perception, SEO and so on are the keys to a successful e-com based website.

## State of the art

As I am writing this section in 2017, what we call "isomorphic javascript" is the trending, whatever the library is (React, Angular.io, Vue.js, ...), we moved from an old MVC pattern to a store based architecture, with components connected to it and reacting on updates.

With the previous software architecture, it was a balance of 80% server and 20% client responsability: the server used to manage the routes with their controllers and render HTML output using a template engine, the client was mainly javascript to handle some UI / UX interactions.

With the new generation of Virtual DOM libraries, the job was twice: templates were written on the server and components representing the same structure were written for the client. Not very efficient, so the "isomorphism" concept of reusing the components to generate the server output came out.

To do that, a lot of patterns propose to use the client Router as the main logic and the full app is rendered on server using this router. This implies 2 cons: first, a bunch of code on the client is sent that can be handled on the server, resulting a bad first page load time and the server should be always the authority, the client just a "dumb" front UI. 
With these patterns, the balance is now a 20% server versus 80% client.

## Introducing the Pure Server Router pattern

This concept/pattern has for goal to balance the responsbility between the server and client:
  - __server__: should be always responsible for the routing/controllers and all the SEO aspect
  - __client__: should renders the data from the server and handles the UI interactions. When a navigation occurs, should call the backend to display the next result.

More technically, this is like having a single route on the client (```/*```) and on every route changes, call the backend with the url to get the data and the page to display.

This website is built on this pattern, using React/Koa. It is recommended to open the dev tools and inspect how it is working. The annotated sources are also available [here](/annotated/src/client/index.js.html).

## Disclaimer

This is not intended to be a framework or a boilerplate but more a skeleton that you have to adapt regarding your needs: add features you need and remove parts that are not necessary for you.


## Important notes

1. This pattern is by itself "isomorphic": I personally implemented it with Vue.js/Express.js, Marko.js/Koa.js, Inferno.js/Koa.js and this one with React/Koa.js.
2. SSR performances depends only on the library, from my experience (and proven): React < Vue.js < Inferno.js < Marko.js
