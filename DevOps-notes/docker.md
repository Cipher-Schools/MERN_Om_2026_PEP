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







