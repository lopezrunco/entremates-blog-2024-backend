# Instructions:

Create a server folder and init TypeScript
```sh
tsc --init
```

Go to the server/tsconfig.json file and and ./build in the Outdir line 
```ts
"outDir": "./build",
```

Install express and mongoose
```sh
npm install express mongoose
npm install --save-dev @types/mongoose @types/express
```

Install Firebase admin
```sh
npm install firebase-admin
```

Install ts-node-dev
```sh
npm i ts-node-dev
```

Run server
```sh
npx ts-node-dev src/server.ts
```