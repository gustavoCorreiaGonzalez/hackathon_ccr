from selenium import webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.chrome.options import Options
import random
import time

class WhatsappAPI:
    def __init__(self):
        # Instancia uma instancia da API para Whatsapp
        # Devido a nao disponibilizacao de uma API pública por parte do Facebook
        # Nós utilizamos Selenium para gerar criar nossa própria Whatsapp API.
        chrome_options = Options()
        chrome_options.add_argument("user-data-dir=selenium")
        self.browser = webdriver.Chrome(ChromeDriverManager().install(), chrome_options=chrome_options)
        self.browser.get("https://web.whatsapp.com")
        time.sleep(5)

    def select_contact(self, contact_name):
        # Seleciona um contato específico na lista de contatos
        # contact_name: Nome do contato
        user = self.browser.find_element_by_xpath('//span[@title="{}"]'.format(contact_name))
        user.click()

    def get_contacts(self):
        # Lista todos os contatos disponíveis no Whatsapp
        # Retorna uma lista tipo string contendo contatos
        contacts = []

        for contact_box in self.browser.find_elements_by_css_selector('._357i8'):
            contacts.append(contact_box.text)

        return contacts
 
    def get_text_messages(self, contact_name):
        # Le todas as mensagens em uma conversa
        # contact_name: Nome do contato
        # Retorna uma lista tipo string contendo mensagens
        messages = {}
        message_counter = 1

        for message_box in self.reverse(self.browser.find_elements_by_xpath('//div[@class="_274yw"]')):
            try:
                message = message_box.find_element_by_xpath('.//div[@class="_11PeL copyable-text"]')
                datetime_and_user = message.get_attribute("data-pre-plain-text")
                text = message.find_element_by_xpath('.//div[@class="eRacY"]').text
                messages[str(message_counter) + ' ' + datetime_and_user ] = text
                message_counter = message_counter + 1
            except NoSuchElementException:
                pass
            try:
                message = message_box.find_element_by_xpath('.//div[@class="copyable-text"]')
                datetime_and_user = message.get_attribute("data-pre-plain-text")
                text = message.find_element_by_xpath('.//div[@class="eRacY"]').text
                messages[str(message_counter) + ' ' + datetime_and_user] = text
                message_counter = message_counter + 1
            except NoSuchElementException:
                pass

        return messages

    def get_location_messages(self, contact_name):
        # Le todas as localizacoes enviadas em uma conversa
        # contact_name: Nome do contato
        # Retorna uma lista tipo string contendo coordenadas 
        locations = {}
        location_counter = 1

        try: # Live
            for location_box in self.reverse(self.browser.find_elements_by_xpath('//div[@class="_e0cu _1F1_W copyable-text"]')):
                datetime_and_user = location_box.get_attribute("data-pre-plain-text")
                coordinates = location_box.find_element_by_xpath('.//img[@class="_9OGCm _3Whw5"]').get_attribute("src")
                locations[str(location_counter)  + ' ' +  datetime_and_user] = coordinates
                location_counter = location_counter + 1
        except NoSuchElementException:
            pass
        try: # Static
            for location_box in self.reverse(self.browser.find_elements_by_xpath('//div[@class="_1Yj6K copyable-text"]')):
                datetime_and_user = location_box.get_attribute("data-pre-plain-text")
                coordinates = location_box.find_element_by_xpath('.//img[@class="_16lK4 _3Whw5"]').get_attribute("src")
                locations[str(location_counter)  + ' ' +  datetime_and_user] = coordinates
                location_counter = location_counter + 1
        except NoSuchElementException:
            pass

        return locations
    
    def send_text_message(self, message):
        # Envia uma mensagem de texto
        # message: String representando a mensagem a ser enviada
        text_field = self.browser.find_element_by_xpath('//div[@class="_3uMse"]')

        # Multiple lines
        if type(message) is list:
            for line in message:
                text_field.send_keys(line)
                ActionChains(self.browser).key_down(Keys.SHIFT).key_down(Keys.ENTER).key_up(Keys.SHIFT).key_up(Keys.ENTER).perform()
            text_button = self.browser.find_element_by_xpath('//button[@class="_1U1xa"]')
            text_button.click()

        # Single line
        if type(message) is str:
            text_field.send_keys(message)
            text_button = self.browser.find_element_by_xpath('//button[@class="_1U1xa"]')
            text_button.click()

    def send_url(self, message):
        # Envia uma mensagem de texto
        # message: String representando a URL a ser enviada
        text_field = self.browser.find_element_by_xpath('//div[@class="_3uMse"]')
        text_field.send_keys(message)
        time.sleep(5)
        text_button = self.browser.find_element_by_xpath('//button[@class="_1U1xa"]')
        text_button.click()

    def reverse(self, l):
        return l[::-1] if len(l) > 0 else []
