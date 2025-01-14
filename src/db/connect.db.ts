import { Level } from "level";

const LevelDB = new Level("../../db/mydb", {
     valueEncoding  : 'json' ,
     createIfMissing: true,
     errorIfExists  : false,
});

export default LevelDB;