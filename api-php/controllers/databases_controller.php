<?php
require_once 'models/table1-model.php';
require_once 'models/table2-model.php';
require_once 'models/table3-model.php';

class Databases_Controller extends Controller
{

    public function __construct()
    {
        parent::__construct();
        error_log('DatabasesController::construct -> start');
    }

    public function render()
    {
        error_log('DatabasesController::render -> index');
    }

    public function setData($lenguage, $page)
    {
        error_log('DatabasesController::setData -> executed');

        $this->lenguage = $lenguage;
        $this->page = $page;
        $this->route = $lenguage . "/" . $page;
    }

    public function addRow()
    {
        error_log("DatabasesController::addRow -> Ejecuta");
        $answer = [];

        $check = ['table'];

        if ($this->existPOST($check)) {
            $table = $this->getPost('table');

            if ($table == '1') {
                $model = new Table1Model();
            } else if ($table == '2') {
                $model = new Table2Model();
            } else if ($table == '3') {
                $model = new Table3Model();
            } else {
                $answer['error'] = "table";
            }

            if ($model) {
                foreach ($_POST as $key => $value) {
                    $model->Set($key, $value);
                }

                $add = $model->ModelAdd();

                if ($add) {
                    $answer['answer'] = 'added';
                } else {
                    $answer['error'] = "database_modify";
                }
            } else {
                $answer['error'] = "database";
            }

        } else {
            $answer['error'] = "form";
        }

        $this->echo($answer);
    }

    public function getRows()
    {
        error_log("DatabasesController::getRows -> Ejecuta");
        $answer = [];

        $check = ['table', 'idUser'];

        if ($this->existGET($check)) {
            $table = $this->getGet('table');
            $idUser = $this->getGet('idUser');

            $select = "*";
            if ($this->existGET(['select'])) {
                $select = $this->getGet('select');
            }

            if ($table == '1') {
                $model = new Table1Model();
            } else if ($table == '2') {
                $model = new Table2Model();
            } else if ($table == '3') {
                $model = new Table3Model();
            } else {
                $answer['error'] = "table";
            }

            if ($model) {
                $model->Set('idUser', $idUser);
                $select = $model->ModelSelect($select);

                if ($select || $select == []) {
                    $answer['answer'] = $select;
                } else {
                    $answer['error'] = "database_consult";
                }
            } else {
                $answer['error'] = "database";
            }

        } else {
            $answer['error'] = "form";
        }

        $this->echo($answer);
    }

    public function deleteRow()
    {
        error_log("DatabasesController::deleteRow -> Ejecuta");
        $answer = [];

        $check = ['table', 'id'];

        if ($this->existGET($check)) {
            $table = $this->getGet('table');
            $id = $this->getGet('id');

            if ($table == '1') {
                $model = new Table1Model();
            } else if ($table == '2') {
                $model = new Table2Model();
            } else if ($table == '3') {
                $model = new Table3Model();
            } else {
                $answer['error'] = "table";
            }

            if ($model) {
                $model->Set('id_' . $table, $id);
                $delete = $model->ModalDelete();

                if ($delete) {
                    $answer['answer'] = 'deleted';
                } else {
                    $answer['error'] = "database_modify";
                }
            } else {
                $answer['error'] = "database";
            }

        } else {
            $answer['error'] = "form";
        }

        $this->echo($answer);
    }

    public function updateRow()
    {
        error_log("DatabasesController::updateRow -> Ejecuta");
        $answer = [];

        $check = ['table'];

        if ($this->existPOST($check)) {
            $table = $this->getPost('table');

            if ($table == '1') {
                $model = new Table1Model();
            } else if ($table == '2') {
                $model = new Table2Model();
            } else if ($table == '3') {
                $model = new Table3Model();
            } else {
                $answer['error'] = "table";
            }

            if ($model) {
                foreach ($_POST as $key => $value) {
                    $model->Set($key, $value);
                }

                $update = $model->ModelUpdate();

                if ($update) {
                    $answer['answer'] = 'updated';
                } else {
                    $answer['error'] = "database_consult";
                }
            } else {
                $answer['error'] = "database";
            }

        } else {
            $answer['error'] = "form";
        }

        $this->echo($answer);
    }

    public function validateIdUser()
    {
        error_log("DatabasesController::validateIdUser -> Ejecuta");
        $answer = [];

        $check = ['idUser'];

        if ($this->existGET($check)) {
            $idUser = $this->getGet('idUser');
            error_log("DatabasesController::validateIdUser -> idUser $idUser");

            $models = [
                1 => new Table1Model(),
                2 => new Table2Model(),
                3 => new Table3Model(),
            ];

            $bool = false;
            $error = false;
            for ($i = 1; $i < 4; $i++) {
                $model = $models[$i];
                $model->Set('idUser', $idUser);
                $count = $model->ModelCount("*");

                if ($count) {
                    error_log("DatabasesController::validateIdUser -> Existe el ID");
                    $bool = true;
                    break;
                } else if ($count === 0) {
                    error_log("DatabasesController::validateIdUser -> No existe el ID");

                } else {
                    $error = true;
                    break;
                }
            }

            if ($error) {
                $answer['error'] = "database_consult";
            } else {
                $answer['answer'] = $bool;
            }

        } else {
            $answer['error'] = "form";
        }

        $this->echo($answer);
    }

    public function deleteUser()
    {
        error_log("DatabasesController::deleteUser -> Ejecuta");
        $answer = [];

        $check = ['idUser'];

        if ($this->existGET($check)) {
            $idUser = $this->getGet('idUser');
            error_log("DatabasesController::deleteUser -> idUser $idUser");

            $models = [
                1 => new Table1Model(),
                2 => new Table2Model(),
                3 => new Table3Model(),
            ];

            for ($i = 1; $i < 4; $i++) {
                $model = $models[$i];
                $model->Set('idUser', $idUser);
                $delete = $model->ModalDelete();
            }

        } else {
            $answer['error'] = "form";
        }

    }

}
