<h1>E-commerce project</h1>

- Here are the instructions for setting up the project: <br/>
  <br>1)Front End instructions: <br>
<br>1- Clone the repository to your local machine using the following command: 
<br><code>git clone https://github.com/omarSemgey/e-commerce</code><br>
2- Open front directory: 
<br><code>cd front</code><br>
3- Install the project dependencies using npm: 
<br><code>npm install</code><br>
4- Install the back end section of the project from the instructions below<br>
5- Start the development server: 
<br><code>npm run dev</code><br>
6- Access the application in your web browser at http://localhost:5173/.<br>
7- Access the dashboard through the user account.<br>
  -Email:admin@gmail.com<br>
  -Password:123456<br>
  <br>2)Back End instructions: <br>
    <br>2)Back End apis: <br>
- Postman test apis [documenter](https://documenter.getpostman.com/view/34018148/2sAXjDdEk3)

- Here are the instructions for setting up the backend section of the project: <br/>
NOTE: you need to install xammp and any editor on your desktop.
<br>1- Clone the repository to your local machine using the following command: 
<br><code>git clone https://github.com/omarsemegey/e-commerce</code><br>
2- Open back directory: 
<br><code>cd back</code><br>
2- Install the project dependencies using Composer: 
<br><code>composer install</code><br>
3- Create a copy of the .env.example file and rename it to .env: 
<br><code>cp .env.example .env</code><br>
4- Generate a new application key: 
<br><code>php artisan key:generate</code><br>
5- Configure the database connection in the .env file: 
<br><code>DB_CONNECTION=mysql<br>
        DB_HOST=127.0.0.1
        DB_PORT=3306
        DB_DATABASE=e-commerce
        DB_USERNAME=root
        DB_PASSWORD=</code><br>
6- Run the database migrations: 
<br><code>php artisan migrate:fresh --seed</code><br>
7- Start the development server: 
<br><code>php artisan serve</code><br>
