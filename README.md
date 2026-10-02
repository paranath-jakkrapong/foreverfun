# Wedding E-Card · พญ.ปารณัท & นพ.จักรพงษ์ · 19.12.2569

การ์ดเชิญดิจิทัลแบบหน้าเดียวสำหรับมือถือ ธีมชมพูพาสเทล ประกายทอง และเส้นคลื่นหัวใจ (คู่หมอห้องฉุกเฉิน)
เป็น HTML/CSS/JS ล้วน ไม่มีขั้นตอน build — เปิด `index.html` ดูได้เลย

## สิ่งที่ต้องเติมข้อมูล

ทุกจุดที่ยังไม่มีข้อมูลจะแสดงป้ายเส้นประ **"สิ่งที่ต้องเติมข้อมูล · …"** บนหน้าเว็บ
(ค้นหา `class="todo"` ใน `index.html` เพื่อดูทั้งหมด)

| ข้อมูลที่ยังขาด | ไปเติมที่ |
|---|---|
| สถานที่จัดงาน · ลิงก์ Google Maps · QR แผนที่ | `index.html` (ส่วน Date, Invitation, Venue, Footer) |
| ชื่อบิดามารดาทั้งสองฝ่าย · ชื่อ–นามสกุลเต็มของบ่าวสาว | `index.html` (ส่วน Invitation, The Couple) |
| ลำดับพิธีการและเวลา · เวลางานเลี้ยง | `index.html` (ส่วน Schedule) |
| เวลาเริ่มพิธี (ตอนนี้นับถอยหลังถึงเที่ยงคืนวันงาน) | `WEDDING_START` ใน `js/countdown.js` และ `wedding.ics` |
| รูปเดี่ยวของบ่าวสาว | แทนตัวอักษรใน `.person__avatar` ด้วย `<img>` |
| ยืนยันธีมการแต่งกาย | `index.html` (ส่วน Dress Code) |
| ลิงก์และ QR เขียนคำอวยพร | `index.html` (ส่วน Wishes) |
| ยืนยันตัวสะกดภาษาอังกฤษ (ตอนนี้ใช้ Paranath / Jakkrapong, โมโนแกรม P & J) | `index.html` |
| ที่อยู่เว็บจริง → `og:url` / `og:image` | `<head>` ใน `index.html` |

## รูปภาพและหมายเลขรูป

1. ใส่รูปเพิ่มในโฟลเดอร์ `../Picture`
2. รัน `python tools/import_photos.py`

รูปใหม่จะได้หมายเลขถัดไป (001, 002, …) โดยหมายเลขของรูปเดิมไม่เปลี่ยน
ดูว่ารูปไหนคือหมายเลขอะไรได้ที่ **`photo-numbers.html`** (มีภาพประกอบ) หรือ `photo-numbers.csv`
ในอัลบั้มบนหน้าเว็บ ทุกรูปมีป้าย `No. 001` กำกับตรงมุมล่างซ้าย

รูปหน้าเปิดและรูปปกตั้งค่าด้วยมือใน `index.html` (`portal__photo` และ `cover__photo`)

## โครงสร้างไฟล์

```
wedding-invitation/
├── index.html            หน้าการ์ด (เนื้อหาทั้งหมดอยู่ที่นี่)
├── invite-links.html     เครื่องมือสร้างลิงก์ ?to=ชื่อแขก
├── wedding.ics           ไฟล์ "บันทึกลงปฏิทิน" (ทั้งวัน 19 ธ.ค. 2569)
├── photo-numbers.html    ตารางหมายเลขรูป (สร้างโดย import_photos.py)
├── photo-numbers.csv
│
├── css/                  สไตล์ แยกตามส่วนของหน้า (โหลดตามลำดับนี้)
│   ├── base.css          สี ฟอนต์ ปุ่ม กระจก/ออโรรา/ขอบโฮโลแกรม ป้าย .todo ชื่อคู่ + เส้นคลื่นหัวใจ (.duo / .beat)
│   ├── intro.css         ฉากเปิด: พื้นพาสเทล โบเก้ กลิตเตอร์ทอง กรอบรูปซ้อนชั้น ตราวงกลม
│   ├── hero.css          รูปปก · วันที่ · บัตรขูด · นับถอยหลัง
│   ├── sections.css      คำเชิญ · เส้นชีพจรหัวใจ · ลำดับพิธี · บ่าวสาว · Dress code · แผนที่ · อวยพร · ท้ายการ์ด
│   ├── gallery.css       อัลบั้ม · lightbox
│   └── effects.css       แถบเมนูล่าง · toast · แถบความคืบหน้า · กลีบดอก · หัวใจ
│
├── js/                   หนึ่งไฟล์ต่อหนึ่งฟีเจอร์
│   ├── guest.js          ใส่ชื่อแขกจาก ?to=
│   ├── countdown.js      นับถอยหลังแบบพลิก (วันเวลางานตั้งค่าที่หัวไฟล์)
│   ├── scroll.js         เอฟเฟกต์ค่อยๆ ปรากฏ · แถบความคืบหน้า
│   ├── intro.js          ฉากเปิด · โบเก้ · กลิตเตอร์ · กลีบดอก
│   ├── gallery.js        อัลบั้ม · lightbox
│   ├── scratch.js        บัตรขูด
│   ├── effects.js        หัวใจเวลาแตะ
│   └── dock.js           แถบเมนูล่าง · ปุ่มแชร์
│
├── assets/
│   ├── brand/            favicon (หัวใจชมพู)
│   ├── images/           og.jpg ภาพพรีวิวลิงก์
│   └── couple/           รูปที่นำเข้าแล้ว: NNN.jpg และ NNN-s.jpg + photos.json
│
├── design/
│   └── og-template.html  แม่แบบภาพพรีวิวลิงก์ 1200×630
│
└── tools/
    ├── import_photos.py  นำรูปจาก ../Picture เข้าเว็บ + ตั้งหมายเลข
    └── bump-version.sh   ใส่เลขเวอร์ชันให้ CSS/JS กันเบราว์เซอร์จำไฟล์เก่า
```

## แก้ไขบ่อย

| อยากแก้ | ไปที่ |
|---|---|
| ชื่อ ผู้ใหญ่ ลำดับพิธี ข้อความ | `index.html` |
| วันเวลางาน (สำหรับนับถอยหลัง) | `WEDDING_START` / `WEDDING_END` ใน `js/countdown.js` |
| สีธีม | ตัวแปร `:root` ใน `css/base.css` |
| ความเร็วซูมรูปหน้าเปิด / รูปปก | `portalZoom` ใน `css/intro.css` · `coverZoom` ใน `css/hero.css` |
| ข้อความตอนแชร์ | `SHARE_TEXT` ใน `js/dock.js` |

หลังแก้ CSS/JS ให้รัน `sh tools/bump-version.sh` ทุกครั้ง ไม่งั้นเบราว์เซอร์อาจใช้ไฟล์เก่า

## ขึ้นเว็บ (deploy)

Repo: https://github.com/Thonganek/wedding (remote `origin`, branch `main`)

```sh
sh tools/bump-version.sh
git add -A && git commit -m "..." && git push
```

ประวัติ git ของการ์ดต้นแบบ (คู่อื่น) เก็บไว้ในเครื่องที่ branch `template-history` และ remote `old-template` เท่านั้น
**ห้าม push branch นั้นขึ้น repo นี้** เพราะมีรูปและข้อมูลส่วนตัวของคู่เดิม
