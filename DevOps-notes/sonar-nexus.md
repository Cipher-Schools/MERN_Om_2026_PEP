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

11. BUILD DOCKER IMAGE

docker build -t demo-app:v1 .



12. Run nexus

docker run -d -p 8081:8081 --name nexus sonatype/nexus3


Get password:

docker exec nexus cat /nexus-data/admin.password


CREATE DOCKER REPOSITORY
