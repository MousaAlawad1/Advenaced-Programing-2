# Lab Report
# 1 : Important Commands :
- pwd
- ls
- ls -la
- cd
- mkdir
- cp
- mv
- rm
- cat
- head -n
- tail -n
- grep
- printf
- wc
- echo
- source
- ecport
- cat
- cut
# 2 : Git Commands :
- git init  
- git add .  
- git commit -m "..."  
- git log --oneline  
- ./scripts/report.sh

# 3 <p align="center"><strong>Result Excuting Command ```git log --online``` </strong></p>
![photo](https://raw.githubusercontent.com/MousaAlawad1/MyUniWorks/refs/heads/master/Lab-Report/scr1.png)

# 4 : Short Assessment Questions
1. **ما الفرق بين `>` و `>>` و `&>`؟**  
   - `>` : يعيد توجيه **المخرجات القياسية** (stdout) إلى ملف، مع **كتابة جديدة** (overwrite).  
   - `>>` : يعيد توجيه المخرجات القياسية إلى ملف، مع **إلحاق المحتوى** (append).  
   - `&>` : يعيد توجيه **المخرجات القياسية + رسائل الخطأ** (stdout + stderr) إلى ملف.

2. **متى نستخدم `source` بدل `./script.sh`؟**  
   - نستخدم `source script.sh` لتشغيل السكريبت **في نفس الجلسة** (shell الحالي)، بحيث تبقى **المتغيرات والوظائف معرفة بعد التنفيذ**.  
   - بينما `./script.sh` يشغل السكريبت في **عملية جديدة** (subshell)، وتفقد المتغيرات بعد انتهاء التنفيذ.

3. **ما الفرق بين `&&` و `||`؟**  
   - `&&` : ينفذ الأمر الثاني **فقط إذا نجح الأول**.  
   - `||` : ينفذ الأمر الثاني **فقط إذا فشل الأول**.

4. **لماذا نستخدم الفروع في Git؟**  
   - للفصل بين **التطوير والتجارب** دون التأثير على النسخة المستقرة.  
   - لتسهيل العمل الجماعي، ومراجعة التعديلات، وتجربة ميزات جديدة بأمان.

5. **ما وظيفة `ssh-agent`؟**  
   - إدارة مفاتيح SSH الخاصة بالمستخدم.  
   - يسمح بالتخزين المؤقت لكلمات المرور للمفاتيح لتجنب إدخالها كل مرة عند الاتصال بالخوادم.
