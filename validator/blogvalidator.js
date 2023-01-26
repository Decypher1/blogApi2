const joi = require('joi')

const blogSchema = joi.object({
    title: joi.string()
        .min(7)
        .max(255)
        .trim
        .required(),

    description:  joi.string()
        .min(7)
        .max(255)
        .required(),

    tags: joi.string()
        .optional(),

    state: joi.string()
        .valid('draft', 'published')
        .default,
    
    readCount: joi.string()
       . default,

    readingTime: joi.string(),

    author: joi.string(),

    body: joi.string()
            .required()
    
})