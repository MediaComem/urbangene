<?php
    $allowedExts = array("gif", "jpeg", "jpg", "png");
    $temp = explode(".", $_FILES["file"]["name"]);
    $extension = end($temp);
    if ((($_FILES["file"]["type"] == "image/jpeg")
        || ($_FILES["file"]["type"] == "image/jpg")
        || ($_FILES["file"]["type"] == "image/gif")
        || ($_FILES["file"]["type"] == "image/pjpeg")
        || ($_FILES["file"]["type"] == "image/x-png")
        || ($_FILES["file"]["type"] == "image/png"))
        && ($_FILES["file"]["size"] < 200000)
        && in_array($extension, $allowedExts))
        {
                if ($_FILES["file"]["error"] > 0)
                {
                    echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
                }
                else
                {
                    //echo "debug";

                    $imageData = $_FILES["file"];

                    $timestamp = date('Y-m-d-G-i-s-u');

                    //Y = Year
                    //m = month
                    //d = day
                    //G = heure au format 24h
                    //i = minutes avec les zéros initiaux
                    //s = secondes avec les zéros initiaux
                    //u = micro secondes
                    // Génère un nom unique pour l'image comprenant la date 
                    $file = 'uploads/' . $timestamp .'__'. md5(date('YmdGisu')) . $extension;
                    $url = $file;

                    move_uploaded_file($imageData["tmp_name"], $file);

                    $img = str_replace("uploads/", "", $file);
                }
        }
        else
        {
            echo "Invalid file";
        }
?>