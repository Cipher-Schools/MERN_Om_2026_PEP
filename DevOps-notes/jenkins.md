### Jenkins

Jenkins is an open-source continuous integration (CI) and continuous delivery (CD) tool that enables developers to automatically build, test, and deploy software in a reliable and efficient manner.

#### What Jenkins Really Does
At its core, Jenkins helps developers automate repetitive tasks in the software lifecycle. Instead of manually compiling code, running tests, or deploying apps, Jenkins does it automatically whenever changes are made.

#### How Jenkins Works (Simple Flow)
- Developer writes code
- Code is pushed to a repository (e.g., GitHub)
- Jenkins detects the change
- Jenkins builds the project
- Runs automated tests
- Deploys the application if everything passes


###### Jenkins is like a robot assistant for developers that continuously checks, builds, tests, and delivers software automatically

#
#
#
steps:

-> create ec2 & ssh

then:

sudo apt update

sudo apt install docker.io -y

sudo systemctl start docker

sudo systemctl enable docker

add permission:

sudo usermod -aG docker ubuntu

exit and again ssh

run jenkins:

docker run -d \
-p 8080:8080 \
-p 50000:50000 \
--name jenkins \
jenkins/jenkins:lts

get admin password:

docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword

open jenkins on browser:
http://ec2-public-ip:8080

Install Suggested Plugins



### Jenkinsfile

A Jenkinsfile is a text file (written in Groovy-based syntax) that defines the entire automation process (pipeline) for a project.

🔑 Key Idea

It tells Jenkins what to do and how to do it.

📌 Example

```
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building...'
            }
        }
    }
}

```


##### Why it's important
- Stored in your code repository (like Git)
- Version-controlled
- Makes pipelines reproducible and transparent

👉 Think of it as a recipe for your automation workflow



##### Declarative Pipeline

A Declarative Pipeline is a structured and simplified way to write Jenkins pipelines using predefined syntax.

🔑 Key Idea

It focuses on readability and simplicity, using a clear format.

📌 Characteristics:
- Uses pipeline {} block
- Easier to learn than scripted pipelines
- Enforces a standard structure


### Stages

Stages are logical steps in a pipeline that group related tasks.

🔑 Key Idea

Each stage represents one phase of the workflow.

📌 Common Stages
- Build
- Test
- Deploy

Example
```
stages {
    stage('Build') {
        steps {
            echo 'Building...'
        }
    }
    stage('Test') {
        steps {
            echo 'Testing...'
        }
    }
}

```

##### Why stages matter
- Organize pipeline clearly
- Show progress in Jenkins UI
- Help debug failures easily




### Webhooks

A webhook is a mechanism that automatically notifies Jenkins when an event happens in another system (like GitHub).

🔑 Key Idea

Instead of Jenkins constantly checking for changes, the repository tells Jenkins instantly.


##### How Webhooks Work
- Developer pushes code to GitHub
- GitHub sends a webhook (HTTP request)
- Jenkins receives it
- Pipeline starts automatically


#### 💡 Benefits
- Real-time automation
- Faster builds
- No need for polling (checking repeatedly)



#
#
#
#

## 🚀 Guide: CI/CD Deployment with Jenkins, Docker, and AWS

### Phase 1: AWS EC2 Provisioning (The Infrastructure)
When creating the instance, use these settings to ensure the server doesn't crash under the load of Jenkins and Docker.

1. AMI: Ubuntu 24.04 LTS.

2. Instance Type: t2.micro (Free Tier).

3. Storage: Change the Root Volume from 8GB to 20GB.

   - Explanation: Docker images and Jenkins builds consume significant space. 20GB ensures you don't run out of disk mid-demo.

4. Security Group Rules:

    - Port 22: For SSH access.

    - Port 8080: For the Jenkins Dashboard.

    - Port 3000: For your Express.js backend.


### Phase 2: Server Optimization 

Once connected via SSH, run these commands to prepare the environment.

1. Update system and Install Docker

```
sudo apt update && sudo apt install docker.io -y

sudo usermod -aG docker ubuntu && newgrp docker
```

2. Setup 2GB Swap (Crucial for t2.micro)

```
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

* The Swap file acts as 'Virtual RAM'. A t2.micro only has 1GB of RAM, which isn't enough to run Jenkins and Build Docker images simultaneously. Swap prevents the server from freezing.

3. Pre-pull Node image to save time
```
docker pull node:20-alpine
```


### Phase 3: Deploying Jenkins via Docker

- We are running Jenkins as a container to keep the host system clean and portable.

1. Run Jenkins with Docker Socket access
```
docker run -d -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --name jenkins jenkins/jenkins:lts
```

2. Set Permissions
```
sudo chmod 666 /var/run/docker.sock
```

3. Get the Initial Admin Password
```
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

