## Containerization


### What are containers

- Containers are a way to package and distribute software applications in a way that makes them easy to deploy and run consistently across different environments. They allow you to package an application, along with all its dependencies and libraries, into a single unit that can be run on any machine with a container runtime, such as Docker.


- Containerization is a way to package your application along with everything it needs, like dependencies, runtime, and configuration, all into a single unit called a container.

- Instead of sending only your code,
you send your entire environment along with it.

### Why Containers
Everyone has different Operating systems

Steps to run a project can vary based on OS

Extremely harder to keep track of dependencies as project grows


### Containerization vs Virtual Machine

#### A virtual machine is like creating a full computer inside your computer.

👉 It includes:

Full OS (like Ubuntu or Windows)

Its own kernel

Its own memory allocation

- heavy
- slow
- full OS


#### Containers are different.

They don’t create a full OS.

They share the host OS kernel.

- lightweight
- fast
- shares OS



### Docker Architecture
#### Docker is a tool that helps us create, manage, and run containers.

##### Docker Components:
#### Docker Daemon (Engine)
Docker Engine is an open-source containerization technology that allows developers to package applications into container

#### Docker CLI
The command line interface lets you talk to the docker engine and lets you start/stop/list containers

#### Docker Image
A Docker image is a lightweight, standalone, executable package that includes everything needed to run a piece of software, including the code, a runtime, libraries, environment variables, and config files.

#### Docker Container
A container is a running instance of an image. It encapsulates the application or service and its dependencies, running in an isolated environment.

#### Docker Registry
Registry is storage for images.
(
similar to GitHub but for images.)

Example: Docker Hub


#### Common docker commands

docker images

docker ps

docker run

docker kill

docker build



#### Port mapping
```
docker run -d -p 27018:27017 mongo
```

### Dockerfile
#### What is a Dockerfile
If you want to create an image from your own code, that you can push to dockerhub, you need to create a Dockerfile for your application.

A Dockerfile is a text document that contains all the commands a user could call on the command line to create an image.


#### A dockerfile has 2 parts
- Base image
- Bunch of commands that you run on the base image (to install dependencies like Node.js)


```
# Use Node 20 lightweight image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of project
COPY . .

# Expose port (adjust if your app uses different port)
EXPOSE 3000

# Start app
CMD ["node", "index.js"]

```



### Layers in Docker

In Docker, layers are a fundamental part of the image architecture that allows Docker to be efficient, fast, and portable. A Docker image is essentially built up from a series of layers, each representing a set of differences from the previous layer.


Layer = each step in Dockerfile creates a layer

Image = combination of all layers

Docker reuses unchanged layers (caching)


#### How layers are made - 

- Base Layer: The starting point of an image, typically an operating system (OS) like Ubuntu, Alpine, or any other base image specified in a Dockerfile.

- Instruction Layers: Each command in a Dockerfile creates a new layer in the image. These include instructions like RUN, COPY, which modify the filesystem by installing packages, copying files from the host to the container, or making other changes. Each of these modifications creates a new layer on top of the base layer.

- Reusable & Shareable: Layers are cached and reusable across different images, which makes building and sharing images more efficient. If multiple images are built from the same base image or share common instructions, they can reuse the same layers, reducing storage space and speeding up image downloads and builds.

- Immutable: Once a layer is created, it cannot be changed. If a change is made, Docker creates a new layer that captures the difference. This immutability is key to Docker's reliability and performance, as unchanged layers can be shared across images and containers.


#### Why Layers
- If you change your Dockerfile, layers can get re-used based on where the change was made


### Volumes

If you restart a mongo docker container, you will notice that your data goes away. 

This is because docker containers are transitory (they don’t retain data across restarts)


#### Without volumes

- Start a mongo container locally
```
docker run -p 27017:27017 -d mongo
```
- Open it in MongoDB Compass and add some data to it

- Kill the container
``` 
docker kill <container-id>
````
Restart the container
```
docker run -p 27017:27017 -d mongo
```

- Try to explore the database in Compass and check if the data has persisted (it wouldn’t)


#### With volumes
- Create a volume
```
docker volume create volume_db
```
- Mount the folder in mongo which actually stores the data to this volume
```
docker run -v volume_database:/data/db -p 27017:27017 mongo
```

- Open it in MongoDB Compass and add some data to it

- Kill the container

``` 
docker kill <container_id> 
```

- Restart the container
```
docker run -v volume_database:/data/db -p 27017:27017 mongo
```
- Try to explore the database in Compass and check if the data has persisted (it will!)



### Network

- In Docker, a network is a powerful feature that allows containers to communicate with each other and with the outside world.

- Docker containers can’t talk to each other by default.

- localhost on a docker container means it's own network and not the network of the host machine


#### How to make containers talk to each other?

* Attach them to the same network

- Build the image
```
docker build -t image_tag .
```
- Create a network
```
docker network create my_network
```

- Start the backend process with the network attached to it
```
docker run -d -p 3000:3000 --name <whatevername> --network my_network image_tag
```

- Start mongo on the same network
```
docker run -d -v volume_database:/data/db --name <mongoName> --network my_custom_network -p 27017:27017 mongo
```

- Check the logs to ensure the db connection is successful
```
docker logs <container_id>
```

- Better way, pass env

```
docker run -d --name myApp --network my-network -p 3000:3000 -e MONGO_URI=mongodb://<mongoName>:27017/myapp express-app
```

- Try to visit an endpoint and ensure you are able to talk to the database
- If you want, you can remove the port mapping for mongo since you don’t necessarily need it exposed on your machine



### Docker-compose

Docker Compose is a tool to define and run multiple containers using a single YAML file. With Compose, you use a YAML file to configure your application's services, networks, and volumes. Then, with a single command, you can create and start all the services from your configuration.

filename - docker-compose.yaml

```
version: '3'

services:
  app:
    image: express-app
    ports:
      - "3000:3000"
    depends_on:
      - mongo
    environment:
      - MONGO_URI=mongodb://mongo:27017/mydb
    networks:
      - my-network

  mongo:
    image: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    networks:
      - my-network

volumes:
  mongo-data:

networks:
  my-network:


```

--------------------------------
---------------------

```

version: '3'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - mongo
    networks:
      - my-network

  mongo:
    image: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    networks:
      - my-network

volumes:
  mongo-data:

networks:
  my-network:

  ```

#### Before docker-compose
Manually  
- Create a network
- Create a volume
- Start mongo container
- Start backend container


#### After docker-compose
Create a yaml file describing all your containers and volumes (by default all containers in a docker-compose run on the same network)

Start the compose
```
docker-compose up
```
Stop everything (including volumes)
```
 docker-compose down --volumes
```

 