import express from 'express';

const router = express.Router();

router.get('/login',async(req,res) => {
    return res.render("login")
})
router.get('/home', async(req,res) => {
    return res.render("home")
})
router.get('/notfound', async(req,res) => {
    return res.render("notfound")
})


export default router;