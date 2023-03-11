### Installation
1. The node app must run as `super user` (root)

### Production mode run
```bash
yarn build
yarn start
# With pm2
pm2 start "yarn start" --name nhosting.epiclabs23.com
```

### Dev mode run
```bash
yarn dev
# With pm2
pm2 start "yarn dev" --name nhosting.epiclabs23.com
```

Open [http://localhost:3012](http://localhost:3012) with your browser to see the result.
