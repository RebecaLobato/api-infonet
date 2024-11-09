const pool = require('../config/db');

formataCEP = (cep) => {
    if(cep.length === 8){
        return cep.slice(0, 5) + '-' + cep.slice(5);
    }
    return cep;
}

exports.create = async (req, res) =>{
    const {rua, bairro, cep} = req.body;

    try{
        const result = await pool.query('INSERT INTO endereco (rua, bairro, cep) VALUES ($1, $2, $3) RETURNING *',
       [rua, bairro, formataCEP(cep)]);
       res.status(201).json(result.rows);

    } catch (error){
        console.log(error);
        res.status(500).json({Message: 'Erro ao cadastrar endereco'});
       }
    }

exports.getAll = async (req, res) =>{
    try{
        const result = await pool.query('SELECT * FROM endereco');
       return res.status(201).json(result.rows);

    } catch (error){
        console.log(error);
        return res.status(500).json({Message: 'Erro ao mostrar todos os endereços'});
       }
    }

    
exports.getOne = async (req, res) =>{
    const {id_pessoa} = req.params
    try{
        const result = await pool.query(`SELECT * FROM endereco WHERE CEP = ${id_pessoa}`);
       return res.status(201).json(result.rows)

    } catch (error){
        console.log(error);
        res.status(500).json({Message: 'Erro! Tente novamente'});
       }

       if(result.rows.length === 0){
        console.log(`Usuário inexistente`);
    }
    }

    
    exports.update = async (req, res) => {           
        const {id_pessoa} = req.params
        const {campo, valor} = req.body
        console.log(req.body)
    
        try {
            const result = await pool.query(
                `UPDATE ENDERECOS Set ${campo} = $1 WHERE id_pessoa = $2`,
                [valor, id_pessoa]
            )
           return res.status(201).json(result.rows[0])
        } catch (error) {
            console.log(error)
            res.status(500).json({Message: "Impossivel ler O endereco"})
        }
    }

    
exports.delete = async (req, res) =>{
    const {id_pessoa} = req.params
    try{
        const result = await pool.query('DELETE FROM endereco WHERE id_pessoa = $1', [id_pessoa]);
       
        return res.status(201).json({Message: "Usuário deletado"});

    } catch (error){
        console.log(error);
        res.status(500).json({Message: 'Erro! Tente novamente'});
       }

       if(result.rows.length === 0){
        res.status(400).json({Message: 'Sem dados do endereço'})
     };
    }

    
    