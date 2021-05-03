const express = require("express");
const router = express.Router();
const PostMessage = require('../models/postMessage');
const Employ=require('../models/employ')
const auth =require('../middlewares/auth')
const mongoose=require('mongoose')
const User =require('../models/usermodel')
const {check,validationResult} =require('express-validator')


router.get("/", async (req, res) => { 
    try {
        const postMessages = await PostMessage.find().sort({createdAt:-1});
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})
router.get("/employ", async (req, res) => { 
    try {
        const postMessages = await Employ.find().sort({createdAt:-1});
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})
router.get("/:id",auth, async (req, res) => { 
  
    try {
        console.log('shcjhasjhvcja');
        const _id =req.user.id
      console.log(_id);
        const data = await PostMessage.find({creator:_id});
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})
router.get("/:id/bypost", async (req, res) => { 
  
    try {
        console.log('shcjhasjhvcja');
        const _id =req.params.id
      console.log(_id);
        const data = await PostMessage.find({_id:_id});
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})
router.post("/",auth, async (req, res) => {

    console.log(req.user);

   
    try {
        const post = req.body;
        console.log(post.selectedFile);
        const newPostMessage = new PostMessage({
             ...post,
             name:req.user.name,
              creator: req.user.id,
               createdAt: new Date().toISOString()
             })
     
       const data =await newPostMessage.save();
       console.log(data);

        res.status(201).json(data );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});
router.post("/employ", async (req, res) => {

 

   
    try {
        const post = req.body;
        console.log(post.selectedFile);
        const newPostEmploy = new Employ({
             ...post,
            
             })
     
       const data =await newPostEmploy.save();
       console.log(data);

        res.status(201).json(data );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});
router.patch("/:id",auth,async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
});
router.delete("/:id",auth, async (req, res) => {
    const { id } = req.params;
     console.log(id);
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
});

router.patch("/:id/likePost",auth,async (req, res) => {
    const { id } = req.params;

    if (!req.user.id) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id ===String(req.user.id));

    if (index === -1) {
      post.likes.push(req.user.id);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.user.id));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
});
router.post(
    '/comment/:id',
    [
      auth,
      [
        check('text', 'Text is required')
          .not()
          .isEmpty()
      ]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }
  
      try {
          console.log('sdvsdvsdvs');
        const user = await User.findById(req.user.id).select('-password');
        const post = await PostMessage.findById(req.params.id);
  
        const newComment = {
          text: req.body.text,
          name: user.name,
        
          user: req.user.id
        };
  
        post.comments.unshift(newComment);
  
        await post.save();
  
        res.json(post.comments);
      } catch (err) {
        console.error(err.message);
  
        if (err.kind === 'ObjectId') {
          return res.status(404).json({ msg: 'Post not found to comment on' });
        }
  
        res.status(500).send('Server Error Horace');
      }
    }
  );
  
  //@route   Delete api/posts/comment/:id/:comment_id
  //@desc    Delete comment on post
  //@access  Private
  router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      // Pull out comment
      const comment = post.comments.find(
        comment => comment.id === req.params.comment_id
      );
  
      //Make sure comment exists
      if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exist.' });
      }
  
      //Check user
      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      //Get remove index
      const removeIndex = post.comments
        .map(comment => comment.id)
        .indexOf(req.params.comment_id);
  
      post.comments.splice(removeIndex, 1);
  
      await post.save();
  
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
  
      if (err.kind === 'ObjectId') {
        return res
          .status(404)
          .json({ msg: 'Comment on the post does not exist' });
      }
  
      res.status(500).send('Server Error Marcus');
    }
  });
module.exports = router;
