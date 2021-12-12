import './TopicsHeadingUnderlined.css';

export default function TopicsHeadingUnderlined({ title }) {
    return (
        <section className="topics-heading">
            <p className="topics-heading-title">{title}</p>
            <div className="topics-heading-line" />
        </section>
    )
} 