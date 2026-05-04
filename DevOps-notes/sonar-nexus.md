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



# AUTOMATATION ( Step by step )

#### 1. Create EC2 and add ports 22, 3000, 8081, 8082, 9000
- t2.medium or large with 20GB storage.

#### 2. ssh and follow:

```

# Install Docker
sudo apt update && sudo apt install docker.io -y
sudo usermod -aG docker ubuntu
# !!! NOW LOGOUT AND LOG BACK IN TO APPLY DOCKER PERMISSIONS !!!

```

#### 3. Run images of Nexus & Sonar in docker containers


- 1. Start Nexus (Warehouse)
```
docker rm -f nexus || true

docker run -d \
  --name nexus \
  -p 8081:8081 \
  -p 8082:8082 \
  --restart unless-stopped \
  sonatype/nexus3

```

- 2. Start SonarQube (Inspector)

```
docker rm -f sonarqube || true

docker run -d \
  --name sonarqube \
  -p 9000:9000 \
  --restart unless-stopped \
  sonarqube:lts
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
    branches: ["main"]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      # --- STEP 1: CHECKOUT CODE ---
      - name: Checkout Code
        uses: actions/checkout@v3
        with:
          fetch-depth: 0

      # --- STEP 2: CHECK SONARQUBE ---
      - name: Check SonarQube Availability
        run: |
          curl -f ${{ secrets.SONAR_HOST_URL }}/api/system/status || exit 1

      # --- STEP 3: SONARQUBE ANALYSIS ---
      - name: SonarQube Code Analysis
        uses: sonarsource/sonarqube-scan-action@master
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}

      # --- STEP 4: BUILD IMAGE ---
      - name: Build Docker Image
        run: docker build -t my-mern-app:latest .

      # ✅ ADD THIS STEP (CI FIX)
      - name: Configure Docker for Nexus (CI)
        run: |
          echo '{ "insecure-registries": ["${{ secrets.EC2_HOST }}:8082"] }' | sudo tee /etc/docker/daemon.json
          sudo systemctl restart docker

      # --- STEP 5: LOGIN TO NEXUS ---
      - name: Login to Nexus
        run: |
          echo "${{ secrets.NEXUS_PASSWORD }}" | docker login http://${{ secrets.EC2_HOST }}:8082 -u admin --password-stdin

      # --- STEP 6: PUSH IMAGE ---
      - name: Tag and Push to Nexus
        run: |
          docker tag my-mern-app:latest ${{ secrets.EC2_HOST }}:8082/my-mern-app:latest
          docker push ${{ secrets.EC2_HOST }}:8082/my-mern-app:latest

      # --- STEP 7: DEPLOY ---
      - name: Deploy to EC2 via SSH
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ubuntu
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            # Ensure Nexus is running
            if ! docker ps | grep nexus; then
              docker start nexus || echo "Nexus not found"
            fi

            # Login to Nexus (LOCAL)
            echo "${{ secrets.NEXUS_PASSWORD }}" | docker login http://localhost:8082 -u admin --password-stdin

            # Pull latest image
            docker pull localhost:8082/my-mern-app:latest

            # Stop old container
            docker stop mern-app-container || true
            docker rm mern-app-container || true

            # Run new container
            docker run -d -p 3000:3000 --name mern-app-container localhost:8082/my-mern-app:latest

```

<!-- RUN this on EC2
echo '{ "insecure-registries":["'$(curl -s http://checkip.amazonaws.com)':8082"] }' | sudo tee /etc/docker/daemon.json
sudo systemctl restart docker -->
