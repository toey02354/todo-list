# โจทย์(Up to me) สร้าง ToDo

เว็บสามารถ สร้าง ลบ แก้ไข และดึงข้่อมูลรายการ ToDo ได้
และสามารถ search ได้

https://fine-plum-colt-robe.cyclic.app/

# Tech Stack

## Front-end

### React Typescript

React เหมาะกับโปรเจคในทุกขนาดและโปรเจคนี้มีขนาดเล็ก  
จึงเลือกใช้ React เพราะสามารถพัฒนาได้ง่ายและเร็ว

## Back-end

### NodeJS ExpressJS

api endpoint ของโปเจคนี้มีไม่มากจึงเลือกใช้ ExpressJS  
เหมาะสำหรับพัฒนาคนเดียว มีขนาดเล็ก และสามารถพัฒนาได้รวดเร็ว

## Database

### MongoDB

เว็บแอพสร้างรายการ ToDo ไม่ได้จำเป็นต้องสร้าง relationship จึงเลืิอกใช้ NoSQL Database  
MongoDB จึงตอบโจทย์เพราะมีให้ใช้งานได้ฟรีและเครื่องมือมากกว่า NoSQL ตัวอื่น

## Deployment

### Cyclic.sh

เหตุผลที่เลือก Cyclic.sh เพราะสามารถ deploy nodejs ได้ฟรีและ  
สามารถเชื่อมกับ github repo ได้โดยตรง แถมยังมีการ auto deploy เมื่อเรา push code ขึ้นไป github
