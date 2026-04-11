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


