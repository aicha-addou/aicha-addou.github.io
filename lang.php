<?php
session_start();

function get_language() {
    // 1. GET
    if (isset($_GET['lang'])) {
        $_SESSION['lang'] = $_GET['lang'];
        return $_GET['lang'];
    }
    // 2. POST
    if (isset($_POST['lang'])) {
        $_SESSION['lang'] = $_POST['lang'];
        return $_POST['lang'];
    }
    // 3. SESSION
    if (isset($_SESSION['lang'])) {
        return $_SESSION['lang'];
    }
    // 4. HTTP_ACCEPT_LANGUAGE
    if (isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
        $langs = explode(',', $_SERVER['HTTP_ACCEPT_LANGUAGE']);
        foreach ($langs as $l) {
            $lcode = substr($l, 0, 2);
            if (in_array($lcode, ['fr', 'en', 'zh'])) return $lcode;
        }
    }
    // 5. Default
    return 'fr';
}

function get_content($lang) {
    $xml = simplexml_load_file('content.xml') or die('Erreur de lecture du contenu');
    $content = [];
    foreach ($xml->block as $block) {
        $id = (string) $block['id'];
        foreach ($block->text as $t) {
            if ((string)$t['lang'] === $lang) {
                $content[$id] = (string)$t;
            }
        }
    }
    return $content;
}
?>
