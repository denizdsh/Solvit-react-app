import { useCategories } from '../../hooks/useCategories';

import './BrowseCategoriesAside.css';

export default function BrowseCategoriesAside() {
    const { toggleShow } = useCategories();

    return (
        <section className='aside-categories'>
            <button className='aside-categories-btn' onClick={toggleShow}>
                Categories
            </button>
        </section>
    )
}