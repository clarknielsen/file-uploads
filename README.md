## Node File Uploads

---

Small Node/Express app that uses file upload middleware to capture image uploads, then saves them in a MySQL database as blobs. `/images` route pulls everything from database, converts the blobs to base64 strings, and plugs them into HTML image tags.

Home route uses an HTML form to send file to server. `/ajax-text` route sends the image via an Ajax (axios) request.