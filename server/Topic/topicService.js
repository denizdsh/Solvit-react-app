const Topic = require('./TopicModel');

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
    const topic = await Topic.findById(id).populate('_ownerId')
        .populate('author')
        .populate('likes')
        //.populate('comments')
        .lean();

    if (!topic) throw new Error('No such topic in database.');

    return topic;
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

async function editTopic(id, body) {
    const topic = await Topic.findById(id);

    if (!topic) throw new Error('No such topic in database.');

    Object.assing(topic, body);

    return await topic.save();
}

async function deleteTopic(id) {
    const topic = await Topic.findById(id);

    if (!topic) throw new Error('No such topic in database.');

    return Topic.deleteOne(topic);
}

module.exports = {
    getAllTopics,
    getTopicsByCategory,
    getTopicsByCategories,
    getTopicById,
    getTopicsByAuthor,
    createTopic,
    editTopic,
    deleteTopic
}