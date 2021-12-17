import { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom';
import './Aside.css'

export default function Aside() {
    const [sort, setSort] = useState('date');
    const [order, setOrder] = useState('asc');
    const [activeSort, setActiveSort] = useState();
    const [activeOrder, setActiveOrder] = useState();

    const [searchParams, setSearchParams] = useSearchParams();

    const dateBtn = useRef();
    const popularityBtn = useRef();
    const ascBtn = useRef();
    const descBtn = useRef();



    const changeActiveParams = useCallback(() => {
        const querySortBy = searchParams.get('sortby') || 'date';
        const queryOrder = searchParams.get('order') || 'asc';

        activeSort?.classList?.toggle('active-param');
        activeOrder?.classList?.toggle('active-param');

        const sortBtn = [dateBtn.current, popularityBtn.current].find(b => b.id === querySortBy);
        const orderBtn = [ascBtn.current, descBtn.current].find(b => b.id === queryOrder)

        sortBtn.classList.toggle('active-param');
        orderBtn.classList.toggle('active-param');

        setActiveSort(sortBtn);
        setActiveOrder(orderBtn);
    }, [searchParams, activeSort?.classList, activeOrder?.classList])

    useEffect(() => {
        changeActiveParams()
    }, [changeActiveParams])


    const changeParamsHandler = (e) => {
        const value = e.currentTarget.id;
        if (value === 'date' || value === 'popularity') {
            changeActiveParams();
            setSort(value);
            setSearchParams({ sortby: value, order });
        }

        if (value === 'asc' || value === 'desc') {
            changeActiveParams();
            setOrder(value);
            setSearchParams({ sortby: sort, order: value });
        }

    }

    return (
        <aside className="aside-sort">
            <p>Sort by</p>
            <article className="sort-options">
                <article className="sort-by">
                    <span id="date" className="sort-by-btn" onClick={changeParamsHandler} ref={dateBtn}>
                        Date <i className="fas fa-clock" />
                    </span>

                    <span id="popularity" className="sort-by-btn" onClick={changeParamsHandler} ref={popularityBtn}>
                        Popularity <i className="fas fa-heart"></i>
                    </span>
                </article>
                <article className="sort-order">
                    <span id="asc" className="sort-order-btn" onClick={changeParamsHandler} ref={ascBtn}>
                        <i className="fas fa-sort-amount-up"></i>
                    </span>
                    <span id="desc" className="sort-order-btn" onClick={changeParamsHandler} ref={descBtn}>
                        <i className="fas fa-sort-amount-down-alt"></i>
                    </span>
                </article>
            </article>
        </aside>
    )
}
