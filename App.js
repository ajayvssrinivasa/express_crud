const express = require('express');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const app = express();
const PORT = 8899;
const fs = require('fs');
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.set('view engine','ejs');

app.get("/", (req, res)=>{
        // let courses = [{course_name:"React", id: 1},
        // {course_name:"Node", id: 2},{course_name:"Angular", id: 3},{course_name:"Express", id: 4},];
    const posts = getPostdata();
    res.render('crud',{posts:posts,data:{}});

})
app.post('/write', (req,res)=>{
    const posts = getPostdata();
    let title = req.body.title;
    let description = req.body.description;
    posts.push({title:title, description:description});
    savePostdata(posts);
    res.redirect("/");
})

app.get('/edit/:title', (req, res)=>{
    const {title} = req.params;
    const posts = getPostdata();
    const data = posts.filter(pt=>pt.title === title);
    res.render('crud', {posts:posts, data:data[0]});
})

app.get('/delete/:ind',(req,res)=>{
    const {ind} = req.params;
    const posts = getPostdata();
    posts.splice(ind, 1);
    savePostdata(posts);
    res.redirect('/')
})
app.post('/upd/:title', (req, res)=>{
    const {title} = req.params;
    const posts = getPostdata();
    const index = posts.findIndex(pt=>pt.title === title);
    posts.splice(index,1);
    savePostdata(posts);
    res.redirect(307, "/write")
})
app.get("/arrdata",(req, res)=>{
    let arr = ["Node", "React", "Express", "Mongo"];
    res.render('array',{arr:arr});
})



app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Work on ${PORT}`);
})

const savePostdata = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('Posts.json', stringifyData)
}

const getPostdata = () => {
    const jsonData = fs.readFileSync('Posts.json')
    return JSON.parse(jsonData)    
}
