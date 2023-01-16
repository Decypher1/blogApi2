const mongoose = require('mongoose')
const User = require("./usersModel")

const blogSchema = new mongoose.Schema(
  {
    title: {
    type: String,
    required: [true, 'Please add a blog title'],
    unique: true,
  },
  
  description: String,
  
  tags: {
    type: [ String ]
  },
  
  state: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  
  readCount: {
    type: Number,
    default: 0
  },
  
  readingTime: {
    type: String
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  body: {
    type: String,
    required: true
  },

  timestamp: {
    type: Date,
    default: new Date().toISOString()
  }
});

const getReadingTime = (body) => {
  const WPM = 225;
  const numOfWords = body.trim().split(/\s/g).length;
  const Readingtime = Math.ceil(numOfWords / WPM);
  return `${Readingtime} min(s) read`;

};

blogSchema.pre('save', function(next) {
  this.readingTime = getReadingTime(this.body);
  this.readCount + 1;
  next();
});

blogSchema.pre('deleteOne', function(next) {
  const blogId = this.getQuery()['_id']
  mongoose.model("User").updateOne({$pullAll: {article: [articleId]}}, function (error, result) {
    if (error){
      next(error);
    }else {
      next();
    }
  });

});
const blog = mongoose.model('blog', blogSchema);

module.exports = blog;