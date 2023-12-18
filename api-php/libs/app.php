<?php

class App
{
    public function __construct()
    {
        $lenguage = "es";

        if (isset($_GET['url']) && $_GET['url'] != null) {
            $url0 = $_GET['url'];
            $url = rtrim($url0, '/');
            $url = explode('/', $url0);
        }
        error_log('APP::construct-> ' . $url[0]);

        if (empty($url[0])) {
            error_log('APP::construct-> lenguaje no especificado');
        } else {
            $lenguage = $url[0];
        }

        if (empty($url[1])) {
            error_log('APP::construct-> no hay controlador espeficico');
            $archivoController = 'controllers/home.php';
            require_once $archivoController;
            $controller = new Home();
            $controller->loadModel('home');
            $controller->setData($lenguage, 'home');
            $controller->render();
            return false;
        } else {
            error_log('APP::construct-> Controlador: ' . $url[1]);
            $archivoController = 'controllers/' . $url[1] . '.php';
        }

        if (file_exists($archivoController)) {

            require_once $archivoController;

            $controller = new $url[1];
            $controller->loadModel($url[1]);
            $controller->setData($lenguage, $url[1]);

            $nparam = sizeof($url);

            if ($nparam > 2) {
                if ($nparam > 3) {

                    $param = [];
                    for ($i = 3; $i < $nparam; $i++) {
                        array_push($param, $url[$i]);
                    }

                    if (method_exists($controller, $url[2])) {
                        $controller->{$url[2]}($param);
                    } else {
                        $answer['error'] = "method";
                        echo json_encode($answer);
                        return false;
                    }
                } else {

                    if (method_exists($controller, $url[2])) {
                        $controller->{$url[2]}();
                    } else {
                        $answer['error'] = "method";
                        echo json_encode($answer);
                        return false;
                    }

                }
            } else {
                $controller->render();
            }
        } else {
            $answer['error'] = "controller";
            echo json_encode($answer);
            return false;
        }
    }

}
