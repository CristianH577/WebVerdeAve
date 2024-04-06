<?php

class Model
{
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function QUERY($query)
    {
        // return $this->db->connect()->query($query);
        $result = [];
        try {
            // $conect = $this->db->connect()->query($query);
            while ($row = $conect->fetch(PDO::FETCH_ASSOC)) {
                $result[] = $row;
            }
            return $result;
        } catch (PDOException $e) {
            error_log("Model::query-> PDOException $e");
            return false;
        }

        return null;
    }

    public function PREPARE($query)
    {
        return $this->db->connect()->PREPARE($query);
    }

    public function ADD($table, $values, $execute)
    {
        // error_log("Model::ADD-> Ejecuto");
        $query = $this->PREPARE(
            "INSERT
            INTO $table
            VALUES $values"
        );

        try {
            $query->execute($execute);

            return true;
        } catch (PDOException $e) {
            error_log("Model::ADD-> PDOException $e");
            return false;
        }

        return null;
    }

    public function UPDATE($table, $set, $where, $execute)
    {
        error_log("Model::UPDATE-> Ejecuto");
        $test = "UPDATE $table
        SET $set
        WHERE $where";

        $query = $this->PREPARE(
            "UPDATE $table
            SET $set
            WHERE $where"
        );


        try {
            $query->execute($execute);

            return true;
        } catch (PDOException $e) {
            error_log("Model::update-> PDOException $e");
            return false;
        }

        return null;
    }

    public function COUNT($count, $table, $where, $execute)
    {
        // error_log("Model::COUNT-> ejecuto");
        $prepare =
            "SELECT COUNT($count) AS total
            FROM $table
            WHERE $where";

        $query = $this->PREPARE($prepare);

        try {
            $query->execute($execute);

            $result = $query->fetch(PDO::FETCH_ASSOC)['total'];

            return $result;
        } catch (PDOException $e) {
            error_log("Model::COUNT-> PDOException $e");
            return false;
        }

        return null;
    }

    public function SELECT($select, $table, $where, $execute)
    {
        // error_log("Model::SELECT-> ejecuto");
        $result = [];
        $PREPARE = "SELECT $select FROM $table";

        if ($where) {
            $PREPARE = $PREPARE . " WHERE " . $where;
        }

        $query = $this->PREPARE($PREPARE);

        try {
            $query->execute($execute);

            while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
                unset($row['password']);
                $result[] = $row;
            }

            return $result;
        } catch (PDOException $e) {
            error_log("Model::SELECT-> PDOException $e");
            return false;
        }

        return null;
    }

    public function DELETE($table, $where, $execute)
    {
        // error_log("Model::DELETE-> ejecuto");
        $query = $this->PREPARE("DELETE FROM $table WHERE $where");

        try {
            $delete = $query->execute($execute);

            return true;
        } catch (PDOException $e) {
            error_log("Model::DELETE-> PDOException $e");
            return false;
        }

        return null;
    }
}
