const pool = require('../database/db');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const selectData = async(req,res)=>{
    try {
        const response = await pool.query('SELECT * FROM todolist')
        res.json(response.rows);
    } catch (error) {
        console.error(error);
    }
}

const selectOne = async(req,res)=>{
    const {userEmail} = req.params;
    
    try {
        const response = await pool.query('SELECT * FROM todolist WHERE user_email = $1', [userEmail])
        res.json(response.rows);
        
    } catch (error) {
        console.error(error);
    }
}

const postData = async(req,res)=>{
    
    const {user_email, title, progress, date} = req.body;
    
    const id = uuidv4();
    try {
        const newToDo = await pool.query( `INSERT INTO todolist (id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)`,
    [id,user_email,title,progress,date])
    res.json(newToDo);
    
    } catch (error) {
        console.error(error)
    }
    
}

const signUp = async(req,res)=>{
    const {email, password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password,salt);
    try {
        await pool.query(`INSERT INTO users (email,hashed_password) VALUES($1,$2)`,
            [email, hashedPassword]);
           
        const token = jwt.sign({email}, 'secret', {expiresIn:'1hr'});
        res.json({email, token});
    } catch (error) {
        console.error(error)
        if(error){
         res.json({detail:err.detail})
        }
    }
}

const login = async(req,res)=>{
    const {email, password} = req.body;
    try {
        const users = await pool.query('SELECT * FROM users WHERE email = $1',[email]);
        
        if(!users.rows.length) return res.json({detail: 'USER DOES NOT EXIST!'})
        
        const success = await bcrypt.compare(password, users.rows[0].hashed_password);
        const token = jwt.sign({email}, 'secret', {expiresIn:'1hr'});
        if(success){
            res.json({'email': users.rows[0].email, token})
        }else{
            res.json({detail: "Login failed"});
        }
    } catch (error) {
        console.error(error)
    }
    
}

const updateTask = async(req,res)=>{
    const {id} = req.params;
    const {user_email,title,progress,date} = req.body;
    try {
        const editToDo = await pool.query(`UPDATE todolist SET user_email = $1, title = $2, progress = $3, date=$4 WHERE id = $5;`,
    [user_email,title,progress,date, id]);
    res.json(editToDo)
    } catch (error) {
        console.error(error)
    }
}
 
const deleteTask = async(req,res)=>{
    const {id} = req.params;
    try {
        const response = await pool.query('DELETE FROM todolist WHERE id = $1',[id]);
        res.json(response);

    } catch (error) {
        console.error(error);
    }
}


module.exports = {
    selectData,
    selectOne,
    postData,
    signUp,
    login,
    updateTask,
    deleteTask
}