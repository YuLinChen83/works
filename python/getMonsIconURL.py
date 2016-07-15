import requests
from bs4 import BeautifulSoup
imgurl = "http://www.olgame.tw/ms/"
homeurl ="http://www.olgame.tw/ms/index.php?view=monster"
response = requests.get(homeurl).text
soup = BeautifulSoup(response)
monsterimg = soup.select("#monster_img")
for obj in monsterimg:
  print "http://www.olgame.tw/ms/"+obj.img.attrs['src']