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

## Usage

This worker will handle `GET`, `POST` and `DELETE` requests acting on
an specific GitHub Gist. Any other method will result on `405` status code
for _Method Not Allowed_.

* To get the current status of the gist, you must fetch `GET /`.
* To append a new object to the gist, you must fetch `POST /`, with the payload
to append as the request body.
* To clean up the array of objects, you must fetch `DELETE /`. This will empty
the array of objects.

Keep in mind that every time a gist is updated, a new revision is made, just like a commit.
This results in something like a _commit history_ for your gist.

### Handlers

Method | URI | Req. Body | Res. Body
-- | -- | -- | --
`GET` | `/` | **N/A** | `object[]`
`POST` | `/` | `object` | **N/A**
`DELETE` | `/` | **N/A** | `[]`


## Environment Variables

All of these environment variables are configured either by
editing the `wrangler.toml` file or by configuring your
worker environment variables from the Cloudflare website.

Name | Description | Default Value
-- | -- | --
`GITHUB_AUTHENTICATION` | GitHub Personal Access token with Gist Only Access | **N/A**
`GIST_URL` | URL to the gist | **N/A**
`FILENAME` | Name of the file from the gist | **N/A**
`USER_AGENT` | `User-Agent` HTTP Header Value. Required by GitHub's API | `Cloudflare Worker`

## License

MIT License
