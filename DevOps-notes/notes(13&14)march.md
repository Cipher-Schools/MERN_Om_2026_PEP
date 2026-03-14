# DevOps Notes

## YAML, JSON, jq, Bash Automation, GitHub Copilot

------------------------------------------------------------------------

# 1. YAML (YAML Ain't Markup Language)

## What is YAML?

YAML stands for **YAML Ain't Markup Language**.

YAML is a **human-readable data format used for writing configuration
files**.

Unlike programming languages, YAML files **do not execute code**.\
Instead, other tools read YAML files and apply configuration.

------------------------------------------------------------------------

## Where YAML is Used

YAML is widely used in DevOps tools such as:

-   Kubernetes
-   Docker Compose
-   GitHub Actions
-   Ansible
-   CI/CD pipelines

Example uses:

-   defining application configuration
-   specifying server settings
-   describing infrastructure

------------------------------------------------------------------------

## Basic YAML Syntax

``` yaml
name: ecommerce-api
port: 4000
environment: development
```

Key = identifier\
Value = data associated with the key

------------------------------------------------------------------------

## YAML Indentation

``` yaml
application:
  name: ecommerce-api
  version: 1.0
```

YAML uses **spaces to represent hierarchy**.

Important rule: **use spaces, not tabs**.

------------------------------------------------------------------------

## YAML Lists

``` yaml
features:
  - login
  - checkout
  - payment
```

------------------------------------------------------------------------

## YAML Example Configuration

``` yaml
application:
  name: ecommerce-api
  version: 1.0

server:
  port: 4000
  environment: development

database:
  type: postgres
  host: localhost
  port: 5432

features:
  - login
  - product-list
  - checkout
  - payment
```

------------------------------------------------------------------------

# 2. JSON (JavaScript Object Notation)

## What is JSON?

JSON stands for **JavaScript Object Notation**.

JSON is a lightweight **data format used to store and transmit
structured data**.

It is commonly used in:

-   APIs
-   Web applications
-   Databases
-   DevOps automation

------------------------------------------------------------------------

## JSON Structure

### Object Example

``` json
{
 "name": "Rahul",
 "role": "admin"
}
```

### Array Example

``` json
["linux", "docker", "git"]
```

------------------------------------------------------------------------

## Example JSON File

``` json
{
 "application": "ecommerce-api",
 "port": 4000,
 "database": "postgres"
}
```

------------------------------------------------------------------------

# 3. YAML vs JSON

  Feature       YAML                  JSON
  ------------- --------------------- ----------------------
  Readability   Very high             Medium
  Syntax        Minimal symbols       More brackets
  Usage         Configuration files   APIs & data exchange
  Indentation   Required              Not required

------------------------------------------------------------------------

# 4. jq (JSON Query Tool)

## What is jq?

`jq` stands for **JSON Query**.

jq is a **command-line tool used to process JSON data**.

It allows us to:

-   read JSON files
-   extract fields
-   filter data
-   transform JSON

Think of jq as:

-   SQL for JSON

------------------------------------------------------------------------

## Installing jq

Check if jq exists:

``` bash
jq --version
```

If not installed:

``` bash
sudo apt install jq
```

### sudo

**Super User Do** --- runs command with administrator privileges.

### apt

**Advanced Package Tool** --- package manager used in Ubuntu/Debian to
install software.

------------------------------------------------------------------------

# 5. jq Basic Example

### simple.json

``` json
{
 "name": "server-1",
 "status": "running",
 "port": 8080
}
```

### Print JSON

``` bash
jq '.' simple.json
```

### Extract Field

``` bash
jq '.name' simple.json
```

Output: server-1

------------------------------------------------------------------------

# 6. jq Nested JSON Example

``` json
{
 "server": {
  "name": "web-server",
  "ip": "192.168.1.10",
  "status": "running"
 }
}
```

Extract nested field:

``` bash
jq '.server.name'
```

------------------------------------------------------------------------

# 7. jq Array Example

``` json
{
 "servers": [
  "web-server",
  "db-server",
  "cache-server"
 ]
}
```

Iterate array:

``` bash
jq '.servers[]'
```

------------------------------------------------------------------------

# 8. jq Array of Objects

``` json
{
 "servers":[
  {"name":"web-server","ip":"192.168.1.10","status":"running"},
  {"name":"db-server","ip":"192.168.1.20","status":"stopped"},
  {"name":"cache-server","ip":"192.168.1.30","status":"running"}
 ]
}
```

Extract names:

``` bash
jq '.servers[].name'
```

Filter running servers:

``` bash
jq '.servers[] | select(.status=="running") | .name'
```

Count running servers:

``` bash
jq '[.servers[] | select(.status=="running")] | length'
```

------------------------------------------------------------------------

# 9. Bash + jq Automation

Example script:

``` bash
#!/bin/bash

echo "Running servers:"

jq -r '.servers[] | select(.status=="running") | .name' servers.json
```

Count servers:

``` bash
#!/bin/bash

count=$(jq '[.servers[] | select(.status=="running")] | length' servers.json)

echo "Running servers: $count"
```

------------------------------------------------------------------------

# 10. GitHub Copilot

## What is GitHub Copilot?

GitHub Copilot is an **AI-powered coding assistant** developed by:

-   GitHub
-   OpenAI

It can generate:

-   Bash scripts
-   YAML configurations
-   Dockerfiles
-   Kubernetes configs
-   CI/CD pipelines

Copilot works inside editors such as **VS Code**.

Example prompt:

``` bash
# bash script to check disk usage
```

Copilot may suggest:

``` bash
df -h
```

------------------------------------------------------------------------

## Important Rule

Always:

-   review AI-generated code
-   understand it
-   test it

Never blindly run unknown scripts.

------------------------------------------------------------------------

