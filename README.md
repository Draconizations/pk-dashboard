# PluralKit Dashboard
This is the repository for the sveltekit rewrite of [PluralKit's offical dashboard](https://dash.pluralkit.me/). There's a live version over at https://pk.anomaly.icu/ that gets updated periodically.

## Contributing
If you have any questions, suggestions or feedback, let me know in [PluralKit's support server](https://discord.gg/PczBt78). Please also discuss any potential contributions in the support server *first*, I'd hate to turn down an out-of-scope PR.

## Development
1. Clone this repository
2. run `pnpm install`
3. Create an .env file with the following values
    - `PUBLIC_API_BASE_URL`: the base url of the PK instance's api (you probably want `https://api.pluralkit.me/`)
    - `PUBLIC_DASHBOARD_BASE_URL`: the base url of this dashboard (`http://localhost:5173` in development)
    - `PUBLIC_REPOSITORY_URL`: the url linking to this project's git repository. Any blank value will default to PluralKit's repository
4. run `pnpm dev`
5. Everything should be ready to go!

## License
MIT, see [the `LICENSE` file](./LICENSE).