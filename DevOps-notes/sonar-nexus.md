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
docker push localhost:8082/docker-repo/demo-app:v1

16. VERIFY

Go to Nexus and check 


17. FINAL CHECK (IMPORTANT)

Remove local image:

docker rmi demo-app:v1

Pull from Nexus:

docker pull localhost:8082/demo-app:v1

Run:

docker run -p 5000:5000 localhost:8082/demo-app:v1