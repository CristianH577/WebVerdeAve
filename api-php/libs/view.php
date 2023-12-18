<?php

class View
{

    public function __construct()
    {}

    public function render($lenguage, $page, $route, $data = [])
    {

        $this->lenguage = $lenguage;
        $this->page = $page;
        $this->d = $data;

        $this->handleMessages();

        require 'views/' . $route . '.php';
    }

    private function handleMessages()
    {
        if (isset($_GET['success']) && isset($_GET['error'])) {
        } else if (isset($_GET['success'])) {
            $this->handleSuccess();
        } else if (isset($_GET['error'])) {
            $this->handleError();
        }
    }

    private function handleError()
    {
        $hash = $_GET['error'];
        $error = new ErrorsMessages();

        if ($error->existKey($this->lenguage, $hash)) {
            $this->d['error'] = $error->get($this->lenguage, $hash);
        }
    }

    private function handleSuccess()
    {
        $hash = $_GET['success'];
        $success = new SuccessMessages();

        if ($success->existKey($this->lenguage, $hash)) {
            $this->d['success'] = $success->get($this->lenguage, $hash);
        }
    }

    public function showMessages()
    {
        $this->showErrors();
        $this->showSuccess();
    }

    public function showErrors()
    {
        if (array_key_exists('error', $this->d)) {
            echo '<p>' . $this->d['error'] . '</p>';
        }
    }

    public function showSuccess()
    {
        if (array_key_exists('success', $this->d)) {
            echo '<p>' . $this->d['success'] . '</p>';
        }
    }
}
