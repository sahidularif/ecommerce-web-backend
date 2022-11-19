const Article = require("../models/Article")

const articleHandler = {}

articleHandler.addArticle = async (req, res, next) => {

    try {
        const product = req.body
        const article = new Article(product)
        await article.save()
        res.status(200).send("Article successfully added");
      } catch (err) {
        res.status(500).json(err);
      }

}

articleHandler.getAllArticle = async (req, res, next) => {

    try {
        const articles = await Article.find();
        res.status(200).send(articles);
      } catch (err) {
        res.status(500).json(err);
      }

}

articleHandler.getSingleArticle = async (req, res, next) => {
    try {
        const article = await Article.findById({ _id: req.params._id });
        res.status(200).send(article);
    } catch (error) {
        res.status(400).send(error.message);
    }
}




module.exports = articleHandler