from selenium import webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.chrome.options import Options
import time
import random

class WhatsappBot:
    def __init__(self):
        chrome_options = Options()
        chrome_options.add_argument("user-data-dir=selenium")
        self.browser = webdriver.Chrome(ChromeDriverManager().install(), chrome_options=chrome_options)
        self.browser.get("https://web.whatsapp.com")
        time.sleep(5)

    def select_contact(self, contact_name):
        user = self.browser.find_element_by_xpath('//span[@title="{}"]'.format(contact_name))
        user.click()

    def get_contacts(self):
        contacts = []

        for contact_box in self.browser.find_elements_by_css_selector('._357i8'):
            name = contact_box.find_elements_by_css_selector('._3ko75._5h6Y_._3Whw5')
            contacts.append(name.text)

        return contacts
 
    def get_text_messages(self, contact_name):
        self.browser.refresh()
        time.sleep(5)
        self.select_contact(contact_name)
        messages = {}
        message_counter = 1

        for message_box in self.browser.find_elements_by_xpath('//div[@class="_274yw"]'):
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
        self.browser.refresh()
        time.sleep(5)
        self.select_contact(contact_name)
        locations = {}
        location_counter = 1

        try: # Live
            for location_box in self.browser.find_elements_by_xpath('//div[@class="_e0cu _1F1_W copyable-text"]'):
                datetime_and_user = location_box.get_attribute("data-pre-plain-text")
                coordinates = location_box.find_element_by_xpath('.//img[@class="_9OGCm _3Whw5"]').get_attribute("src")
                locations[str(location_counter)  + ' ' +  datetime_and_user] = coordinates
                location_counter = location_counter + 1
        except NoSuchElementException:
            pass
        try: # Static
            for location_box in self.browser.find_elements_by_xpath('//div[@class="_1Yj6K copyable-text"]'):
                datetime_and_user = location_box.get_attribute("data-pre-plain-text")
                coordinates = location_box.find_element_by_xpath('.//img[@class="_16lK4 _3Whw5"]').get_attribute("src")
                locations[str(location_counter)  + ' ' +  datetime_and_user] = coordinates
                location_counter = location_counter + 1
        except NoSuchElementException:
            pass

        return locations
    
    def send_text_message(self, contact_name, message):
        self.select_contact(contact_name)
        time.sleep(random.randint(5, 15))

        text_field = self.browser.find_element_by_xpath('//div[@class="_3uMse"]')
        text_field.send_keys(message)
        text_button = self.browser.find_element_by_xpath('//button[@class="_1U1xa"]')
        text_button.click()

    def send_url(self, contact_name, message):
        self.select_contact(contact_name)
        time.sleep(random.randint(5, 15))

        text_field = self.browser.find_element_by_xpath('//div[@class="_3uMse"]')
        text_field.send_keys(message)
        time.sleep(5)
        text_button = self.browser.find_element_by_xpath('//button[@class="_1U1xa"]')
        text_button.click()
    
bot = WhatsappBot()

print(len(bot.get_contacts()))
for contact in bot.get_contacts():
    print(contact)
