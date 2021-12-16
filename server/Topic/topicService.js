const Topic = require('./TopicModel');
const User = require('../User/UserModel');

async function getAllTopics() {
    return await Topic.find({}).lean();
}

async function getTopicsByCategory(category) {
    return await Topic.find({ category });
}

async function getTopicsByCategories(categories) {
    return await Topic.find({ category: { $in: categories } });
}

async function getTopicById(id) {
    const topic = await Topic.findById(id).lean();

    if (!topic) throw new Error('No such topic in database.');

    return topic;
}

async function getTopicsByIds(ids) {
    const topics = await Topic.find({ _id: { $in: ids } });
    if (topics.length === 0) throw new Error('This user has not saved any topics.');

    return topics;
}

async function getTopicsByAuthor(author) {
    const topics = await Topic.find({ author });

    if (!topics || topics.length === 0) throw new Error('This user has not posted any topics.');

    return topics;
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

async function getOwnerId(topicId){
    const topic = await Topic.findById(topicId);

    if(!topic) throw new Error('No such topic in database.');

    return topic._ownerId;
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
    getOwnerId
}