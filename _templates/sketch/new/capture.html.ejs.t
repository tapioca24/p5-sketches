---
to: src/<%= name %>/capture.html
---
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%= name %></title>
    <link rel="stylesheet" href="https://unpkg.com/sanitize.css@13.0.0" />
    <script src="https://cdn.jsdelivr.net/npm/p5@1.4.1"></script>
    <script src="https://cdn.jsdelivr.net/npm/easings.js@0.3.0"></script>
    <script src="https://cdn.jsdelivr.net/npm/p5.capture"></script>
    <script>
      P5Capture.setDefaultOptions({
        format: "mp4",
        bitrate: 10000,
        disableScaling: true,
      });
    </script>
  </head>
  <body>
    <script src="../functions.js"></script>
    <script src="./sketch.js"></script>
  </body>
</html>
