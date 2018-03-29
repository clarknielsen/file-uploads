## Node File Uploads

---

Small Node/Express app that uses file upload middleware to capture image uploads, then saves them in a MySQL database as blobs. `/images` route pulls everything from database, converts the blobs to base64 strings, and plugs them into HTML image tags.