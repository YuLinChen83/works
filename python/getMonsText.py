#import request
#-*- coding: utf-8 -*-
import time
import json
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

text_file = open("mons2.txt", "a")

def monster_data(url,id):
	response = urllib2.urlopen(url)
	html = response.read()
	soup = BeautifulSoup(html)
	monsterimg = "http://www.olgame.tw/ms/" + soup.select("#myTab1_Content0")[0].img.attrs["src"]
	#downloadImage(monsterimg,id)
	count = 1
	for k in soup.find_all('td',{'align':'center'}):
		#print(count),
		if count==2:
			d = k.text.strip().strip('收藏進個人背包'.decode('utf-8'))
			d2 = d.split(" ")
			d = d2[0] + " " + d2[1]

		elif count==9:
			d2 = k.text.strip().split(" ")
			d = d2[0]
			if d2[0]!=d2[len(d2)-1]:
				d += "/" + d2[len(d2)-1]

		elif count==22 or count==23:
			d2 = k.text.strip().split(" ")
			d = "+" + d2[len(d2)-1]

		else:
			d = k.text.strip()

		print(d)

		text_file.write(d.encode('utf-8')+",")
		count += 1
	print()
	text_file.write('\n')




def downloadImage(url,id):
	timeout = 5
	request = urllib2.Request(url,None,headers)
	response = urllib2.urlopen(request,None,timeout)
	img = response.read()
	foo = open("images/big/" + id + ".png","wb")
	foo.write(img)
	foo.close()

response = urllib2.urlopen('http://www.olgame.tw/ms/index.php?view=monster&page=14')
html = response.read()
soup = BeautifulSoup(html)
for k in soup.find_all('div',{'id': 'monster_id'}):
	n = k.text.strip().strip('NO.')
	print(n+" "),
	text_file.write(n+" ")
	link = "http://www.olgame.tw/ms/" + k.a['href']
	#print(link)
	monster_data(link,n)
	imgUrl = "http://www.olgame.tw/ms/" + k.img['src']
	#print(imgUrl)
	#downloadImage(imgUrl,n)