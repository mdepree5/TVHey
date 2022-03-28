<div id="top"></div>

<br />
<div align="center">
  <a href="https://tvhey.herokuapp.com/">
    <img src='https://capstone-slack-clone.s3.amazonaws.com/favicon.ico' alt="Logo" width="70" height="70">
  </a>

<h1 align="center">TVHey</h1>
  <h3 style='font-style: italic' align="center">"The idea was to bring together a group of of remarkable people to see if they could become something more"</h3>
  <h1 align="center"></h1>
  
  <p align="justify">
    Everything we do at TVHey, we do to change the world for the better. 
    We know we can't do this alone, which is why we believe in equipping you to change it with us. 
    <a href="https://slack.com/help/articles/115004071768-What-is-Slack-">Slack</a> is doing this too. They, like us, know that without the tools to communicate, we are leaving the possibility of changing the world up to chance.
    Here at TVHey, we work tirelessly in every detail and at every level of the services we offer and the features we put into your hands. 
    We happen to provide a beautifully designed app and lightning-fast messaging. When you're ready, <a href="https://tvhey.herokuapp.com/"><strong>come change the world with us »</strong></a>

  </p>
  <p align="center">
    <br />
    <a href="https://tvhey.herokuapp.com/"><strong>TVHey Live Site »</strong></a>
    <br />
    <br />
    <a href="#getting-started">Get Started</a>
    ·
    <a href="https://github.com/mdepree5/TVHey/wiki">Explore Docs</a>
    ·
    <a href="https://github.com/mdepree5/TVHey/issues">Report Bug</a>
  </p>
</div>

## Features
### Users
* Users can sign up, log in, and log out.
* Users can log in with demo user credentials before creating their own profile.
* Unauthenticated users will be directed to login/sign up page.
* Authenticated users will have full access to site functionality.
* Authenticated users can update their display name and profile image.

### Channels
* Authenticated users can write, read, update, and delete channels.

### Messages
* Authenticated users can write, read, update, and delete messages.

<!-- Built With -->
## Built With
### Backend
* <a href="https://www.postgresql.org/">PostgresQL</a>
* <a href="https://flask.palletsprojects.com/en/2.0.x/">Flask</a>
* <a href="https://flask-sqlalchemy.palletsprojects.com/en/2.x/">SQLAlchemy</a>
* <a href="https://aws.amazon.com/s3/">AWS S3</a>
### Frontend
* <a href="https://developer.mozilla.org/en-US/docs/Web/CSS">Pure CSS</a>
* <a href="https://reactjs.org/"><strong>React</strong></a>
* <a href="https://redux.js.org/">Redux</a>
* <a href="https://docker-curriculum.com/">Deployed with Docker</a>
  
<!-- Future Implementation -->
## Future Implementation
* Websockets for live messaging
* Direct Messages
* Search

## Site
### Log in
<img src="https://capstone-slack-clone.s3.amazonaws.com/live-site/login.png" width="600" height="400">

### Sign up 
<img src="https://capstone-slack-clone.s3.amazonaws.com/live-site/signup.png" width="600" height="400">

### Home
<img src="https://capstone-slack-clone.s3.amazonaws.com/live-site/home.png" width="600" height="400">
<br />

### New Channel
<img src="https://capstone-slack-clone.s3.amazonaws.com/live-site/new-channel.png" width="600" height="400">
<br />

### Write Messages
<img src="https://capstone-slack-clone.s3.amazonaws.com/live-site/write+messages.png" width="600" height="400">
<br />

### Update User Information
<img src="https://capstone-slack-clone.s3.amazonaws.com/live-site/user+information.png" width="600" height="400">
<br />


<!-- GETTING STARTED -->
<h1 align="center"></h1>

## Getting Started
To get a local copy up and running follow these simple example steps.

1. Clone the repository
    ```sh
    git clone git@github.com:mdepree5/TVHey.git
    ```
2. Install backend dependencies in root directory
    ```sh
     pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
    ```
3. Create a POSTGRESQL user in PSQL
    ```sh
    psql -c "CREATE USER <username> WITH PASSWORD '<password>' CREATEDB"
    ```
4. Create .env file and add username, password, database name, JWT/secret, port
    ```sh
    touch .env
    ```
5. Populate backend server
    ```sh
     pipenv shell
     flask db upgrade
     flask seed all
    ```
6. Start backend server
    ```sh
    flask run
    ```
    
7. In a separate terminal window, change directories into 'react-app' and install frontend dependencies
    ```sh
    cd react-app
    npm install
    ```
8. Start frontend server and navigate to https://localhost:3000/
    ```sh
    npm start
    ```
<h1 align="center"></h1>


<!-- CONTACT -->
<h2 align="center">Get in touch</h2>
<p align="center">
<a href="https://github.com/mdepree5"><strong>Github »</strong></a>
· 
<a href="https://www.linkedin.com/in/mitchell-depree-4a5686155"><strong>LinkedIn »</strong></a>
</p>



<p align="right">(<a href="#top">back to top</a>)</p>
