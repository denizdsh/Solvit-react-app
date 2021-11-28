import './Topics.css';
import TopicCard from './TopicCard';
export default function Topics({ topics }) {
    const topicsArr = [
        {
            category: 'java',
            owner: { id: 'id', username: 'Peter' },
            date: '21:45 28/11/2021',
            title: 'Why is processing a sorted array faster than processing an unsorted array?',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Java_source2.svg/350px-Java_source2.svg.png',
            likes: [{}, {}, {}],
            comments: [{}, {}]
        },
        {
            category: 'javascript',
            owner: { id: 'id', username: 'Stanley' },
            date: '4:30 18/10/2021',
            title: 'slice VS splice',
            imageUrl: 'https://wallpaperaccess.com/full/31193.jpg',
            likes: [{}, {}, {}, {}, {}],
            comments: [{}, {}, {}]
        },
        {
            category: 'javascript',
            owner: { id: 'id', username: 'Royce' },
            date: '12:15 8/03/2021',
            title: '__proto__ VS prototype',
            imageUrl: 'https://images.unsplash.com/photo-1519867997619-e96f4e43aeb9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bmFycm93JTIwcm9hZHxlbnwwfHwwfHw%3D&w=1000&q=80',
            likes: [{}, {}],
            comments: [{}]
        }
    ]

    return (
        <section className="topics">
            {topicsArr.map(topic => <TopicCard topic={topic} />)}
        </section>
    )
}