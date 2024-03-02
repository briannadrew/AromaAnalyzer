from flask import Flask, jsonify, request
from flask_cors import CORS
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import re
import cssutils

LIKES_CATS = ['love', 'like', 'ok', 'dislike', 'hate'] 
SEASON_CATS = ['winter', 'spring', 'summer', 'fall']
DAY_NIGHT = ['day', 'night']
LONG_CATS = ['very weak', 'weak', 'moderate', 'long lasting', 'eternal']
SILLAGE_CATS = ['intimate', 'moderate', 'strong', 'enormous']
VALUE_CATS = ['way overpriced', 'overpriced', 'ok', 'good value', 'great value']
SEX_CATS = ['female', 'more female', 'unisex', 'more male', 'male']

app = Flask(__name__)
cors = CORS(app)

# SETUP WEB DRIVER (used to get html generated from javascript)
chrome_options = Options()
chrome_options.add_argument("--ignore-ssl-errors=yes")
chrome_options.add_argument("--ignore-certificate-errors")
chrome_options.add_argument("--incognito")
chrome_options.add_argument("--headless")
agent = "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36"
chrome_options.add_argument(f"--user-agent={agent}")

def get_page(query):
    # DO A GOOGLE SEARCH FOR THE GIVEN PERFUME AND EXTRACT LINK FROM FIRST RESULT
    driver = webdriver.Chrome(options=chrome_options)
    query = query.replace(' ', '+')
    driver.get(f"https://www.google.com/search?q=site:fragrantica.com+{query}")
    first_result = driver.find_element(By.CSS_SELECTOR, 'div#main > div:nth-child(4) > div > div > a')
    first_result_link = first_result.get_attribute("href")
    link = re.search(r"(?<=url=).*?\.html", first_result_link).group(0)
    driver.quit()
    return link

# CONVERT RGB STRINGS TO THEIR HEX STRINGS
def rgb_to_hex(rgb):
    rgb_components = rgb[4:-1].split(', ')
    r, g, b, = map(int, rgb_components)
    hex_colour = "#{:02x}{:02x}{:02x}".format(r, g, b)
    return hex_colour

def web_scrape(url):
    # RETRIEVE DYNAMIC HTML FROM GIVEN LINK AND PARSE
    driver = webdriver.Chrome(options=chrome_options)
    driver.get(url)
    soup = BeautifulSoup(driver.page_source, "html.parser")

    # GET PERFUME IMAGE LINK
    imgs = soup.find_all('img')[2:3]
    img_el = imgs[0]
    img = img_el['src']

    # GET RATING DATA
    rating_box = soup.find(class_ = 'info-note')
    rating_spans = rating_box.find_all('span')
    rating_info = [r.text for r in rating_spans]
    rating_info = list(map(lambda x: float(x.replace(',', '')), rating_info))

    # GET ACCORD NAMES, PERCENTAGES, AND COLOURS
    accords = []
    accord_vals = []
    accord_rgb = []
    accord_hex = []
    for acc in soup.find_all(class_ = 'accord-bar'):
        accords.append(acc.text)
        acc_style = acc['style']
        acc_style_p = cssutils.parseStyle(acc_style)
        accord_vals.append(acc_style_p.width.rstrip('%'))
        accord_rgb.append(acc_style_p.background)
    for rgb in accord_rgb:
        accord_hex.append(rgb_to_hex(rgb))
    accord_vals = list(map(lambda x: float(x.replace(',', '')), accord_vals))

    # GET VOTE PERCENTAGE FOR LIKES & SEASONS
    likes_seasons = []
    for element in soup.find_all(class_ = 'voting-small-chart-size'):
        div1 = element.find('div')
        div2 = div1.find('div')
        likes_style = div2['style']
        likes_style_p = cssutils.parseStyle(likes_style)
        likes_seasons.append(likes_style_p.width.rstrip('%'))
    del likes_seasons[:3]
    likes = list(map(lambda x: float(x.replace(',', '')), likes_seasons[:5]))
    seasons = list(map(lambda x: float(x.replace(',', '')), likes_seasons[5:9]))
    tod = list(map(lambda x: float(x.replace(',', '')), likes_seasons[9:]))

    # GET VOTES FOR LONGEVITY, SILLAGE, GENDER, AND PRICE VALUE
    votes = soup.find_all('progress')
    vote_vals = [v['value'] for v in votes]
    longevity = list(map(lambda x: float(x.replace(',', '')), vote_vals[:5]))
    sillage = list(map(lambda x: float(x.replace(',', '')), vote_vals[5:9]))
    sex = list(map(lambda x: float(x.replace(',', '')), vote_vals[9:14]))
    priceval = list(map(lambda x: float(x.replace(',', '')), vote_vals[14:]))

    driver.quit()

    return jsonify({'img': img, 'ratinginfo': rating_info, 'accords': 
                    accords, 'accordwidths': accord_vals, 'accordhex': accord_hex,
                      'likecats': LIKES_CATS, 'seasoncats': SEASON_CATS, 'daynight': 
                      DAY_NIGHT, 'longcats': LONG_CATS, 'sillagecats': SILLAGE_CATS, 
                      'valuecats': VALUE_CATS, 'sexcats': SEX_CATS, 'likes': likes, 
                      'seasons': seasons, 'tod': tod, 'longevity': longevity, 'sillage':
                        sillage, 'sex': sex, 'priceval': priceval})

@app.route("/req", methods = ['POST'])
def return_json():
    if(request.method == 'POST'):
        query = request.json['search']
        url = get_page(query)
        return web_scrape(url)

if __name__ == "__main__":
    app.run(debug=True)
