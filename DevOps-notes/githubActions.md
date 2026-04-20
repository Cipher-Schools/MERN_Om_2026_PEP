# Complete Deployment + CI/CD Guide

## PART 1. Deploy Backend on EC2 (WITHOUT DOCKER)

### Step 1. Create EC2 Instance
- Go to AWS → EC2 → Launch Instance
- OS: Ubuntu
- Instance: t2.micro / t3.micro (whichever is free for you)
- Create key pair → download .pem
- Go to Security Group → Inbound Rules: add port 3000 or the port you are running your backend on

### Step 2. Connect to EC2

```
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@YOUR_PUBLIC_IP # or copy it from aws 
```

### Step 3. Install Node (IMPORTANT: avoid NVM)
```
sudo apt update
sudo apt install nodejs npm -y
```

Verify
```
node -v
npm -v
```

### Step 4. Clone Project
```
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_PROJECT_FOLDER
```

### Step 5. Install Dependencies
```
npm install
```

### Step 6. Install PM2
sudo npm install -g pm2


### Step 7. Start App
```
pm2 start index.js --name backend
```

### Step 8. Access App
http://YOUR_PUBLIC_IP:3000


## PART 2. CI/CD with GitHub Actions

### Step 1. Add GitHub Secrets

Go to:

GitHub → Settings → Secrets → Actions


Add these:

EC2_HOST
- Your public IP

EC2_USER
- ubuntu


EC2_SSH_KEY

👉 Paste your .pem file content:

-----BEGIN RSA PRIVATE KEY-----
XXXX
XXXX
-----END RSA PRIVATE KEY-----


Step 2 — Create Workflow File
- .github/workflows/deploy.yml

Final Working deploy.yml

```
name: Deploy Backend (PM2)

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Deploy to EC2
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USER }}
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            if [ ! -d ~/backend-aws-testing ]; then
              git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git ~/backend-aws-testing
            fi

            cd ~/backend-aws-testing

            git pull origin main
            npm install
            pm2 restart backend || pm2 start index.js --name backend

```



## PART 3. Deploy Backend using Docker (Recommended Way)

#### What we will do
- Run backend inside Docker container
- No need to install Node on server
- Cleaner + more professional deployment


### Step1Step 1. Create NEW EC2 Instance

👉 Same as before:

- Ubuntu
- t2.micro / t3.micro
- Download .pem
- Open ports:
- 22 (SSH) - It is already open by default
- 3000 (app) ✅

###  🔐 Step 2. Connect to EC2
```
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@YOUR_PUBLIC_IP
```

### 🐳 Step 3. Install Docker

```
sudo apt update
sudo apt install docker.io -y
```

Give Docker Permission:
```
sudo usermod -aG docker ubuntu
```
Logout and reconnect:
```
exit
ssh -i your-key.pem ubuntu@YOUR_PUBLIC_IP
```

Verify Docker:
```
docker --version
```


### Step 4. Add Dockerfile in your project (LOCAL MACHINE)

```
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "index.js"]

```

### Step 5. Add GitHub Secrets (same as before)
- EC2_HOST
- EC2_USER
- EC2_SSH_KEY

### Step 6. Create Workflow File

.github/workflows/docker-deploy.yml

```
name: Docker Deployment

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Deploy to EC2
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USER }}
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            if [ ! -d ~/backend-docker ]; then
              git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git ~/backend-docker
            fi

            cd ~/backend-docker

            git pull origin main

            docker build -t backend-app .

            docker stop backend-container || true
            docker rm backend-container || true

            docker run -d -p 3000:3000 --name backend-container backend-app
            
```

Step 7. Verify

```
docker ps
```

http://your-public-ip:3000/
