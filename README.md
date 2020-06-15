# Front Hackathon

### Como instalar:

na sua linha de comando, digite:

```
  npm install
```

Isso irá levar alguns minutos para instalar todas as dependências.

Você pode ligar o projeto em modo de desenvolvimento:

### 1 - development mode:

`npm run start`

Gerar build de desenvolvimento && subir o projeto local, antes de rodar o build:

### 2 - build development mode:

```
      npm run build:dev
      npx serve -s build
```

Gerar build de produção && subir o projeto local, antes de rodar o build:

### 4 - build production mode:

```
      npm run build:prod
      npx serve -s build
```

# Back End Hackathon

### Install

```bash
# Clonar o repositório
$ git clone https://github.com/gustavoCorreiaGonzalez/hackathon_ccr

# Ir par ao repositório
$ cd backend

# Instalar as dependências
$ pip3 install -r requirements.txt

# Setar as variáveis de ambiente
$ export FLASK_APP=main.py
$ export FLASK_ENV=development
```

### Migrate do banco de dados

```bash
# Iniciar o Database
$ flask db init 

# Rodar Migrates
$ flask db migrate

# Atualizar as Migrates
$ flask db upgrade
```

### Inicar o servidor

```bash
# Iniciar o server
$ flask run
```

# BOT WHATSAPP Hackathon

### Inicar o bot
```bash
# Ir par ao repositório
$ cd bot

# Iniciar o server
$ python3 bot.py
```