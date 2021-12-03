import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import './Aside.css'

export default function Aside() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sort, setSort] = useState();
    const [order, setOrder] = useState();
    const [activeSort, setActiveSort] = useState();
    const [activeOrder, setActiveOrder] = useState();

    const onParamsChange = (sortby, orderby) => {
        setSearchParams({ sortby: sortby || 'date', order: orderby || 'asc' });
    }
    const paramsHandler = (e) => {
        const param = e.currentTarget.id;
        if (param === 'date' || param === 'popularity') {
            activeSort?.classList?.remove('active-param');
            setActiveSort(e.currentTarget);
            e.currentTarget.classList.add('active-param');

            setSort(param);
            onParamsChange(param, order);
        }
        if (param === 'asc' || param === 'desc') {
            activeOrder?.classList.remove('active-param');
            setActiveOrder(e.currentTarget);
            e.currentTarget.classList.add('active-param');

            setOrder(param);
            onParamsChange(sort, param);
        }
    }
    
    return (
        <aside className="aside-sort">
            <p>Sort by</p>
            <article className="sort-options">
                <article className="sort-by">
                    <span id="date" className="sort-by-btn" onClick={paramsHandler}>
                        Date <i className="fas fa-clock" />
                    </span>

                    <span id="popularity" className="sort-by-btn" onClick={paramsHandler}>
                        Popularity <i className="fas fa-heart"></i>
                    </span>
                </article>
                <article className="sort-order">
                    <span id="asc" className="sort-order-btn" onClick={paramsHandler}>
                        <i className="fas fa-sort-amount-up"></i>
                    </span>
                    <span id="desc" className="sort-order-btn" onClick={paramsHandler}>
                        <i className="fas fa-sort-amount-down-alt"></i>
                    </span>
                </article>
            </article>
        </aside>
    )
}
