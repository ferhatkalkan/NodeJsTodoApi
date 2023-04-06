const todo = require("../models/todoModel")


const todoAdd = async (req, res) => {

    try {
        const _todo = await todo.findOne({ name: req.body.name });
        if (_todo) {
            return res.status(400).json({
                success: false,
                message: "Aynı isimde kayıt mevcuttur."
            });
        }

        const todoAdd = new todo(req.body);
        await todoAdd.save()
            .then(() => {
                return res.status(200).json(todoAdd);
            })
            .catch((err) => {

                return res.status(400).json({
                    success: false,
                    message: "Kayıt oluşturulurkern hata çıktı! : " + err
                });

            });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Kayıt oluşturulamadı! : " + error
        });

    }
};

const todoGetAll = async (req, res) => {

    //paging
    const { page } = req.query;
    const limit = 2;
    const skip = Number(page - 1) * limit;

    try {
        const todoGetAll = await todo.find({}).limit(limit).skip(skip);
        return res.status(200).json({
            success: true,
            data: todoGetAll
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Kayıtlar getirilemedi!"
        });
    }

};

const todoUpdate = async (req, res) => {
    const { id } = req.params;

    try {
        const todoUpdate = await todo.findByIdAndUpdate(id, req.body);
        if (todoUpdate) {
            return res.status(200).json({
                success: true,
                message: "Güncelleme başarılı."
            });
        }
        else return res.status(400).json({
            success: false,
            message: "Kayıt güncellenemedi!"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Kayıt güncellenemedi!"
        });
    }
};

const todoDelete = async (req, res) => {
    const { id } = req.params; // param'daki id bilgisi,  "req.params.id" ile de alınabilirdi.

    try {
        const todoUpdate = await todo.findByIdAndDelete(id);
        if (todoUpdate) {
            return res.status(200).json({
                success: true,
                message: "Silme işlemi başarılı."
            });
        }
        else return res.status(400).json({
            success: false,
            message: "Silme işlemi yapılamadı!"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Silme işlemi yapılamadı! : " + error
        });
    }
};

const todoGetById = async (req, res) => {
    const { id } = req.params; // param'daki id bilgisi,  "req.params.id" ile de alınabilirdi.

    try {
        const todoGet = await todo.findById(id);
        if (todoGet) {
            return res.status(200).json(todoGet);
        }
        else {
            return res.status(404).json({
                success: false,
                message: "Kayıt bulunamadı!"
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Kayıt getirilemedi! : " + error
        });

    }
};


//dışarıya açıyoruz.
module.exports = {
    todoAdd,
    todoGetAll,
    todoUpdate,
    todoDelete,
    todoGetById
}