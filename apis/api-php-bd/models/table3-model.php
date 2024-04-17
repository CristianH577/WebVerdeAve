<?php

class Table3Model extends Model
{
    private $model = [];
    private $cols = ['id_3', 'col1_3', 'col2_3', 'col3_3', 'col4_3','id_user'];
    private $table = 'table3';

    public function __construct()
    {
        parent::__construct();

        for ($i = 0; $i <= sizeof($this->cols) - 1; $i++) {
            $this->model[$this->cols[$i]] = '';
        }
    }

/*DB Modify*/
/*-------------------- -------------------- --------------------*/
    public function ModelAdd()
    {
        error_log('Table3Model::ModelAdd-> executed');

        $values = "(:" . implode(",:", $this->cols) . ")";

        $add = $this->ADD($this->table, $values, $this->model);

        return $add;
    }

    public function ModalDelete()
    {
        error_log('Table3Model::ModalDelete-> Ejecuto');

        if ($this->model['id_3']) {
            $id = "id_3";
        } 
        else if ($this->model['id_user']) {
            $id = "id_user";
        } 
        else {
            return false;
        }

        $where = $id . " = :" . $id;

        $execute = [
            $id => $this->model[$id],
        ];

        $delete = $this->delete($this->table, $where, $execute);

        return $delete;
    }

    public function ModelUpdate()
    {
        error_log('Table3Model::ModelUpdate-> Ejecuto');

        $cols = ['col1_3', 'col2_3', 'col3_3', 'col4_3'];

        $where = 'id_3 = :id_3';

        $set = "";
        for ($i = 0; $i <= sizeof($cols) - 1; $i++) {
            $set = $set . $cols[$i]."=:".$cols[$i].",";
        }
        $set = rtrim($set,",");

        $execute = [
            'id_3' => $this->model['id_3'],
        ];
        for ($i = 0; $i <= sizeof($cols) - 1; $i++) {
            $execute[$cols[$i]] = $this->model[$cols[$i]];
        }

        $update = $this->UPDATE($this->table, $set, $where, $execute);

        return $update;
    }
/*-------------------- -------------------- --------------------*/

/*DB get*/
/*-------------------- -------------------- --------------------*/
    public function ModelCount($count)
    {
        error_log('Table3Model::ModelCount-> Ejecuto');

        $where = [];
        $execute = [];
        foreach ($this->model as $key => $value) {
            if ($value != '') {
                $where[] = $key . " = :" . $key;
                $execute[$key] = $value;
            }
        }

        $where = implode(" AND ", $where);

        $count = $this->COUNT($count, $this->table, $where, $execute);

        return $count;
    }

    public function ModelSelect($select)
    {
        error_log('Table3Model::Select-> Ejecuto');

        $same = [];
        $like = [];

        $where = [];
        $execute = [];
        foreach ($this->model as $key => $value) {
            if ($value != '') {
                if (in_array($key, $same)) {
                    $where[] = $key . " = :" . $key;
                    $execute[$key] = $value;
                } else if (in_array($key, $like)) {
                    $where[] = $key . " LIKE :" . $key;
                    $execute[$key] = "%" . $value . "%";
                }
            }
        }

        $where = implode(" AND ", $where);

        $select = $this->SELECT($select, $this->table, $where, $execute);

        return $select;
    }

/*-------------------- -------------------- --------------------*/

/*MODELS tools*/
/*-------------------- -------------------- --------------------*/
/*-------------------- -------------------- --------------------*/

/*set-get*/
/*-------------------- -------------------- --------------------*/
    public function Set($param, $value)
    {
        if (isset($this->model[$param])) {
            $this->model[$param] = $value;
        }
    }

    public function Get($param)
    {
        if (isset($this->model[$param])) {
            return $this->model[$param];
        }
        return false;
    }
/*-------------------- -------------------- --------------------*/

}
