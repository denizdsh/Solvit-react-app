const Topic = require('./TopicModel');
const Comment = require('./CommentModel');
const User = require('../User/UserModel');

async function getAllTopics() {
    const topics = await Topic.find({}).lean();
    topics.map(t => t.comments = t.comments.length);

    return topics;
}

async function getTopicsByCategory(category) {
    const topics = await Topic.find({ category }).lean();
    topics.map(t => t.comments = t.comments.length);

    return topics;
}

async function getTopicsByCategories(categories) {
    const topics = await Topic.find({ category: { $in: categories } }).lean();
    topics.map(t => t.comments = t.comments.length);

    return topics;
}

async function getTopicById(id) {
    const topic = await Topic.findById(id).lean();

    if (!topic) throw new Error('No such topic in database.');

    topic.comments = topic.comments.length;

    return topic;
}

async function getTopicsByIds(ids) {
    const topics = await Topic.find({ _id: { $in: ids } }).lean();
    if (topics.length === 0) throw new Error('This user has not saved any topics.');

    topics.map(t => t.comments = t.comments.length);

    return topics;
}

async function getTopicsByAuthor(author) {
    const topics = await Topic.find({ author }).lean();

    if (!topics || topics.length === 0) throw new Error('This user has not posted any topics.');

    topics.map(t => t.comments = t.comments.length);

    return topics;
}

async function getOwnerId(id) {
    const topic = await Topic.findById(id);

    if (!topic) throw new Error('No such topic in database.');

    return topic._ownerId;
}

async function getComments(id) {
    const topic = await Topic.findById(id).populate('comments');

    if (!topic) throw new Error('No such topic in database.');

    return topic.comments;
}

async function postComment(id, body) {
    const topic = await Topic.findById(id);

    if (!topic) throw new Error('No such topic in database.');

    const comment = new Comment(body);
    await comment.save();

    topic.comments.push(comment);
    await topic.save();

    return comment;
}

async function createTopic(body) {
    const topic = new Topic(body);
    return await topic.save();
}

async function editTopic(body, id) {
    const topic = await Topic.findByIdAndUpdate(id, body);

    if (!topic) throw new Error('No such topic in database.');

    return await topic.save();
}

async function deleteTopic(id) {
    const topic = await Topic.findById(id);

    if (!topic) throw new Error('No such topic in database.');

    await Topic.deleteOne(topic);
}

async function likeTopic(id, userId) {
    const topic = await Topic.findById(id);

    if (!topic) throw new Error('No such topic in database.');
    if (topic.likes.includes(userId)) throw new Error('You have already liked this post.');

    const user = await User.findById(userId);
    if (!user) throw new Error('You have to be logged in to perform this action.');

    topic.likes.push(userId);
    await topic.save();
}

async function dislikeTopic(id, userId) {
    const topic = await Topic.findById(id);

    if (!topic) throw new Error('No such topic in database.');
    if (!topic.likes.includes(userId)) throw new Error('You have not liked this post.');

    const user = await User.findById(userId);
    if (!user) throw new Error('You have to be logged in to perform this action.');

    topic.likes.splice(topic.likes.indexOf(userId), 1);
    await topic.save();
}



module.exports = {
    getAllTopics,
    getTopicsByCategory,
    getTopicsByCategories,
    getTopicById,
    getTopicsByIds,
    getTopicsByAuthor,
    createTopic,
    editTopic,
    deleteTopic,
    likeTopic,
    dislikeTopic,
    getOwnerId,
    getComments,
    postComment
}