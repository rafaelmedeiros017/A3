import path from "path";
import fs from "fs";
import db from "../config/db.js";

// Função auxiliar para deletar imagem com verificação
const deleteImage = (imagePath) => {
    const relativePath = imagePath.replace("/uploads/", "");
    const fullPath = path.resolve("uploads", relativePath);
    fs.unlink(fullPath, (err) => {
        if (err && err.code !== "ENOENT") {
            console.error("Erro ao deletar imagem:", err);
        }
    });
};

// Função segura para converter números
const parseNumberOrNull = (value) => {
    const num = Number(value);
    return isNaN(num) ? null : num;
};

// GET /api/roupas
export const getAllRoupas = (req, res) => {
    db.query("SELECT * FROM roupas", (err, results) => {
        if (err)
            return res.status(500).json({ error: "Erro ao buscar roupas." });

        const formattedResults = results.map((roupa) => ({
            ...roupa,
            imagens: roupa.imagens ? JSON.parse(roupa.imagens) : [],
            descricao: roupa.descricao ? JSON.parse(roupa.descricao) : [],
        }));

        res.json(formattedResults);
    });
};

// GET /api/roupas/:id
export const getRoupasById = (req, res) => {
    const roupaId = req.params.id;

    db.query("SELECT * FROM roupas WHERE id = ?", [roupaId], (err, results) => {
        if (err)
            return res.status(500).json({ error: "Erro ao buscar roupa." });
        if (results.length === 0)
            return res.status(404).json({ error: "Roupa não encontrada." });

        const roupa = results[0];
        roupa.imagens = roupa.imagens ? JSON.parse(roupa.imagens) : [];
        roupa.descricao = roupa.descricao ? JSON.parse(roupa.descricao) : [];

        res.json(roupa);
    });
};

// POST /api/roupas
export const addRoupa = (req, res) => {
    const {
        marca,
        modelo,
        tamanho,
        cor,
        preco,
        tipo,
        material,
        estoque,
        descricao,
    } = req.body;

    const imagens = req.files
        ? req.files.map((file) => `/uploads/${file.filename}`)
        : [];
    const imagensJSON = JSON.stringify(imagens);
    const descricaoJSON = descricao
        ? JSON.stringify(JSON.parse(descricao))
        : JSON.stringify([]);

    const sql = `
    INSERT INTO roupas (
      marca, modelo, tamanho, cor, preco, imagens, tipo, material,
      estoque, descricao
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const values = [
        marca,
        modelo,
        tamanho,
        cor,
        parseNumberOrNull(preco),
        imagensJSON,
        tipo,
        material,
        parseNumberOrNull(estoque),
        descricaoJSON,
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao adicionar roupa." });
        }
        res.status(201).json({
            message: "Roupa adicionada com sucesso.",
            id: result.insertId,
        });
    });
};

// PUT /api/roupas/:id
export const updateRoupa = (req, res) => {
    const roupaId = req.params.id;
    const {
        marca,
        modelo,
        tamanho,
        cor,
        preco,
        tipo,
        material,
        estoque,
        descricao,
    } = req.body;

    db.query("SELECT * FROM roupas WHERE id = ?", [roupaId], (err, results) => {
        if (err)
            return res.status(500).json({ error: "Erro ao buscar roupa." });
        if (results.length === 0)
            return res.status(404).json({ error: "Roupa não encontrada." });

        const roupa = results[0];
        let imagens = roupa.imagens;

        if (req.files && req.files.length > 0) {
            if (roupa.imagens) {
                try {
                    const imagensAntigas = JSON.parse(roupa.imagens);
                    imagensAntigas.forEach((img) => deleteImage(img));
                } catch (e) {
                    console.error("Erro ao deletar imagens antigas.");
                }
            }

            imagens = JSON.stringify(
                req.files.map((file) => `/uploads/${file.filename}`)
            );
        } else {
            imagens =
                typeof imagens === "string" ? imagens : JSON.stringify(imagens);
        }

        const descricaoJSON = descricao
            ? JSON.stringify(JSON.parse(descricao))
            : JSON.stringify([]);

        const sql = `
      UPDATE roupas SET
        marca = ?, modelo = ?, tamanho = ?, cor = ?, preco = ?, imagens = ?,
        tipo = ?, material = ?, estoque = ?, descricao = ?
      WHERE id = ?
    `;

        const values = [
            marca,
            modelo,
            tamanho,
            cor,
            parseNumberOrNull(preco),
            imagens,
            tipo,
            material,
            parseNumberOrNull(estoque),
            descricaoJSON,
            roupaId,
        ];

        db.query(sql, values, (err) => {
            if (err)
                return res
                    .status(500)
                    .json({ error: "Erro ao atualizar roupa." });
            res.json({ message: "Roupa atualizada com sucesso." });
        });
    });
};

// DELETE /api/roupas/:id
export const deleteRoupa = (req, res) => {
    const roupaId = req.params.id;

    db.query(
        "SELECT imagens FROM roupas WHERE id = ?",
        [roupaId],
        (err, results) => {
            if (err)
                return res.status(500).json({ error: "Erro ao buscar roupa." });
            if (results.length === 0)
                return res.status(404).json({ error: "Roupa não encontrada." });

            const roupa = results[0];
            if (roupa.imagens) {
                try {
                    const imagens = JSON.parse(roupa.imagens);
                    imagens.forEach((img) => deleteImage(img));
                } catch (e) {
                    console.error("Erro ao processar imagens para deletar.");
                }
            }

            db.query("DELETE FROM roupas WHERE id = ?", [roupaId], (err) => {
                if (err)
                    return res
                        .status(500)
                        .json({ error: "Erro ao remover roupa." });
                res.json({ message: "Roupa removida com sucesso." });
            });
        }
    );
};
