1. RUN SONARQUBE

docker run -d --name sonar -p 9000:9000 sonarqube:lts

2. GENERATE TOKEN

3. INSTALL SCANNER

npm install -g sonarqube-scanner

4. CREATE CONFIG FILE
- sonar-project.properties
```
sonar.projectKey=demo-project
sonar.sources=.
sonar.host.url=http://localhost:9000
sonar.login=YOUR_TOKEN
```

5. RUN FIRST SCAN

sonar-scanner

6. CREATE STRICT QUALITY GATE

7. ASSIGN GATE TO PROJECT

8. TEST FAILURE (IMPORTANT DEMO)

sonar-scanner -Dsonar.qualitygate.wait=true

9. FIX CODE and Run again

10. CREATE DOCKERFILE

```
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
```

11. BUILD ARTIFACT (DOCKER IMAGE)

docker build -t demo-app:v1 .



12. Run nexus
```
docker run -d \
  -p 8081:8081 \
  -p 8082:8082 \
  --name nexus \
  sonatype/nexus3
```

Get password:

docker exec nexus cat /nexus-data/admin.password


13. CREATE DOCKER REPOSITORY
- name: docker-repo
- port: 8082


14. TAG IMAGE
```
docker tag demo-app:v1 localhost:8082/docker-repo/demo-app:v1
```

15. PUSH TO NEXUS
```
docker push localhost:8082/docker-repo/demo-app:v1
```
16. VERIFY

Go to Nexus and check 


17. FINAL CHECK (IMPORTANT)

Remove local image:

docker rmi demo-app:v1

Pull from Nexus:

docker pull localhost:8082/demo-app:v1

Run:

docker run -p 5000:5000 localhost:8082/demo-app:v1



## AUTOMATATION ( Step by step )

#### 1. Create EC2 and add ports 22, 3000, 8081, 8082, 9000

#### 2. ssh and follow:

```
# 1. Create 4GB of extra memory
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# 2. Fix the limit for SonarQube (Important!)
sudo sysctl -w vm.max_map_count=262144

# 3. Install Docker
sudo apt update && sudo apt install docker.io -y
sudo usermod -aG docker ubuntu
# !!! NOW LOGOUT AND LOG BACK IN TO APPLY DOCKER PERMISSIONS !!!

```

#### 3. Run images of Nexus & Sonar in docker containers

```
# 1. Start Nexus (Warehouse)
docker run -d -p 8081:8081 -p 8082:8082 --name nexus sonatype/nexus3

# 2. Start SonarQube (Inspector)
docker run -d -p 9000:9000 --name sonarqube sonarqube:lts-community
```

#### 4. Setup the Warehouse (Nexus) manually:
- Go to http://<EC2-IP>:8081.

- Click Sign In. The password is found inside the container. Run this to see it:
```
docker exec nexus cat /nexus-data/admin.password
```
- Go to Repositories -> Create repository -> docker (hosted).

- Name: docker-repo.

- HTTP Connector: Check the box and type 8082.

- Real-world check: Check "Allow anonymous pull" so it's easier.


#### 5. Creating the Sonar Token (The ID Card)

Steps to do this:

- Open SonarQube: http://<EC2-IP>:9000.

- Login (Default is admin / admin).

- Go to My Account (top right) -> Security.

- In Generate Token, give it a name like github-pipeline and click Generate.

- Copy this token immediately! You will never see it again.


#### 6. Connecting the "Master Key" (GitHub Secrets)

GitHub needs a key to enter your EC2. We will use your .pem file as the secret key.

- Open your .pem file on your PC in Notepad. Copy everything.

- In GitHub Repo -> Settings -> Secrets and variables -> Actions.

- Add these Repository Secrets:

1. EC2_HOST	-> Your Public IP

2. EC2_SSH_KEY	-> Your .pem content

3. NEXUS_PASSWORD ->	Your admin password

4. SONAR_TOKEN	-> The token you just made

5. SONAR_HOST_URL	-> http://<EC2-IP>:9000



### &. pipeline (.github/workflows/deploy.yml)

```
name: MERN Production Pipeline

on:
  push:
    branches: [ "main" ]  # Pipeline runs only when code is pushed to main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      # --- STEP 1: GET THE CODE ---
      - name: Checkout Code
        uses: actions/checkout@v3
        with:
          fetch-depth: 0  # Necessary for better SonarQube analysis

      # --- STEP 2: THE INSPECTOR (SONARQUBE) ---
      - name: SonarQube Code Analysis
        uses: sonarsource/sonarqube-scan-action@master
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}
        # This step sends the code to your EC2 SonarQube to check for bugs

      # --- STEP 3: THE COOKING (DOCKER BUILD) ---
      - name: Build Docker Image
        run: docker build -t my-mern-app:latest .

      # --- STEP 4: THE WAREHOUSE LOGIN (NEXUS) ---
      - name: Login to Nexus Warehouse
        run: |
          echo "${{ secrets.NEXUS_PASSWORD }}" | docker login ${{ secrets.EC2_HOST }}:8082 -u admin --password-stdin

      # --- STEP 5: STORE IN WAREHOUSE (NEXUS PUSH) ---
      - name: Tag and Push to Nexus
        run: |
          # We give it a version tag and push it through the 'Side Door' (8082)
          docker tag my-mern-app:latest ${{ secrets.EC2_HOST }}:8082/my-mern-app:latest
          docker push ${{ secrets.EC2_HOST }}:8082/my-mern-app:latest

      # --- STEP 6: THE DELIVERY (DEPLOY TO EC2) ---
      - name: Deploy to EC2 via SSH
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ubuntu
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            # 1. Log in to Nexus inside the EC2
            echo "${{ secrets.NEXUS_PASSWORD }}" | docker login ${{ secrets.EC2_HOST }}:8082 -u admin --password-stdin
            
            # 2. Pull the clean, inspected image from the warehouse
            docker pull ${{ secrets.EC2_HOST }}:8082/my-mern-app:latest
            
            # 3. Stop and remove the old version if it's running
            docker stop mern-app-container || true
            docker rm mern-app-container || true
            
            # 4. Run the new version on port 5000
            docker run -d -p 5000:5000 --name mern-app-container ${{ secrets.EC2_HOST }}:8082/my-mern-app:latest

```
