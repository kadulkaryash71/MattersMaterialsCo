//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require('lodash');

const homeStartingContent = "Hey there, Matty! I noticed you lurking through the hole. I would like to get to know you better yo. Head over to the \"About\" Page, that'll fire up our conversation.";
const aboutContent = "Matters & Materials Co. will help you through your journey of logistics and networking in the ever evolving market by keeping you up-to-date. Enjoy finding people like yourself express their opinions on a variety of modules relating to the business. But remember, the scope of a topic can vary from an elephant to as small as an atom. Let's pause the chitchat and whispers for a while and dive in this new little tippy-tappy world of yours. We can't wait to have you on board!";
const contactContent = "You here to contact me? 😳👉👈\nSure do. Why don't you drop a new post! I will see you there.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.hxtxool.mongodb.net/blogger", { useNewUrlParser: true });

const blogSchema = mongoose.Schema({
    title: String,
    post: String
});

const Blog = mongoose.model("Blog", blogSchema)


app.get("/", (req, res) => {
    Blog.find({}, (e, docs) => {
        if (e) console.log(e);
        else res.render("home", { intro: homeStartingContent, allPosts: docs });
    })

});
app.get("/about", (req, res) => {
    res.render("about", { gist: aboutContent });
});
app.get("/contact", (req, res) => {
    res.render("contact", { contactInfo: contactContent });
});
app.get("/compose", (req, res) => {
    res.render("compose");
});

app.get("/posts/:id", (req, res) => {
    Blog.findById(req.params.id, (e, doc) => {
        if (e) console.log(e);
        else {
            res.render("post", { title: doc.title, blog: doc.post });
        }
    })
});

app.post("/compose", (req, res) => {
    const blog = {
        title: req.body.blogTitle,
        post: req.body.blogPost
    }

    const newBlog = new Blog(blog);
    newBlog.save(e => {
        if(!e)
            res.redirect("/");
    });
    

});
















app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
