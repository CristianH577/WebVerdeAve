<?php

class Controller
{

    public function __construct()
    {}

    public function echo ($answer)
    {
        echo json_encode($answer);
    }

    public function loadModel($model)
    {
        $url = 'models/' . $model . 'model.php';

        if (file_exists($url)) {
            require_once $url;

            $modelName = $model . 'Model';
            $this->model = new $modelName();
        }
    }

    public function existPOST($params)
    {
        foreach ($params as $param) {
            if (!isset($_POST[$param])) {
                error_log("CONTROLLER::existPost -> The parameter does not exist: $param");
                return false;
            }
        }

        return true;
    }

    public function existGET($params)
    {
        foreach ($params as $param) {
            if (!isset($_GET[$param])) {
                error_log("CONTROLLER::existGet -> The parameter does not exist: $param");
                return false;
            }
        }

        return true;
    }

    public function getPost($name)
    {
        return $_POST[$name];
    }

    public function getGet($name)
    {
        return $_GET[$name];
    }

}
