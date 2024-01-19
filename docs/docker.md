# General steps to run this project in Kali Linux

## Instructions:

- Install Docker Engine:
```sh
    sudo apt-get update
    sudo apt-get install docker.io
```

- Start the Docker service:
```sh
    sudo systemctl start docker
```

- Verify the installation:
```sh
    docker --version
    docker run hello-world
```

- Create a Dockerfile in the root of the project:
```sh
    # Use an official Node.js runtime as a base image
    FROM node:14-alpine

    # Set the working directory in the container
    WORKDIR /usr/src/server

    # Copy package.json and package-lock.json to the working directory
    COPY package*.json ./

    # Install dependencies
    RUN npm install

    # Copy the rest of the application code
    COPY . .

    # Build the TypeScript code
    RUN npm run build

    # Expose the port your app runs on
    EXPOSE 1337

    # Command to run your application
    CMD ["npm", "run", "dev"]
```

Once you have your Dockerfile, you can build the Docker image and run the container using the following commands:

- Build the Docker image (run this command in the same directory of the Dockerfile)
```sh
    docker build -t emyoy-server .
```

- Run the Docker container
```sh
    docker run -p 1337:1337 emyoy-server
```

### Permission denied error:

By default, Docker requires elevated privileges, and users need to be part of the "docker" group to run Docker commands without using "sudo" each time.

To solve this issue on Kali Linux:

- Add your user to the "docker" group:
```sh
    sudo usermod -aG docker $USER
```

- Log out and log back in or restart your system to apply the group changes.

- After logging back in, run the "docker run hello-world" command again:
```sh
    docker run hello-world
```