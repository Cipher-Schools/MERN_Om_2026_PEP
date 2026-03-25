
# AWS & Cloud Computing - Detailed Notes

---

## 1. Cloud Service Models (IaaS / PaaS / SaaS)

Cloud computing provides different levels of abstraction depending on how much control you want.

### IaaS (Infrastructure as a Service)

In IaaS, the cloud provider gives you basic infrastructure:
- Virtual machines (compute)
- Storage
- Networking

You are responsible for:
- Operating system installation
- Software setup
- Application deployment

Example:
If you launch an EC2 instance, AWS gives you a virtual machine, but YOU install Node.js, database, etc.

👉 Real-world analogy:
You rent an empty house. Everything inside (furniture, appliances) is your responsibility.

---

### PaaS (Platform as a Service)

In PaaS, the provider manages:
- OS
- Runtime
- Scaling
- Infrastructure

You only:
- Write code
- Deploy it

Example:
AWS Elastic Beanstalk automatically handles server setup.

👉 Analogy:
You rent a fully furnished house. Just bring your belongings.

---

### SaaS (Software as a Service)

You directly use software via the internet.

Example:
Gmail, Google Docs

👉 Analogy:
You stay in a hotel. Everything is managed.

---

## 2. IAM (Identity and Access Management)

IAM controls WHO can do WHAT in AWS.

### IAM Users
- Individual accounts
- Used by real people
- Have username + password or access keys

### IAM Roles
- Temporary permissions
- Used by services (like EC2 accessing S3)

👉 Important:
Never store AWS keys in code. Use IAM roles instead.

### IAM Policies
Policies are JSON documents that define permissions.

Example:
Allow S3 read access:
{
  "Effect": "Allow",
  "Action": "s3:GetObject",
  "Resource": "*"
}

👉 Principle of Least Privilege:
Always give minimum permissions required.

---

## 3. EC2 (Elastic Compute Cloud)

EC2 provides virtual servers.

### How EC2 Works:
1. Choose AMI (OS image)
2. Select instance type (CPU/RAM)
3. Configure networking
4. Attach storage (EBS)
5. Launch instance

### Key Concepts:

#### AMI (Amazon Machine Image)
Pre-configured OS (Ubuntu, Amazon Linux)

#### Instance Type
Defines power (t2.micro, t3.large)

#### Key Pair
Used to securely SSH into instance

#### Security Group
Acts as firewall

Example:
- Allow port 22 → SSH
- Allow port 80 → HTTP

---

## 4. S3 (Simple Storage Service)

S3 is object storage.

### Structure:
Bucket → Folder → Object

### Features:
- Unlimited storage
- Highly durable
- Public or private files

### Use Cases:
- Store images
- Static websites
- Backups

---

## 5. EBS (Elastic Block Store)

EBS is disk storage for EC2.

### Key Points:
- Attached to EC2
- Persistent (data survives restart)
- Like hard disk

### Snapshots:
Used for backups

---

## 6. RDS (Relational Database Service)

Managed database service.

### Supported DBs:
- MySQL
- PostgreSQL
- MariaDB

### Features:
- Automatic backups
- Scaling
- High availability

👉 You don’t manage server, AWS does.

---

## 7. VPC (Virtual Private Cloud)

VPC is your private network.

### Components:
- CIDR block (IP range)
- Subnets
- Route tables

---

## 8. Subnets

Subnets divide VPC.

### Types:
- Public → has internet access
- Private → no direct internet

---

## 9. Security Groups

Firewall for EC2.

### Rules:
- Inbound (incoming)
- Outbound (outgoing)

👉 Example:
Allow:
- SSH (22)
- HTTP (80)
- HTTPS (443)

---

## 10. CloudFront

CDN that caches content globally.

### Benefits:
- Faster delivery
- Reduced latency

---

## 11. CloudWatch

Monitoring service.

### Tracks:
- CPU usage
- Logs
- Metrics

### Features:
- Alarms
- Logs
- Dashboards

---

-----------------------------------------------


-------------------------------------------------



STEPS FOR DEPLOYING BACKEND ON AWS EC2

1. create ec2 instance and setup
2. Install node js on instance

    ```
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash


    source ~/.bashrc

    nvm install --lts

    ```
    
3. clone your repo

4. Run backend 



---------------------------------------------------
---------------------------------------------------
------------------------------------------------

# 🚀 Deployment Add-ons (PM2, Nginx, SSL)

---

## 🔹 PM2 (Process Manager)

PM2 is used to keep your Node.js app running continuously in the background.  
It automatically restarts your app if it crashes and can start it on server reboot.

👉 Without PM2 → app stops when terminal closes  
👉 With PM2 → app runs forever

### ✅ Commands

```bash
# Install PM2 globally
npm install -g pm2

# Start your app
pm2 start index.js --name backend

# Check running apps
pm2 list

# View logs
pm2 logs

# Restart app
pm2 restart backend

# Stop app
pm2 stop backend

# Save process for auto-start on reboot
pm2 save

# Enable startup script
pm2 startup
```

---

## 🔹 Nginx (Reverse Proxy)

Nginx is used to forward requests from port 80 (public) to your backend port (like 3000 or 5000).  
It also improves security and allows you to serve your app on a domain.

👉 User hits: `http://yourdomain.com`  
👉 Nginx forwards → `http://localhost:3000`

### ✅ Installation

```bash
sudo apt update
sudo apt install nginx -y
```

### ✅ Config File

```bash
sudo nano /etc/nginx/sites-available/default
```

Replace inside `server {}`:

```nginx
server {
    listen 80;
    server_name your_domain_or_ip;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### ✅ Apply Changes

```bash
sudo nginx -t     # test config
sudo systemctl restart nginx
```

---

## 🔹 Certbot (SSL Certificate - HTTPS)

Certbot is used to generate free SSL certificates (HTTPS) using Let’s Encrypt.  
It makes your website secure (`https://` instead of `http://`).

👉 Required for production apps

---

### ⚠️ Before Running
- Domain must point to your server IP (via DNS)

---

### ✅ Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

---

### ✅ Generate SSL

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

### ✅ Auto Renew Check

```bash
sudo certbot renew --dry-run
```

---

## 🔥 FLOW 

1. Start backend using PM2  
2. Use Nginx to expose it on port 80  
3. Add domain  
4. Secure it with HTTPS using Certbot  
