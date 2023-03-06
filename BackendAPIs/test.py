import requests

x = requests.get('http://20.22.198.215:5000/check_steps')
print(x.status_code)
print(x.text)

url = 'http://20.22.198.215:5000/upload_video'
files = {'file': open('a83571949d6711ed8e6cd5076ba9ed76_14_14_14_20-21_c204435e9fc711edb4e079bd755ec901_clip_1_2023-02-12T203002_23.78sec.mkv', 'rb')}
getdata = requests.post(url, files=files)
print(getdata.text)

