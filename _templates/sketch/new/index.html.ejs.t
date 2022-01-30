---
to: sketches/<%= name %>/index.html
---
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%= name %></title>
    <link rel="stylesheet" href="https://unpkg.com/sanitize.css" />
    <script src="https://cdn.jsdelivr.net/npm/p5@latest/lib/p5.js"></script>
  </head>
  <body>
    <script type="module" src="./sketch.js"></script>
  </body>
</html>
