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
    <script src="https://cdn.jsdelivr.net/npm/bowser@2.11.0"></script>
    <script src="https://cdn.jsdelivr.net/npm/p5.save-frames@2.0.0"></script>
    <script>
      P5_SAVE_FRAMES_MODE = "sync";
      P5_SAVE_FRAMES_OVERRIDE_FRAMERATE = true;
      P5_SAVE_FRAMES_FRAMERATE = 10;
    </script>
  </head>
  <body>
    <script src="./sketch.js"></script>
  </body>
</html>
