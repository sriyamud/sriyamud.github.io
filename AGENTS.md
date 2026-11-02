<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Static export for GitHub Pages: `/` is prerendered (vite.config.ts) and `dist/client` is the deployable output; asset URLs use `import.meta.env.BASE_URL` and the router basepath so any `BASE_PATH` works — the site must have no server code.
- Import processed portrait assets through Vite so generated URLs follow the deployment base path; retain the original photo unchanged.
