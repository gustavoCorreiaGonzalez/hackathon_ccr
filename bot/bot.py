from whatsapp_api import WhatsappAPI
from datetime import datetime
import requests
import random
import time

class Pistao:
    def __init__(self):
        self.api = WhatsappAPI()
        self.bot_name = 'Pistão'
        self.drivers = {}
        self.last_action = {}
        self.last_location = {}

    def run(self):
        while True:
            for contact in self.api.get_contacts():
                self.api.select_contact(contact)
                locations = self.api.get_location_messages(contact)
                messages = self.api.get_text_messages(contact)
                self.update_locations(locations)
                self.execute_commands(messages)
                time.sleep(5)
            self.api.browser.refresh()
            time.sleep(10)

    def execute_commands(self, messages):
        # Interpreta as mensagens recebidas e executa os comandos em ordem
        for key in messages:
            author = key.split('] ')[1].strip().replace(':','')
            timestamp = datetime.strptime(key.split('[')[1].split(']')[0], '%I:%M %p, %m/%d/%Y')
            message = messages[key].lower()

            if author not in self.last_action.keys():
                self.last_action[author] = {'action': None, 'timestamp': datetime(2020, 1, 1)}

            if timestamp > self.last_action[author]['timestamp'] and (datetime.now() - timestamp).seconds / 60 < 3:
                if self.last_action[author]['action'] == 'registrar-nome':
                    self.drivers[author]['age'] = message
                    lines = ['Perfeito, agora já posso te contar as novidades!',
                             'Digite *comandos* para explorar minhas funcionalidades.']
                    self.api.send_text_message(lines)
                    self.last_action[author] = {'action': 'registrar-idade', 'timestamp': timestamp}

                if self.last_action[author]['action'] == 'registrar':
                    self.drivers[author]['name'] = message
                    lines = ['Prazer em conhecê-lo {}! Me diga uma coisa, qual a sua idade?'.format(message)]
                    self.api.send_text_message(lines)
                    self.last_action[author] = {'action': 'registrar-nome', 'timestamp': timestamp}

                if message == 'registrar':
                    self.drivers[author] = {'whatsapp': author}
                    lines = ['Bem-vindo {}, meu nome é Pistão, também conhecido como robô da CCR.'.format(author),
                             'Para começarmos, por favor digite seu nome completo.']
                    self.api.send_text_message(lines)
                    self.last_action[author] = {'action': 'registrar', 'timestamp': timestamp}

                if message == 'comandos':
                    lines = ['Digite *emergencia* para solicitar ajuda.',
                             'Digite *eventos* para conferir os últimos eventos registrados']
                    self.api.send_text_message(lines)

                elif message == 'humor':
                    lines = ['{}, já dizia o para-choque do meu caminhão:'.format(author),
                             '```Se casamento fosse bom não precisaria de testemunhas.```']
                    self.api.send_text_message(lines)
                    self.last_action[author] = {'action': 'humor', 'timestamp': timestamp}

                elif message == 'emergencia':
                    lines = ['Digite *1* para reportar acidentes de trânsito.',
                             'Digite *2* para reportar problemas de saúde.',
                             'Digite *3* para reportar crimes.']
                    self.api.send_text_message(lines)
                    self.last_action[author] = {'action': 'emergencia', 'timestamp': timestamp}

                elif message == 'eventos':
                    lines = ['Que tipo de evento você procura?',
                             'Digite *1* para eventos sobre saúde.',
                             'Digite *2* para eventos sobre bem estar.',
                             'Digite *3* para visualizar os últimos informativos da CCR.']
                    self.api.send_text_message(lines)
                    self.last_action[author] = {'action': 'eventos', 'timestamp': timestamp}

                elif message in ['1', '2', '3']:
                    if self.last_action[author]['action'] == 'emergencia':
                        self.api.send_text_message('Emergência recebida. Um operador entrará em contato em instantes...')

                        if message == '1':
                            self.last_action[author] = {'action': 'acidente', 'timestamp': timestamp}
                        if message == '2':
                            self.last_action[author] = {'action': 'problema-de-saude', 'timestamp': timestamp}
                        if message == '3':
                            self.last_action[author] = {'action': 'crime', 'timestamp': timestamp}

                        self.api.send_text_message('Por favor envie sua localização atual clicando no botão *+* do WhatsApp.')

                    elif self.last_action[author]['action'] == 'eventos':
                        self.api.send_text_message('Listando eventos...')

                        if message == '1':
                            self.last_action[author] = {'action': 'eventos-saude', 'timestamp': timestamp}
                        if message == '2':
                            self.last_action[author] = {'action': 'eventos-bem-estar', 'timestamp': timestamp}
                        if message == '3':
                            self.last_action[author] = {'action': 'eventos-informativo', 'timestamp': timestamp}
                    else:
                        self.last_action[author] = {'action': 'false-positive', 'timestamp': timestamp}

    def update_locations(self, locations):
        # Atualiza as últimas localizacoes de cada caminhoneiro
        for key in locations:
            author = key.split('] ')[1].strip().replace(':','')
            timestamp = datetime.strptime(key.split('[')[1].split(']')[0], '%I:%M %p, %m/%d/%Y')

            if author not in self.last_location.keys():
                self.last_location[author] = {'coordinate': None, 'timestamp': datetime(2020, 1, 1)}

            if timestamp > self.last_location[author]['timestamp']:
                self.last_location[author] = {'coordinate': locations[key], 'timestamp': timestamp}

pistao = Pistao()
pistao.run()