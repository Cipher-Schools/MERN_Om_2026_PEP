# Bash Scripting

### 1. What is Bash?

**Bash** stands for:

Bourne Again SHell

Bash is a **shell program** used in Linux to interpret and execute commands.

A **shell** is an interface between the user and the operating system.

When we type commands in the terminal like:

```bash
ls
```

The shell reads the command and sends instructions to the Linux system.

Bash is the most commonly used shell in Linux systems.

### 2. What is a Script?

A script is a file containing a list of commands.

Instead of typing commands one by one, we store them inside a file and run them together.

Example commands:

```bash
mkdir project
cd project
touch file1.txt
touch file2.txt
```

These commands can be written inside a file and executed automatically.

That file becomes a script.

### 3. What is Bash Scripting?

Bash scripting is the process of writing multiple Linux commands inside a file so they can run automatically.

Bash scripting is widely used for:

* automation

* server setup

* backups

* system monitoring

* DevOps tasks

### 4. Check Bash Installation

Bash is already installed in Linux.

Verify Bash version:

```bash
bash --version
```

Example output:

```bash
GNU bash, version 5.x.x
```

### 5. Creating a Script File

Create a folder for practice.

```bash
mkdir bash-practice
cd bash-practice
```

Create a script file.

```bash
touch script.sh
```

.sh is commonly used for shell script files.

Open the file:

```bash
nano script.sh
```

### 6. Shebang (Interpreter Line)

The first line of most Bash scripts is called the shebang.

Example:

```bash
#!/bin/bash
```

Explanation:

* #! → indicates interpreter

* /bin/bash → path to Bash shell

This tells the system to run the script using Bash.

### 7. First Bash Script

Example script:

```bash
#!/bin/bash

echo "Hello World"
echo "Welcome to Bash scripting"
```
Explanation:

echo prints text to the terminal.

Save file in Nano:

CTRL + O → Enter
CTRL + X

### 8. Running a Script

Make the script executable:

```bash
chmod +x script.sh
```

Run the script:
```bash
./script.sh
```
Explanation:

chmod +x → gives execute permission.

./script.sh → runs the script in the current directory.

### 9. Comments in Bash

Comments are ignored by the script.

They help explain code.

Example:
```bash
# This is a comment
```
Example script:
```bash
#!/bin/bash

# Print welcome message
echo "Welcome to DevOps"
```
### 10. Variables

Variables store values.

Example:
```bash
name="DevOps"
```
Access variable:
```bash
echo $name
```
Example script:
```bash
#!/bin/bash

name="DevOps"

echo "Welcome to $name class"
```

### 11. User Input

Scripts can take input from users.

Keyword:

read

Example:
```bash
#!/bin/bash

echo "Enter your name:"
read username

echo "Hello $username"
```
Explanation:

read stores user input in a variable.

### 12. Arithmetic Operations

Bash can perform calculations.

Syntax:
```bash
$(( expression ))
```
Example script:
```bash
#!/bin/bash

num1=10
num2=5

sum=$((num1 + num2))

echo "Sum is $sum"
```

Example operations:

+
-
*
/
### 13. Conditional Statements (if)

Conditional statements allow scripts to make decisions.

Structure:
```bash
if [ condition ]
then
commands
else
commands
fi
```

Example:
```bash
#!/bin/bash

echo "Enter a number:"
read num

if [ $num -gt 10 ]
then
echo "Number is greater than 10"
else
echo "Number is 10 or smaller"
fi
```

Comparison operators:
```
Operator	Meaning
-gt	        greater than
-lt	        less than
-eq	        equal
-ge	        greater or equal
-le	        less or equal
```

### 14. For Loop

A loop repeats commands multiple times.

Structure:
```
for variable in list
do
commands
done
```
Example:
```
#!/bin/bash

for i in 1 2 3 4 5
do
echo "Number: $i"
done
```

### 15. Loop Example (Create Files)

Example script:
```
#!/bin/bash

for i in 1 2 3
do
touch file$i.txt
done
```

Creates files:

file1.txt, 
file2.txt,
file3.txt

### 16. While Loop

While loop runs while a condition is true.

Structure:
```
while [ condition ]
do
commands
done
```

Example:
```
#!/bin/bash

count=1

while [ $count -le 5 ]
do
echo "Count: $count"
count=$((count + 1))
done
```
### 17. Functions

Functions group commands together.

Structure:
```
function_name() {
commands
}
```
Example:
```
#!/bin/bash

greet() {
echo "Welcome to Bash scripting"
}

greet
```
Explanation:

greet() → defines function.

greet → calls the function.

### 18. Useful System Commands in Scripts

Scripts often use system commands.

Examples:

Show current user:
```
whoami
```
Show current directory:
```
pwd
```
Show date:
```
date
```
Show disk usage:
```
df -h
```

### 19. Example System Information Script

Example script:
```
#!/bin/bash

echo "System Information"

echo "User:"
whoami

echo "Date:"
date

echo "Current directory:"
pwd

echo "Disk usage:"
df -h
```
### 20. Why Bash Scripting is Important

Bash scripting helps automate tasks such as:

* server setup

* application deployment

* system monitoring

* backups

* log management

It is an important skill for DevOps engineers and system administrators.