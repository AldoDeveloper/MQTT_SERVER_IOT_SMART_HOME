import LevelDB from '../../db/connect.db';

const sub = LevelDB;

export async function addData(key: string, value: any){
    try{
        await sub.put(key, value);
        console.log(`✅ Data berhasil ditambahkan: ${key}`);
    }catch(err){
        console.error(`❌ Gagal menambahkan data:`, err);
    }
}

export async function getData(key: string){
    try{
        return await sub.get(key) 
    }catch(err){
        console.error(`❌ Gagal mengambil data:`, err.message);
    }
}   

export async function deleteData(key: string){
    try{
        sub.del(key);
        console.log("Berhasil menghapus")
    }catch(err){
        console.error(`❌ Gagal menghapus data:`, err.message);
    }
}

process.on("SIGINT", () => {
    console.log("models subsribe close!")
    sub.close()
})