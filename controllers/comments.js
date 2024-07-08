const commentService = require('../services/comments');

 
const getComments = async (req, res) => {
    res.json(await commentService.getComments(req.params.id));
}


const createComment = async (req, res) => {
    res.json(await commentService.createComment(
        req.body.videoId,
        req.body.username,
        req.body.text
    ));
}

const deleteComment = async (req, res) => {
    res.json(await commentService.deleteComment(req.params.id, req.params.pid));
}
const deleteComments = async (req, res) => {
    res.json(await commentService.deleteComments(req.params.id));
}
const updateComment = async (req, res) => {
    res.json(await commentService.updateComment(req.params.id, req.params.pid, req.body.text));
}


module.exports = { getComments, updateComment, createComment, deleteComment, deleteComments };