- The Logic: Mounting /var/run/docker.sock creates a "bridge" that allows the Jenkins container to control the Docker engine on the AWS host.


### Phase 4: Jenkins Dashboard & Plugins

1. Open http://<YOUR_EC2_IP>:8080.

2. Paste the password from Phase 3 and install Suggested Plugins.

3. Install docker on jenkins:
    1. Enter the container as root
    ```
    docker exec -u 0 -it jenkins bash
    ```

    2. Install the small Docker CLI binary (The Fast Way)
    ```
    curl -fsSL https://download.docker.com/linux/static/stable/x86_64/docker-26.1.4.tgz -o docker.tgz
    tar xzvf docker.tgz
    mv docker/docker /usr/local/bin/
    rm -rf docker.tgz docker/
    ```
    3. Verify and Exit
    ```
    docker --version

    exit

    ```

4. Install Docker Plugins: * Go to Manage Jenkins -> Plugins -> Available Plugins.

    - Search and install "Docker" and "Docker Pipeline".

    - Explanation: These plugins teach Jenkins how to understand Docker commands in a script.

## NOTE: 
- Till Phase 4 everything is setup and common, after that I have divided 5th phase into A, B, C to show you how can we do this in 3 ways.
(You should try each step after class).


### Option 5A: The Freestyle Project (The "Manual" Way)

1. Create: New Item -> Freestyle project.

2. Source Code Management: Select Git and enter your Repository URL.

3. Build Steps: Click "Add build step" -> Execute shell.

4. The Commands: Paste this block:

```
# 1. Build the image
docker build --network host -t my-backend .

# 2. Cleanup old container (|| true prevents failure if it doesn't exist)
docker stop express-app || true
docker rm express-app || true

# 3. Run new container
docker run -d --name express-app -p 3000:3000 my-backend

```



### Option 5B: Pipeline with "Direct Script" (The "Middle" Way)

1. Create: New Item -> Pipeline.

2. Pipeline Section: Ensure "Definition" is set to Pipeline script.

3. The Script: Paste this code directly into the box: * but change the repo url with origional one.

```
pipeline {
    agent any
    stages {
        stage('Clone') {
            steps {
                git branch:'main', url:'https://github.com/YourUsername/YourRepo.git'  
            }
        }
        stage('Build & Deploy') {
            steps {
                sh '''
                docker build --network host -t my-backend .
                docker stop express-app || true
                docker rm express-app || true
                docker run -d --name express-app -p 3000:3000 my-backend
                '''
            }
        }
    }
}
```


### Option 5C: Pipeline with Jenkinsfile (The "Pro" Way)

1. The Preparation: Create a file named Jenkinsfile (no extension) inside your GitHub repo root.

2. The Content: Paste this refined version:

```
pipeline {
    agent any
    stages {
        stage('Build Image') {
            steps {
                sh 'docker build --network host -t my-backend .'
            }
        }
        stage('Cleanup Old Container') {
            steps {
                sh 'docker stop express-app || true'
                sh 'docker rm express-app || true'
            }
        }
        stage('Deploy New Version') {
            steps {
                sh 'docker run -d --name express-app -p 3000:3000 my-backend'
            }
        }
    }
}
```

3. Jenkins Config:

- New Item -> Pipeline.

- Definition: Select Pipeline script from SCM.

- SCM: Git (Enter your URL and Branch).

- Script Path: Ensure it says Jenkinsfile.


This is Configuration as Code. If our Jenkins server is deleted, our deployment logic is safe because it lives in GitHub with our code. This is how the best engineering teams in the world operate.


### Phase 6: Execution & Verification (The "Moment of Truth")

- Once you have configured one of the Method 5 options, you must run it and verify the deployment.

1. Trigger the Build: Click Build Now on the left-hand menu.

2. Monitor the Console: * Click the build number (e.g., #1). and Select Console Output.

3. Verify the Container: Go back to your EC2 terminal and run:
```
docker ps
```

4. Check the Browser: Visit http://<YOUR_EC2_IP>:3000.


### Phase 7: Automation (Triggers & Webhooks)


Step 1: In Jenkins UI

1. Go to Configure -> Build Triggers.

2. Check GitHub hook trigger for GITScm polling.

3. Save.

Step 2: In GitHub Settings

1. Go to your Repository -> Settings -> Webhooks -> Add webhook.

2. Payload URL: http://<YOUR_EC2_IP>:8080/github-webhook/

* Note: The trailing slash '/ ' after github-webhook is mandatory!

3. Content type: application/json.

3. Which events? Just the push event.

4. Click Add webhook.


#
#
