# The Gist

The goal is pretty simple: when we want to add a new route/page: we declare a new route and its handler on the server. This controller set up the state to render.

```js
import MyReactComponent from '../some/path/MyReactComponent'

// Koa
app.use('/my-new-route', async(ctx, next) => {
  // 1. set the status to 200 (optional, auto set if a route matched)
  ctx.status = 200

  // 2. (optional) call an external service for data
  const data = await myService.getData()

  // 3. Setup the state to render: container + props
  ctx.state.container = {
    component: MyReactComponent,
    props: {
      data,
      otherProp: 'Hello'
    }
  }

  // 4. SEO stuff
  ctx.state.metadata = {
    title: 'My first route',
    links: [
      {rel: 'canonicalUrl', content: 'http://something.com'}
    ],
    metas: [
      {name: 'description', content: 'First page with Server routing'},
      {name: 'keywords', content: 'first, page'}
    ]
  }

  // 5. Caching settings
  ctx.cache.control = 'public'
  ctx.cache.maxAge = 60 * 60 // 1 hour, default get the value from config
})
```

No need to catch for error (unless for specific use). The renderer will automatically try/catch controllers and take care of 404s too.

In the end, each of the props passed through the server state will become the initial props rendered in the component.

```jsx
export class MyReactComponent extends React.Component {
  render() {
    return (
      <div>
        <p>Some data: {this.props.data}</p>
        <p>Other props: {this.props.otherProp}</p>
      </div>
    )
  }
}
```
