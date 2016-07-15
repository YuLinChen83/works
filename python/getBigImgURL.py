# -*- coding: utf-8 -*-
import requests

from bs4 import BeautifulSoup
headers = {
	'host': 'pagead2.googlesyndication.com',
	'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:38.0) Gecko/20100101 Firefox/38.0',
	'Accept':'image/png,image/*;q=0.8,*/*;q=0.5',
	'Accept-Language':'zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3',
	'Accept-Encoding':'gzip, deflate',
	'Referer':'https://googleads.g.doubleclick.net/pagead/ads?client=ca-pub-0169974514217549&output=html&h=250&slotname=4228830199&adk=18784099&w=300&lmt=1433002836&host=ca-host-pub-7475939466736018&h_ch=1784728551&flash=17.0.0&url=http%3A%2F%2Fwww.olgame.tw%2Fms%2Fitem.php%3Fview%3Dmonster%26monster_id%3D1&dt=1433002836521&bpp=8&bdt=1702&shv=r20150526&cbv=r20150521&saldr=sa&prev_fmts=728x90_as%2C728x90_as&prev_slotnames=4228830199&correlator=2229075084560&pv_h_ch=1784728551&frm=20&ga_vid=2095978089.1432875769&ga_sid=1433002836&ga_hid=1106951015&ga_fc=0&u_tz=480&u_his=2&u_java=0&u_h=768&u_w=1366&u_ah=674&u_aw=1366&u_cd=24&u_nplug=3&u_nmime=41&dff=%EF%BF%BDs%EF%BF%BD%D3%A9%EF%BF%BD%EF%BF%BD%EF%BF%BD&dfs=15&adx=914&ady=755&biw=1366&bih=572&eid=575144604%2C317150304&oid=3&rx=0&eae=0&fc=24&brdim=%2C%2C0%2C23%2C1366%2C23%2C1366%2C674%2C1366%2C572&vis=1&rsz=%7C%7C%7C&abl=CS&ppjl=t&fu=16&bc=1&ifi=4&xpc=lAH5sKUY8R&p=http%3A//www.olgame.tw&dtd=97',
	'Cookie':'OAID=ff9c93f9f0ad13c52bd62e51430462e6; OAGEO=TW%7C%7C%7C%7C%7C%7C%7C%7C%7C%7C'
}

imgurl = "http://www.olgame.tw/ms/"
url = "http://www.olgame.tw/ms/item.php?view=monster&monster_id="


for i in range(1101,1100):
  response = requests.get(url+str(i)).text
  soup = BeautifulSoup(response)
  monsterimg = soup.select("#myTab1_Content0")[0].img.attrs["src"]
  print imgurl+monsterimg,
  print i


