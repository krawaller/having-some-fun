# David's GamePoints app

Hi Morten (et al)! Here's my take on the technical assessment homework thingie. Doing a fair bit of interviewing and techincal vetting myself, I've tried to approach this with the goal of giving you as clear a representation of David-the-developer as possible in a way that I would appreciate if the roles were reversed. This isn't a finished app (and it looks horrid, sorry about that), but I've aspired to dig into most web dev aspects to provide a good foundation for a nerdy conversation. :)

The app is deployed live at [https://davids-gamepoints.netlify.app/](https://davids-gamepoints.netlify.app/). To run it locally:

```bash
npm install
npm run dev # will build app on file changes and starts a simple live reload server
```

## Project setup

I opted not to use a starting scaffolding tool, mainly because I've been itching to try out `esbuild`. Also I find it is frustrating when black boxes like CRA don't work as expected, and so I appreciate lean, no-magic setups. (That said, I do want to explore [Vite](https://vitejs.dev/) and [Snowpack](https://www.snowpack.dev/) someday)

Our little project has a rather traditional `eslint` setup, which incorporates `prettier` so that doesn't have to be run separately. YMMV on whether or not this is a good idea, but I've grown to enjoy it.

Since `esbuild` is wicked (WICKED!) fast, it was fun to try to continue that approach with the testing. I'm therefore using `uvu` as a runner since it had easy `esbuild` integration. Also - perhaps childishly - I like how it doesn't use the magic "describe/test" variables of Jest et al.

The theme of speed is carried on into the integration testing, where I'm using [Linkedom](https://github.com/WebReflection/linkedom) instead of [jsdom](https://github.com/jsdom/jsdom). And the tests indeed were impressively fast, although now at the tail end of the project I've managed to slow them down a bit through poorly written [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) code. I need to explore more into how to write async tests more efficiently. (also there are lots of shenanigans with Linkedom, it would likely be easier with jsdom...)

## Code organisation

I enjoy thinking about and tinkering with code organisation way more than I'm comfortable to admit. Here I've opted to split my app into "layers". Each folder in `./src` is a layer, which I imagine are separately designed and maintained. And therefore also separately tested - each layer is an API surface. The layers are:

- `data` - houses the central type definitions and some pure function helpers
- `state` - creates a stateful instance that can then power an app (using [Klyva](https://github.com/merisbahti/klyva), a tiny state management library I'm having lots of fun with atm)
- `ui` - the React component pyramid
- `app` - here we put all pieces together! (so this is the entry point for the build)

There is some additional descriptions in the `index.ts` file of each layer (as well as other comments sprinkled throughout).

## Styling

I've spent an embarrassing amount of time experimenting with CSS solutions, both on the pure CSS side (BEM, tachyons, ...) and the last few years on the CSSinJS side. Speaking generally I think I prefer a JS-based solution, with extra bonus points given if the chosen solution doesn't need to further pollute the build pipeline.

In this project I'm using the by-now boring and traditional `styled-components`. There are sexier shinier things, but lately I've had a hard time convincing myself that they do the job better!

Was I to spend more time on this project I would set up a bunch of central CSS variables for various sizes of margins/paddings/dimensions etc. Here I've allowed myself to stay quick and dirty on that regard, to the detriment of the appearance. Which wasn't going to be nice anyway, since design is NOT one of my strengths...

## Cheating

I've allowed myself to skimp in some areas;

- Accessibility: Beyond everything clickable being a button and many things having a `title` (thanks to React Testing Library strong-arming me), I haven't made any effort in this direction. Nor, I should admit, do I have much experience in this area. But I am a aware of this white patch on my knowledge map, so the aria stuff is on the exploration wishlist!
- Responsivity: If the width is too small the app will flip to a vertical layout where the "side" (now the bottom) can be toggled away. But it still doesn't work well on smartphones with top/bottom overlays, that's something I would have to keep working on if this was a real thing.
- Cross Browser Compatibility: Should be decent, except I gave up on IE to be able to use the `all` property. Well worth it..
