#-*- coding:utf8 -*-  
import requests
import time
import string
import urllib,urllib2
from bs4 import BeautifulSoup

headers = {
	'Host': 'www.olgame.tw',
	'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:34.0) Gecko/20100101 Firefox/34.0',
	'Accept': 'image/webp,*/*;q=0.8',
	'Accept-Language':'zh-TW,zh;q=0.8,en-US;q=0.6,en;q=0.4',
	'Accept-Encoding':'gzip, deflate, sdch',
	'CSP': 'active',
	'Referer': 'https://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Folgame.tw&width=300&height=290&colorscheme=light&show_faces=true&header=true&stream=false&show_border=false&appId=256331671152346'
}

def monster_data(url,id):
		response = urllib2.urlopen(url)
		html = response.read()
		soup = BeautifulSoup(html)
		monsterimg = "http://www.olgame.tw/ms/index.php?view=monster" +soup.select("#monster_img")[0].img.attrs["src"]
		downloadImage(monsterimg,id)

def downloadImage(url,id):
		timeout = 5
		request = urllib2.Request(url,None,headers)
		response = urllib2.urlopen(request,None,timeout)
		a = response.read()
		foo = open("images/small/" + id + ".png","wb")
		foo.write(a)
		foo.close()


response = urllib2.urlopen('http://www.olgame.tw/ms/index.php?view=monster&page=1')
html = response.read()
soup = BeautifulSoup(html)
monsterimg = soup.select("#monster_img")
for obj in monsterimg:
    n = obj.text.strip().strip('NO.')
    link = "http://www.olgame.tw/ms/"+obj.img.attrs['src']
    print(link)
    monster_data(link,n)

