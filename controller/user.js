import { db } from "../db.js";

// Abaixo estão os módulos de funções para alterações e 
// atualizações das tabalas para armazenamento de dados de contribuintes/fornecedores e pagamentos registrados

//Modulo de funções para cadastros de pessoas e fornecedores
export const coletarCadastros = (_, res) => {
    const q = "SELECT * FROM users";

    db.query(q, (err, data) => {
        if(err) return res.json()
        return res.status(200).json(data);
    });
};

// Criar contribuinte/forncedor na base dados
export const criarNovoCadastro = (req, res) => {
    const q = "INSERT INTO users(`nome`,`email`,`fone`,`categoria`,`usuario`) VALUES(?)";

    const values = [
        req.body.nome,
        req.body.email,
        req.body.fone,
        req.body.categoria,
        req.body.usuario
    ];

    db.query(q, [values], (err) => {
        if(err) return res.json(err);

        return res.status(200).json("Cadastro criado com sucesso!");
    })
}

// Atualizar cadastro de contribuinte/fornecedor no banco de dados
export const atualizarCadastro = (req, res) => {
    const q = "UPDATE `db_control_pag`.`users` SET `nome`=?, `email`=?, `fone`=?, `categoria`=? WHERE (`id`=?)";

    const values = [
        req.body.nome,
        req.body.email,
        req.body.fone,
        req.body.categoria
    ];

    db.query(q, [...values, req.params.id], (err) => {
        if(err) return res.json(err);

        return res.status(200).json("Cadastro Atualizado!");
    })
}

// Deletar contribuinte/forncedor do banco de dados
export const deletarCadastro = (req, res) => {
    const q = "DELETE FROM `db_control_pag`.`users` WHERE (`id`=?)";

    db.query(q, [req.params.id], (err) => {
        if(err) return res.json(err);

        return res.status(200).json("Cadastro deletado com sucesso!");
    })
}