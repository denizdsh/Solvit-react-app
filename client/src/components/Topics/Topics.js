import { useSearchParams } from 'react-router-dom';

import './Topics.css';
import TopicCard from './TopicCard';
import Aside from './Aside';
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
            category: 'c#',
            owner: { id: 'id', username: 'Captain_S' },
            date: '11:25 9/04/2023',
            title: 'methods before or after Main?',
            imageUrl: '',
            description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

            Why do we use it?
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.The point of using Lorem Ipsum is that it has a more- or - less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.Various versions have evolved over the years, sometimes by accident, sometimes on purpose(injected humour and the like).
            
            
            Where does it come from ?
        Contrary to popular belief, Lorem Ipsum is not simply random text.It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.Richard McClintock, a Latin professor at Hampden - Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"(The Extremes of Good and Evil) by Cicero, written in 45 BC.This book is a treatise on the theory of ethics, very popular during the Renaissance.The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
            
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H.Rackham.",
    `, likes: [],
            comments: []
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
        <section className="content">
            <Aside />
            <section className="topics">
                {topicsArr.map(topic => <TopicCard topic={topic} />)}
            </section>
        </section>
    )
}