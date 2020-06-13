### Install Flask Back-end 

```bash
# Clone this repository
$ git clone https://github.com/gustavoCorreiaGonzalez/hackathon_ccr

# Go into the repository
$ cd backend

# Install dependencies
$ pip3 install -r requirements.txt

# Database Init
$ flask db init 

# Run Migrates
$ flask db migrate

# Start server
$ export FLASK_APP=main.py
$ export FLASK_ENV=development
$ flask run
