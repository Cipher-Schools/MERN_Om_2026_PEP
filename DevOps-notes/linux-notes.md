# Linux Basics — Commands & Concepts
*(After Ubuntu Installation)*

This section covers the basic Linux commands and concepts required for working with Linux servers.
---

# 1. Terminal

Most DevOps work is done using the **terminal**.

A **terminal** is a program where we type commands to interact with the operating system.

Open terminal using:


Ctrl + Alt + T

Example:

student@ubuntu:~$


# 2. pwd — Print Working Directory

Command:

pwd

Meaning:

Print Working Directory

Shows the **current directory (folder)** you are inside.

Example output:

/home/student

Explanation:

- `/` → root directory (top of filesystem)
- `home` → user home folders
- `student` → current user folder

---

# 3. ls — List Files

Command:

ls

Lists files and directories in the current folder.

Example:

Documents Downloads Pictures

### Useful options

ls -l

Shows detailed information.

Example:

-rw-r--r-- 1 student student 120 Jun 20 notes.txt

ls -a

Shows hidden files.

Hidden files start with `.`

Example:

.git
.env

---

# 4. cd — Change Directory

Used to move between folders.

Example:

cd Documents

Go back one level:

cd ..

Go to home directory:

cd ~

Example path change:

/home/student

to

/home/student/Documents

---

# 5. mkdir — Create Directory

Create a new folder.

mkdir project

Check with: ls

Output: project

---

# 6. touch — Create File

Create an empty file.

touch file.txt

Examples:

touch notes.txt
touch app.js
touch index.html

---

# 7. cp — Copy Files

Copy a file.

cp file.txt backup.txt

Example:

cp notes.txt notes_backup.txt

---

# 8. mv — Move or Rename Files

Move file to another folder:

mv file.txt project/

Rename file:

mv notes.txt lecture_notes.txt

---

# 9. rm — Remove Files

Delete file:

rm file.txt

Delete folder recursively:

rm -r foldername

`-r` means **recursive** (delete folder and its contents).

---

# 10. Viewing File Content

Display file content:

cat file.txt

Show first lines:

head file.txt

Show last lines:

tail file.txt

Useful for viewing logs.

---

# 11. File Permissions

Check permissions using:

ls -l

Example:

-rwxr-xr--

Structure:

owner group others

Permission symbols:

Symbol        Meaning
r  <-------  read 
w  <------- write
x  <------- execute 

Example:

rwx

means full access.

---

# 12. chmod — Change Permissions

Used to modify file permissions.

Example:


chmod 755 script.sh


Numeric permission system:

Number      Permission 

 4  <------read 
 2  <------write 
 1  <------execute

Example:

7 = 4 + 2 + 1
Meaning:
755

| User | Permission |
|-----|-----|
| Owner | read write execute |
| Group | read execute |
| Others | read execute |

Another example:


chmod 600 secrets.txt


Owner can read/write, others cannot access.

---

# 13. File Ownership

Check ownership:


ls -l


Example:


-rw-r--r-- 1 student student file.txt


Structure:

owner group

---

# 14. chown — Change Ownership

Change file owner:

sudo chown devuser file.txt

Change owner and group:

sudo chown devuser:devuser file.txt

Recursive ownership change:

sudo chown -R devuser project/

`-R` means apply changes to all files inside directory.

---

# 15. Processes

A **process** is a running program.

Examples:

- Node server
- Browser
- Database

View processes:

ps

Detailed list:

ps aux

---

# 16. top — System Monitor

Run:
top

Shows real-time system usage:

- CPU usage
- Memory usage
- Running processes

---

# 17. kill — Stop Processes

Every process has a **PID (Process ID)**.

Stop process:

kill PID

Example:

kill 1234

Force kill:

kill -9 PID

---

# 18. Cron Jobs (Task Scheduling in Linux)

In real servers, many tasks need to run **automatically at specific times**.  
For example:

- Creating database backups every night
- Cleaning temporary files every week
- Generating system reports every morning
- Restarting services periodically

Instead of running these tasks manually every time, Linux provides a system called **Cron**.

Cron is a **task scheduling system** in Linux that allows the operating system to run commands or scripts automatically at specific times.

These scheduled tasks are called **Cron Jobs**.

---

## Why Cron is Important

Cron is widely used in server management and DevOps because it allows **automation of repetitive tasks**.

Examples of real-world usage:

- Automatic database backups
- Log file cleanup
- Monitoring scripts
- Email reports
- Data synchronization tasks

Automation reduces human effort and prevents mistakes caused by forgetting important tasks.

---

## Cron Daemon

Cron works through a background service called a **daemon**.

A **daemon** is a program that runs continuously in the background and performs tasks without user interaction.

The **Cron daemon** constantly checks if there are any scheduled tasks that need to run.  
If the current time matches a scheduled task, Cron automatically executes it.

---

## Crontab (Cron Table)

Cron jobs are stored in a configuration file called a **crontab**.

The word **crontab** stands for **Cron Table**.

A crontab file contains the schedule of tasks that should run automatically.

Each user in Linux can have their own crontab, which allows them to schedule tasks for their environment.

---

## Where Cron is Used in DevOps

Cron is commonly used in DevOps environments for:

- Automating server maintenance tasks
- Scheduling backup operations
- Running monitoring scripts
- Cleaning system logs
- Running scheduled data processing tasks

Cron helps keep systems **organized, automated, and reliable**.

---

# 19. Vagrant and VM Provisioning

When developers work on projects, they often need **identical development environments**.

For example, a project might require:

- Ubuntu Linux
- Node.js
- Docker
- Specific libraries and tools

If every developer installs these manually, their systems may become different.  
This often leads to the famous problem:

> "It works on my machine, but not on yours."

To solve this problem, DevOps engineers use tools that automatically create **identical environments**.

One such tool is **Vagrant**.

---

## What is Vagrant?

Vagrant is a tool used to **create and manage virtual machines automatically**.

Instead of manually creating virtual machines using graphical tools, Vagrant allows developers to define the entire environment using a configuration file.

Using this configuration, Vagrant can automatically:

- Create a virtual machine
- Configure the operating system
- Install required software
- Prepare a ready-to-use development environment

This process ensures that every developer works in the **same environment**.

---

## Virtual Machines

A **Virtual Machine (VM)** is a computer created using software that behaves like a real computer.

It has:

- its own operating system
- CPU and memory allocation
- storage
- networking

Virtual machines allow developers to simulate server environments on their laptops.

Tools like **VirtualBox** or **VMware** are commonly used to run virtual machines.

---

## What is Provisioning?

Provisioning means **automatically setting up a system with the required software and configuration**.

For example, when a new server is created, provisioning may automatically install:

- programming languages
- web servers
- databases
- development tools

Instead of installing these manually every time, provisioning scripts configure the system automatically.

---

## Vagrant VM Provisioning

Vagrant supports **VM provisioning**, which means:

When a virtual machine is created, Vagrant can automatically configure it and install all required software.

For example, provisioning can automatically:

- install development tools
- install Docker
- configure networking
- set up project dependencies

This makes it easy to create **consistent and repeatable environments**.

---

## Why DevOps Engineers Use Vagrant

Vagrant is useful because it provides:

- **Consistent environments** for all developers
- **Automated setup** of development machines
- Easy recreation of environments
- Ability to test infrastructure locally

It helps developers and DevOps engineers quickly create environments that closely resemble real servers.

---

