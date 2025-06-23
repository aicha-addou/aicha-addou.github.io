<?php
// index.php
require_once 'lang.php';
$lang = get_language();
$content = get_content($lang);
?>

<!DOCTYPE html>
<html lang="<?= htmlspecialchars($lang) ?>">
<head>
    <meta charset="UTF-8">
    <title><?= $content['title'] ?></title>
    <link rel="stylesheet" href="style.css">
    <link rel="alternate" href="?lang=fr" hreflang="fr" />
    <link rel="alternate" href="?lang=en" hreflang="en" />
    <link rel="alternate" href="?lang=zh" hreflang="zh" />
    <meta property="dc:creator" content="Jean Dupont" />
    <meta property="dc:language" content="<?= htmlspecialchars($lang) ?>" />
</head>
<body>
    <div class="lang-switch">
        <a href="?lang=fr">🇫🇷</a>
        <a href="?lang=en">🇬🇧</a>
        <a href="?lang=zh">🇨🇳</a>
    </div>

    <h1><?= $content['header'] ?></h1>
    <p><?= $content['description'] ?></p>

    <iframe src="video/video.html" width="560" height="315"></iframe>
</body>
</html>
