<div>
  <div align="center" style="display: block; text-align: center;">
    <img src="https://raw.githubusercontent.com/EstebanBorai/gist-updater-worker/main/assets/logo.jpg" height="120" width="120" />
  </div>
  <h1 align="center">gist-updater-worker</h1>
  <h4 align="center">👷🏻‍♂️ Cloudflare Worker to update GitHub Gists with ease</h4>
  <br />
</div>

<div align="center">

  [![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/EstebanBorai/gist-updater-worker)

</div>

## Motivation

Create a Worker to update, reset and read JSON data from a
GitHub Gist.


## Environment Variables

All of these environment variables are configured either by
editing the `wrangler.toml` file or by configuring your
worker environment variables from the Cloudflare website.

Name | Description | Default Value 
- | - | -
`GITHUB_AUTHENTICATION` | GitHub Personal Access token with Gist Only Access | **N/A**
`GIST_URL` | URL to the gist | **N/A**
`FILENAME` | Name of the file from the gist | **N/A**
`USER_AGENT` | `User-Agent` HTTP Header Value. Required by GitHub's API | `Cloudflare Worker`

## License

MIT License
