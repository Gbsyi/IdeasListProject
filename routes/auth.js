const {Router} = require("express");
const {check, validationResult} = require("express-validator");
const config = require("config");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = Router();

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Некорректный E-mail').isEmail(),
        check('password', 'Минимальная длина пароля - 6 символов').isLength({ min: 6 })
    ], 
    async (req,res) =>{
    try{
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({
                message: 'Некорректные данные',
                errors: errors.array()
            });
        }
        const {email, password} = req.body;
        
        const candidate = await User.findOne({email});
        if(candidate){
        return res.status(400).json({message: "Такой пользователь уже существует"});
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({email, password: hashedPassword});

        await user.save();
        
        res.status(201).json({message: "Пользователь создан"});
    }
    catch(e){
        res.status(500).json({message:e.message})
    }
});

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Введите корректный E-mail').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ], 
    async (req,res) =>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({
                message: 'Некорректные данные',
                errors: errors.array()
            });
        }
        const {email, password} = req.body;
        
        const user = await User.findOne({ email });

        if(!user){
            res.status(400).json({ message: 'Пользователь не найден' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({ message: "Неверный пароль" });
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get("jwt-secret"),
            { expiresIn: "1h" }
        );

        res.json({ token, userId: user.id });
    }
    catch(e){
        res.status(500).json({message:e.message})
    }
});

module.exports = router;