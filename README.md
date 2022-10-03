# digital-ocean-on-demand-droplet
programatically spinup or destroy a digital ocean droplet.

# How it works
This project uses the [Digital Ocean API](https://docs.digitalocean.com/reference/api/api-reference/) to create and delete droplets.
You can also use it to backup and restore the server state, check this [Discordjs Example](examples/with-discordjs)

# Getting started
To get started, first copy the .local.env file to .env and provide your digital ocean API token.
```
DO_TOKEN=YourDigitalOceanAPIToken
```
Set up the name and info of your droplet in the config.ts file. Default config:
```
const config = {
  droplet_name: "my-droplet",
  snapshot_name: "my-snapshot",
  ssh_keys: [],
}
```
`droplet_name` is the name given to the droplet when it is created or deleted. `snapshot_name` is the name of the snapsho that will be used to create the droplet. and `ssh_keys` is the list of ssh_keys that can access the droplet. Note that this refers to the dogital ocean fingerprint of the ssh keys, not the keys themselves, the fingerprints should look smoething like this: `3b:16:bf:e4:8b:00:8b:b8:59:8c:a9:d3:f0:19:45:fa`

Keep in mind that there is no entry file to this project, it only provides functions you can use and build upon freely (see examples), once you have your use-case and program ready, you can build and run it using npm:
```
npm install
npm run build
npm run dev
```

or yarn:
```
yarn
yarn build
yarn dev
```
